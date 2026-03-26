import { useEffect } from 'react';

import { useGetAllUnreadCountQuery } from '@/modules/Chats';
import supabase from '../../../../supabaseClient';

export const useUnreadMessagesCount = (userId: string | undefined) => {
    const {
        data: unreadCount = 0,
        refetch,
        isLoading,
        isError,
    } = useGetAllUnreadCountQuery(userId!, {
        skip: !userId,
    });

    useEffect(() => {
        if (!userId) return;

        const channel = supabase
            .channel('unread-messages')
            .on(
                'postgres_changes',
                {
                    event: '*',
                    schema: 'public',
                    table: 'messages',
                    filter: `sender_id=neq.${userId}`,
                },
                (payload) => {
                    const msg = payload.new;
                    if (!msg) return;

                    refetch();
                },
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [userId, refetch]);

    return { unreadCount, isLoading, isError };
};
