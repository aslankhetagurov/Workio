import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selectUserData } from '@/modules/Auth';
import {
    chatsApi,
    useGetUserChatsQuery,
    useMarkMessagesAsReadMutation,
} from '../../api/chatsApi';
import ChatsItem from '../ChatsItem/ChatsItem';
import supabase from '../../../../../supabaseClient';
import { Tables } from '@/shared/types/database.types';
import { selectActiveChatData } from '../../store/chatsSlice';
import styles from './ChatsList.module.scss';

const ChatsList = () => {
    const user = useAppSelector(selectUserData);
    const activeChatData = useAppSelector(selectActiveChatData);
    const dispatch = useAppDispatch();
    const [markMessagesAsRead] = useMarkMessagesAsReadMutation();

    useEffect(() => {
        if (!user) return;

        const chatsChannel = supabase
            .channel('user-chats')
            .on(
                'postgres_changes',
                {
                    event: 'INSERT',
                    schema: 'public',
                    table: 'chats',
                },
                async (payload) => {
                    const newChat = payload.new;

                    if (
                        newChat.applicant_id !== user.id &&
                        newChat.employer_id !== user.id
                    ) {
                        return;
                    }

                    const { data: fullChat } = await supabase
                        .from('chats')
                        .select(
                            `
              *,
              vacancies(*, companies(*)),
              resumes(*, users(*)),
              applicant:users!chats_applicant_id_fkey(*),
              employer:users!chats_employer_id_fkey(*)
            `,
                        )
                        .eq('id', newChat.id)
                        .single();

                    if (!fullChat) return;

                    dispatch(
                        chatsApi.util.updateQueryData(
                            'getUserChats',
                            user.id,
                            (draft) => {
                                if (!draft.some((c) => c.id === fullChat.id)) {
                                    draft.unshift(fullChat);
                                }
                            },
                        ),
                    );
                },
            )
            .subscribe();

        const messagesChannel = supabase
            .channel('user-messages')
            .on(
                'postgres_changes',
                {
                    event: 'INSERT',
                    schema: 'public',
                    table: 'messages',
                },
                (payload) => {
                    const message = payload.new;

                    dispatch(
                        chatsApi.util.updateQueryData(
                            'getChatMessages',
                            message.chat_id,
                            (draft) => {
                                draft.push(message as Tables<'messages'>);
                            },
                        ),
                    );

                    if (
                        user.id !== payload.new.sender_id &&
                        activeChatData?.id === payload.new.chat_id
                    ) {
                        markMessagesAsRead({
                            chatId: payload.new.chat_id,
                            userId: user.id,
                        });
                    }

                    if (
                        user.id !== message.sender_id &&
                        activeChatData?.id !== message.chat_id
                    ) {
                        dispatch(
                            chatsApi.util.updateQueryData(
                                'getUnreadCount',
                                {
                                    userId: user.id,
                                    chatId: message.chat_id,
                                },
                                (draft) => draft + 1,
                            ),
                        );
                    }
                },
            )
            .on(
                'postgres_changes',
                {
                    event: 'UPDATE',
                    schema: 'public',
                    table: 'messages',
                },
                (payload) => {
                    const updatedMsg = payload.new;

                    dispatch(
                        chatsApi.util.updateQueryData(
                            'getChatMessages',
                            updatedMsg.chat_id,
                            (draft) => {
                                const msgIndex = draft.findIndex(
                                    (m) => m.id === updatedMsg.id,
                                );
                                if (msgIndex !== -1) {
                                    draft[msgIndex] = {
                                        ...draft[msgIndex],
                                        read: updatedMsg.read,
                                    };
                                }
                            },
                        ),
                    );
                },
            )
            .subscribe();

        return () => {
            supabase.removeChannel(chatsChannel);
            supabase.removeChannel(messagesChannel);
        };
    }, [user, activeChatData, location]);

    const { data: chats } = useGetUserChatsQuery(user?.id ?? '', {
        skip: !user,
    });

    return (
        <aside className={styles.chats}>
            <h2 className={styles.chats__title}>Chats</h2>

            {!chats?.length ? (
                <p className={styles.chats__empty}>There are no chats yet</p>
            ) : (
                <ul className={styles.chats__list}>
                    {chats?.map((chat) => (
                        <ChatsItem chatInfo={chat} key={chat.id} />
                    ))}
                </ul>
            )}
        </aside>
    );
};

export default ChatsList;
