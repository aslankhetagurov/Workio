import { useEffect } from 'react';

import { ChatWithRelations } from '@/shared/types/database.types';
import avatar from '@/shared/assets/images/default-avatar.png';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selectUserData } from '@/modules/Auth';
import {
    selectActiveChatData,
    setActiveChatData,
} from '../../store/chatsSlice';
import {
    chatsApi,
    useGetUnreadCountQuery,
    useMarkMessagesAsReadMutation,
} from '../../api/chatsApi';
import UnreadMessagesCounter from '@/shared/UI/UnreadMessagesCounter/UnreadMessagesCounter';
import styles from './ChatsItem.module.scss';

interface IChatsItemProps {
    chatInfo: ChatWithRelations;
}

const ChatsItem = ({ chatInfo }: IChatsItemProps) => {
    const user = useAppSelector(selectUserData);
    const { applicant, employer, vacancies, resumes, id } = chatInfo;
    const activeChatData = useAppSelector(selectActiveChatData);
    const dispatch = useAppDispatch();

    const isApplicant = user?.role === 'applicant';

    const { data: messagesCounter } = useGetUnreadCountQuery(
        { userId: user?.id ?? '', chatId: chatInfo?.id ?? '' },
        {
            skip: !user || !chatInfo,
        }
    );
    const [markMessagesAsRead] = useMarkMessagesAsReadMutation();

    useEffect(() => {
        if (activeChatData?.id !== chatInfo.id) return;

        markMessagesAsRead({
            userId: user?.id ?? '',
            chatId: chatInfo?.id ?? '',
        });

        dispatch(
            chatsApi.util.updateQueryData(
                'getUnreadCount',
                {
                    userId: user?.id ?? '',
                    chatId: chatInfo?.id ?? '',
                },
                () => 0
            )
        );

        return () => {
            dispatch(
                chatsApi.util.updateQueryData(
                    'getUnreadCount',
                    {
                        userId: user?.id ?? '',
                        chatId: chatInfo?.id ?? '',
                    },
                    () => 0
                )
            );

            markMessagesAsRead({
                userId: user?.id ?? '',
                chatId: chatInfo?.id ?? '',
            });
        };
    }, [activeChatData]);

    const handleSetActiveChatId = () => {
        dispatch(setActiveChatData(chatInfo));
    };

    return (
        <li
            className={`${styles.chat} ${
                activeChatData?.id === id ? styles.chat_active : ''
            }`}
            onClick={handleSetActiveChatId}
        >
            <img
                className={styles.chat__img}
                src={
                    isApplicant
                        ? applicant.avatar_url || avatar
                        : employer.avatar_url || avatar
                }
                alt={`${user?.role} avatar`}
            />

            <div className={styles.chat__info}>
                <p className={styles.chat__title}>
                    {isApplicant ? vacancies.title : resumes.title}
                </p>
                <p className={styles.chat__subtitle}>
                    {isApplicant
                        ? vacancies.companies?.name
                        : resumes.users?.full_name}
                </p>
            </div>

            {!!messagesCounter && activeChatData?.id !== chatInfo.id && (
                <UnreadMessagesCounter counter={messagesCounter} />
            )}
        </li>
    );
};

export default ChatsItem;
