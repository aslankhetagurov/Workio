import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { toast } from 'sonner';

import supabase from '../../../supabaseClient';
import { ApplicationWithRelations } from '@/shared/types/database.types';
import { TApplicationStatus } from '../../shared/consts/applicationStatus';

export const applicationsApi = createApi({
    reducerPath: 'applicationsApi',
    baseQuery: fakeBaseQuery(),
    tagTypes: ['application'],
    endpoints: (builder) => ({
        setApplication: builder.mutation<
            { applicationId: string },
            { user_id: string; vacancy_id: string; resume_id: string }
        >({
            invalidatesTags: ['application'],
            queryFn: async ({ user_id, vacancy_id, resume_id }) => {
                try {
                    const { data, error } = await supabase
                        .from('applications')
                        .insert({ user_id, vacancy_id, resume_id })
                        .select()
                        .single();

                    if (error) throw error;

                    return { data: { applicationId: data.id } };
                } catch (error) {
                    console.error('Failed to send application:', error);

                    toast.error(
                        error instanceof Error
                            ? `Failed to send application: ${error.message}`
                            : 'Failed to send application'
                    );

                    return {
                        error: {
                            status: 'CUSTOM_ERROR',
                            error: 'Failed to send application',
                        },
                    };
                }
            },
        }),

        getApplications: builder.query<ApplicationWithRelations[], string>({
            providesTags: ['application'],
            queryFn: async (userId) => {
                try {
                    const { data, error } = await supabase
                        .from('applications')
                        .select(
                            '*, vacancies(*, companies(*)), resumes(*), users(*)'
                        )
                        .eq('user_id', userId)
                        .order('created_at', { ascending: false });

                    if (error) throw error;

                    return { data };
                } catch (error) {
                    console.error('Failed to fetch applications:', error);

                    toast.error(
                        error instanceof Error
                            ? `Failed to fetch applications: ${error.message}`
                            : 'Failed to fetch applications'
                    );

                    return {
                        error: {
                            status: 'CUSTOM_ERROR',
                            error: 'Failed to fetch applications',
                        },
                    };
                }
            },
        }),

        getEmployerApplications: builder.query<
            ApplicationWithRelations[],
            string
        >({
            providesTags: ['application'],
            queryFn: async (companyId) => {
                try {
                    const { data, error } = await supabase
                        .from('applications')
                        .select(
                            '*, vacancies(*, companies(*)), resumes(*), users(*)'
                        )
                        .eq('vacancies.company_id', companyId)
                        .order('created_at', { ascending: false });

                    if (error) throw error;

                    return { data };
                } catch (error) {
                    console.error('Failed to fetch applications:', error);

                    toast.error(
                        error instanceof Error
                            ? `Failed to fetch applications: ${error.message}`
                            : 'Failed to fetch applications'
                    );

                    return {
                        error: {
                            status: 'CUSTOM_ERROR',
                            error: 'Failed to fetch applications',
                        },
                    };
                }
            },
        }),

        setApplicationStatus: builder.mutation<
            { status: TApplicationStatus },
            { status: TApplicationStatus; applicationId: string }
        >({
            invalidatesTags: ['application'],
            queryFn: async ({ status, applicationId }) => {
                try {
                    const { error } = await supabase
                        .from('applications')
                        .update({ status: status })
                        .eq('id', applicationId)
                        .select();

                    if (error) throw error;

                    return { data: { status } };
                } catch (error) {
                    console.error(
                        'Failed to update application status:',
                        error
                    );

                    toast.error(
                        error instanceof Error
                            ? `Failed to update application status: ${error.message}`
                            : 'Failed to update application status'
                    );

                    return {
                        error: {
                            status: 'CUSTOM_ERROR',
                            error: 'Failed to update application status',
                        },
                    };
                }
            },
        }),

        deleteApplication: builder.mutation<void, string>({
            invalidatesTags: ['application'],
            queryFn: async (applicationId) => {
                try {
                    const { error } = await supabase
                        .from('applications')
                        .delete()
                        .eq('id', applicationId);

                    if (error) throw error;

                    return { data: undefined };
                } catch (error) {
                    console.error('Failed to delete application:', error);

                    toast.error(
                        error instanceof Error
                            ? `Failed to delete application: ${error.message}`
                            : 'Failed to delete application'
                    );

                    return {
                        error: {
                            status: 'CUSTOM_ERROR',
                            error: 'Failed to delete application',
                        },
                    };
                }
            },
        }),
    }),
});

export const {
    useSetApplicationMutation,
    useGetApplicationsQuery,
    useSetApplicationStatusMutation,
    useDeleteApplicationMutation,
    useGetEmployerApplicationsQuery,
} = applicationsApi;
