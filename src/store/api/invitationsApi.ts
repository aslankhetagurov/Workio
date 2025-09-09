import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { toast } from 'sonner';

import { InvitationWithRelations } from '@/shared/types/database.types';
import supabase from '../../../supabaseClient';

type TInvitationStatus = 'pending' | 'approved' | 'rejected' | 'cancelled';

export const invitationsApi = createApi({
    reducerPath: 'invitationsApi',
    baseQuery: fakeBaseQuery(),
    tagTypes: ['invitation'],
    endpoints: (builder) => ({
        setInvitation: builder.mutation<
            { invitationId: string },
            { user_id: string; vacancy_id: string; resume_id: string }
        >({
            invalidatesTags: ['invitation'],
            queryFn: async ({ user_id, vacancy_id, resume_id }) => {
                try {
                    const { data, error } = await supabase
                        .from('invitations')
                        .insert({ user_id, vacancy_id, resume_id })
                        .select()
                        .single();

                    if (error) throw error;

                    return { data: { invitationId: data.id } };
                } catch (error) {
                    console.error('Failed to send invitation:', error);

                    toast.error(
                        error instanceof Error
                            ? `Failed to send invitation: ${error.message}`
                            : 'Failed to send invitation'
                    );

                    return {
                        error: {
                            status: 'CUSTOM_ERROR',
                            error: 'Failed to send invitation',
                        },
                    };
                }
            },
        }),

        getInvitations: builder.query<InvitationWithRelations[], string>({
            providesTags: ['invitation'],
            queryFn: async (userId) => {
                try {
                    const { data, error } = await supabase
                        .from('invitations')
                        .select(
                            '*, vacancies(*, companies(*)), resumes(*, users(*)), users(*)'
                        )
                        .eq('user_id', userId)
                        .order('created_at', { ascending: false });

                    if (error) throw error;

                    return { data };
                } catch (error) {
                    console.error('Failed to fetch invitations:', error);

                    toast.error(
                        error instanceof Error
                            ? `Failed to fetch invitations: ${error.message}`
                            : 'Failed to fetch invitations'
                    );

                    return {
                        error: {
                            status: 'CUSTOM_ERROR',
                            error: 'Failed to fetch invitations',
                        },
                    };
                }
            },
        }),

        getApplicantInvitations: builder.query<
            InvitationWithRelations[],
            string
        >({
            providesTags: ['invitation'],
            queryFn: async (userId) => {
                try {
                    const { data, error } = await supabase
                        .from('invitations')
                        .select(
                            '*, vacancies(*, companies(*)), resumes(*, users(*)), users(*)'
                        )
                        .eq('resumes.user_id', userId)
                        .order('created_at', { ascending: false });

                    if (error) throw error;

                    return { data };
                } catch (error) {
                    console.error('Failed to fetch invitations:', error);

                    toast.error(
                        error instanceof Error
                            ? `Failed to fetch invitations: ${error.message}`
                            : 'Failed to fetch invitations'
                    );

                    return {
                        error: {
                            status: 'CUSTOM_ERROR',
                            error: 'Failed to fetch invitations',
                        },
                    };
                }
            },
        }),

        setInvitationStatus: builder.mutation<
            { status: TInvitationStatus },
            { status: TInvitationStatus; invitationId: string }
        >({
            invalidatesTags: ['invitation'],
            queryFn: async ({ status, invitationId }) => {
                try {
                    const { error } = await supabase
                        .from('invitations')
                        .update({ status: status })
                        .eq('id', invitationId)
                        .select();

                    if (error) throw error;

                    return { data: { status } };
                } catch (error) {
                    console.error('Failed to update invitation status:', error);

                    toast.error(
                        error instanceof Error
                            ? `Failed to update invitation status: ${error.message}`
                            : 'Failed to update invitation status'
                    );

                    return {
                        error: {
                            status: 'CUSTOM_ERROR',
                            error: 'Failed to update invitation status',
                        },
                    };
                }
            },
        }),

        deleteInvitation: builder.mutation<void, string>({
            invalidatesTags: ['invitation'],
            queryFn: async (invitationId) => {
                try {
                    const { error } = await supabase
                        .from('invitations')
                        .delete()
                        .eq('id', invitationId);

                    if (error) throw error;

                    return { data: undefined };
                } catch (error) {
                    console.error('Failed to delete invitation:', error);

                    toast.error(
                        error instanceof Error
                            ? `Failed to delete invitation: ${error.message}`
                            : 'Failed to delete invitation'
                    );

                    return {
                        error: {
                            status: 'CUSTOM_ERROR',
                            error: 'Failed to delete invitation',
                        },
                    };
                }
            },
        }),
    }),
});

export const {
    useDeleteInvitationMutation,
    useGetInvitationsQuery,
    useSetInvitationMutation,
    useSetInvitationStatusMutation,
    useGetApplicantInvitationsQuery,
} = invitationsApi;
