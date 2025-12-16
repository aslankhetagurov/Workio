import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';

import { ChatWithRelations, Tables } from '@/shared/types/database.types';
import supabase from '../../../../supabaseClient';

export const chatsApi = createApi({
    reducerPath: 'chatsApi',
    baseQuery: fakeBaseQuery(),
    tagTypes: ['Chats', 'Messages'],
    endpoints: (builder) => ({
        getUserChats: builder.query<ChatWithRelations[], string>({
            queryFn: async (userId) => {
                const { data, error } = await supabase
                    .from('chats')
                    .select(
                        `
            *,
            messages (*, sender:users(*) ),
            vacancies (*, companies (*)),
            resumes (*, users (*)),
            applicant:users!chats_applicant_id_fkey (*),
            employer:users!chats_employer_id_fkey (*)
          `
                    )
                    .or(`applicant_id.eq.${userId},employer_id.eq.${userId}`)
                    .order('updated_at', { ascending: false });

                if (error) {
                    return {
                        error: {
                            status: error.code ?? 'SUPABASE_ERROR',
                            data: error.message,
                        },
                    };
                }
                return { data: data || [] };
            },
            providesTags: ['Chats'],
        }),

        getChatMessages: builder.query<Tables<'messages'>[], string>({
            queryFn: async (chatId) => {
                const { data, error } = await supabase
                    .from('messages')
                    .select('*, sender:users(*)')
                    .eq('chat_id', chatId)
                    .order('created_at', { ascending: true });

                if (error) {
                    return {
                        error: {
                            status: error.code ?? 'SUPABASE_ERROR',
                            data: error.message,
                        },
                    };
                }

                return { data: data || [] };
            },
        }),

        sendMessage: builder.mutation<
            Tables<'messages'>,
            { chatId: string; content: string; senderId: string }
        >({
            queryFn: async ({ chatId, content, senderId }) => {
                const { data, error } = await supabase
                    .from('messages')
                    .insert({
                        chat_id: chatId,
                        content,
                        sender_id: senderId,
                        read: false,
                    })
                    .select('*, sender:users(*)')
                    .single();

                await supabase
                    .from('chats')
                    .update({ updated_at: new Date().toISOString() })
                    .eq('id', chatId);

                if (error) {
                    return {
                        error: {
                            status: error.code ?? 'SUPABASE_ERROR',
                            data: error.message,
                        },
                    };
                }

                return { data: data! };
            },
        }),

        getOrCreateChat: builder.mutation<
            ChatWithRelations,
            {
                resumeId: string;
                applicantId: string;
                employerId: string;
                vacancyId: string;
            }
        >({
            invalidatesTags: ['Chats'],
            queryFn: async ({
                resumeId,
                applicantId,
                employerId,
                vacancyId,
            }) => {
                const { data: existingChat, error: existingError } =
                    await supabase
                        .from('chats')
                        .select(
                            `
                    *,
                    vacancies(*),
                    resumes(*),
                    applicant:users!chats_applicant_id_fkey(*),
                    employer:users!chats_employer_id_fkey(*)
                `
                        )
                        .eq('resume_id', resumeId)
                        .eq('applicant_id', applicantId)
                        .eq('vacancy_id', vacancyId)
                        .eq('employer_id', employerId)
                        .single();

                if (existingError && existingError.code !== 'PGRST116') {
                    return {
                        error: {
                            status: existingError.code ?? 'SUPABASE_ERROR',
                            data: existingError.message,
                        },
                    };
                }

                if (existingChat) {
                    return { data: existingChat };
                }

                const { data: newChat, error } = await supabase
                    .from('chats')
                    .insert({
                        resume_id: resumeId,
                        vacancy_id: vacancyId,
                        applicant_id: applicantId,
                        employer_id: employerId,
                    })
                    .select(
                        `
                *,
                vacancies(*),
                resumes(*),
                applicant:users!chats_applicant_id_fkey(*),
                employer:users!chats_employer_id_fkey(*)
            `
                    )
                    .single();

                if (error) {
                    return {
                        error: {
                            status: error.code ?? 'SUPABASE_ERROR',
                            data: error.message,
                        },
                    };
                }

                return { data: newChat };
            },
        }),

        markMessagesAsRead: builder.mutation<
            void,
            { chatId: string; userId: string }
        >({
            queryFn: async ({ chatId, userId }) => {
                const { error } = await supabase
                    .from('messages')
                    .update({ read: true })
                    .eq('chat_id', chatId)
                    .neq('sender_id', userId)
                    .eq('read', false);

                if (error) {
                    return {
                        error: {
                            status: error.code ?? 'SUPABASE_ERROR',
                            data: error.message,
                        },
                    };
                }

                return { data: undefined };
            },
        }),

        getUnreadCount: builder.query<
            number,
            { userId: string; chatId: string }
        >({
            queryFn: async ({ userId, chatId }) => {
                const { count, error } = await supabase
                    .from('messages')
                    .select('*', { count: 'exact', head: true })
                    .eq('read', false)
                    .eq('chat_id', chatId)
                    .neq('sender_id', userId);

                if (error) {
                    return {
                        error: {
                            status: error.code ?? 'SUPABASE_ERROR',
                            data: error.message,
                        },
                    };
                }

                return { data: count || 0 };
            },
        }),

        getAllUnreadCount: builder.query<number, string>({
            queryFn: async (userId) => {
                const { data, error } = await supabase
                    .from('unread_messages_count')
                    .select('unread_count')
                    .eq('user_id', userId)
                    .single();

                if (error) {
                    return {
                        error: {
                            status: error.code ?? 'SUPABASE_ERROR',
                            data: error.message,
                        },
                    };
                }

                return { data: data?.unread_count || 0 };
            },
        }),
    }),
});

export const {
    useGetUserChatsQuery,
    useGetChatMessagesQuery,
    useSendMessageMutation,
    useMarkMessagesAsReadMutation,
    useGetUnreadCountQuery,
    useGetOrCreateChatMutation,
    useGetAllUnreadCountQuery,
} = chatsApi;
