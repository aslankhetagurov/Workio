import { useEffect, useRef } from 'react';
import { PiCheckBold, PiChecksBold } from 'react-icons/pi';

import { ChatWithRelations, Tables } from '@/shared/types/database.types';
import { useGetChatMessagesQuery } from '../../api/chatsApi';
import Spinner from '@/shared/UI/Spinner/Spinner';
import { formatDateToTime } from '@/shared/lib/formatDateToTime';
import styles from './MessagesList.module.scss';

interface IMessagesListProps {
    activeChatData: ChatWithRelations;
    userData: Tables<'users'> | null;
}

const MessagesList = ({ activeChatData, userData }: IMessagesListProps) => {
    const messagesRef = useRef<HTMLUListElement>(null);
    const {
        data: messages,
        isFetching,
        refetch,
    } = useGetChatMessagesQuery(activeChatData?.id ?? '', {
        skip: !activeChatData?.id,
    });

    useEffect(() => {
        refetch();
    }, []);

    useEffect(() => {
        const messagesList = messagesRef.current;
        if (!messagesList) return;
        const isNearBottom =
            messagesList.scrollTop + messagesList.clientHeight >=
            messagesList.scrollHeight - 70;

        if (messagesList.scrollTop === 0)
            messagesList.scrollTo(0, messagesList.scrollHeight);

        if (isNearBottom) messagesList.scrollTo(0, messagesList.scrollHeight);
    }, [messages]);

    useEffect(() => {
        const messagesList = messagesRef.current;
        if (!messagesList) return;

        messagesList.scrollTo(0, messagesList.scrollHeight);
    }, [activeChatData]);

    if (!activeChatData) return null;

    if (isFetching) return <Spinner />;

    return (
        <ul className={styles.messages} ref={messagesRef}>
            {messages?.map((message) => {
                const isUser = userData?.id === message.sender_id;

                return (
                    <li
                        className={`${styles.messages__item} ${
                            isUser ? styles.messages__user : ''
                        }`}
                        key={message.id}
                    >
                        <p className={styles.messages__text}>
                            {message.content}
                        </p>

                        <div className={styles.messages__info}>
                            <span className={styles.messages__time}>
                                {formatDateToTime(message?.created_at)}
                            </span>

                            {isUser && (
                                <span className={styles.messages__status}>
                                    {message.read ? (
                                        <PiChecksBold
                                            className={styles.messages__icon}
                                        />
                                    ) : (
                                        <PiCheckBold
                                            className={styles.messages__icon}
                                        />
                                    )}
                                </span>
                            )}
                        </div>
                    </li>
                );
            })}
        </ul>
    );
};

export default MessagesList;
