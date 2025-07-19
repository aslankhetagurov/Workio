import { toast } from 'sonner';
import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';

import { ResumeWithUser } from '@/shared/types/database.types';
import supabase from '@/../supabaseClient';
import { IJobSearchForm } from '@/shared/components/JobSearchForm/JobSearchForm';
import { IResumeCreationForm } from '@/modules/ResumeCreation/types/IResumeCreationForm.types';

export const resumesApi = createApi({
    reducerPath: 'resumesApi',
    baseQuery: fakeBaseQuery(),
    endpoints: (builder) => ({
        getResumes: builder.query<
            ResumeWithUser[],
            {
                filters: IJobSearchForm | null;
                limit: number;
                offset: number;
            }
        >({
            queryFn: async (args) => {
                const { filters, limit = 10, offset } = args;

                try {
                    let query = supabase
                        .from('resumes')
                        .select('*, users(*)')
                        .range(offset, offset + limit - 1);

                    if (filters) {
                        const {
                            accessibility,
                            employment,
                            category,
                            keywords,
                            location,
                            createdAt,
                            salaryMin,
                            salaryMax,
                        } = filters;

                        if (accessibility && accessibility !== 'All') {
                            query = query.eq('accessibility', accessibility);
                        }
                        if (employment && employment !== 'All') {
                            query = query.eq('employment', employment);
                        }
                        if (category) {
                            query = query.eq('category', category);
                        }
                        if (keywords) {
                            query = query.ilike('title', `%${keywords}%`);
                        }
                        if (location) {
                            query = query.ilike('location', `%${location}%`);
                        }
                        if (createdAt && createdAt !== 'All') {
                            query = query.gte('created_at', createdAt);
                        }
                        if (salaryMin) {
                            query = query.gte('salary_per_month', salaryMin);
                        }
                        if (salaryMax) {
                            query = query.lte('salary_per_month', salaryMax);
                        }
                    }
                    const { data, error } = await query;

                    if (error) throw error;

                    return { data };
                } catch (error) {
                    console.error('Failed to fetch resumes:', error);

                    if (error instanceof Error) {
                        toast.error(
                            `Failed to fetch resumes: ${error.message}`
                        );
                    } else {
                        toast.error('Failed to fetch resumes');
                    }

                    return {
                        error: {
                            status: 'CUSTOM_ERROR',
                            error: 'Failed to load',
                        },
                    };
                }
            },
        }),

        createResume: builder.mutation<
            { resumeId: string },
            { data: IResumeCreationForm; userId: string }
        >({
            queryFn: async (args) => {
                const { data, userId } = args;
                const { education, work_experiences, ...resumeData } = data;

                try {
                    const { data, error } = await supabase
                        .from('resumes')
                        .insert({ ...resumeData, user_id: userId })
                        .select()
                        .single();

                    if (error) throw error;

                    const resumeId = data.id;

                    const { error: educationInsertError } = await supabase
                        .from('education')
                        .insert(
                            education.map((e) => ({
                                resume_id: resumeId,
                                ...e,
                            }))
                        );

                    const { error: workInsertError } = await supabase
                        .from('work_experiences')
                        .insert(
                            work_experiences.map((w) => ({
                                resume_id: resumeId,
                                ...w,
                            }))
                        );

                    if (educationInsertError || workInsertError) {
                        await supabase
                            .from('resumes')
                            .delete()
                            .eq('id', resumeId);
                        throw educationInsertError || workInsertError;
                    }

                    return { data: { resumeId } };
                } catch (error) {
                    console.error('Failed to create resume:', error);

                    toast.error(
                        error instanceof Error
                            ? `Failed to create resume: ${error.message}`
                            : 'Failed to create resume'
                    );

                    return {
                        error: {
                            status: 'CUSTOM_ERROR',
                            error: 'Failed to create resume',
                        },
                    };
                }
            },
        }),

        getApplicantResumes: builder.query<ResumeWithUser[], string>({
            queryFn: async (id) => {
                try {
                    const { data, error } = await supabase
                        .from('resumes')
                        .select('*, users(*)')
                        .eq('user_id', id);

                    if (error) throw error;

                    return { data };
                } catch (error) {
                    console.error('Failed to fetch resumes:', error);

                    toast.error(
                        error instanceof Error
                            ? `Failed to fetch resumes: ${error.message}`
                            : 'Failed to fetch resumes'
                    );

                    return {
                        error: {
                            status: 'CUSTOM_ERROR',
                            error: 'Failed to fetch resumes',
                        },
                    };
                }
            },
        }),

        deleteResume: builder.mutation<void, string>({
            queryFn: async (id) => {
                try {
                    const { error } = await supabase
                        .from('resumes')
                        .delete()
                        .eq('id', id);

                    if (error) throw error;

                    return { data: undefined };
                } catch (error) {
                    console.error('Failed to delete resume:', error);

                    toast.error(
                        error instanceof Error
                            ? `Failed to delete resume: ${error.message}`
                            : 'Failed to delete resume'
                    );

                    return {
                        error: {
                            status: 'CUSTOM_ERROR',
                            error: 'Failed to delete resume',
                        },
                    };
                }
            },
        }),
    }),
});

export const {
    useGetResumesQuery,
    useCreateResumeMutation,
    useGetApplicantResumesQuery,
    useDeleteResumeMutation,
} = resumesApi;
