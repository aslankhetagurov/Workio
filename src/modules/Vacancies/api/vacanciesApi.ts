import { toast } from 'sonner';
import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';

import { Tables, VacancyWithCompany } from '@/shared/types/database.types';
import supabase from '../../../../supabaseClient';
import { IJobSearchForm } from '@/shared/components/JobSearchForm/JobSearchForm';
import { IVacancyForm } from '@/shared/components/VacancyForm/VacancyForm';

export const vacanciesApi = createApi({
    reducerPath: 'vacanciesApi',
    baseQuery: fakeBaseQuery(),
    endpoints: (builder) => ({
        getVacancies: builder.query<
            VacancyWithCompany[],
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
                        .from('vacancies')
                        .select('*, companies(*)')
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
                    console.error('Failed to fetch vacancies:', error);

                    if (error instanceof Error) {
                        toast.error(
                            `Failed to fetch vacancies: ${error.message}`
                        );
                    } else {
                        toast.error('Failed to fetch vacancies');
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

        createVacancy: builder.mutation<
            { vacancyId: string },
            { vacancyData: IVacancyForm }
        >({
            queryFn: async ({ vacancyData }) => {
                try {
                    const { data, error } = await supabase
                        .from('vacancies')
                        .insert(vacancyData)
                        .select()
                        .single();

                    if (error) throw error;

                    const vacancyId = data.id;

                    return { data: { vacancyId } };
                } catch (error) {
                    console.error('Failed to create vacancy:', error);

                    toast.error(
                        error instanceof Error
                            ? `Failed to create vacancy: ${error.message}`
                            : 'Failed to create vacancy'
                    );

                    return {
                        error: {
                            status: 'CUSTOM_ERROR',
                            error: 'Failed to create vacancy',
                        },
                    };
                }
            },
        }),

        getEmployerVacancies: builder.query<Tables<'vacancies'>[], string>({
            queryFn: async (id) => {
                try {
                    const { data, error } = await supabase
                        .from('vacancies')
                        .select('*')
                        .eq('company_id', id);

                    if (error) throw error;

                    return { data };
                } catch (error) {
                    console.error('Failed to fetch vacancies:', error);

                    toast.error(
                        error instanceof Error
                            ? `Failed to fetch vacancies: ${error.message}`
                            : 'Failed to fetch vacancies'
                    );

                    return {
                        error: {
                            status: 'CUSTOM_ERROR',
                            error: 'Failed to fetch vacancies',
                        },
                    };
                }
            },
        }),

        deleteVacancy: builder.mutation<void, string>({
            queryFn: async (id) => {
                try {
                    const { error } = await supabase
                        .from('vacancies')
                        .delete()
                        .eq('id', id);

                    if (error) throw error;

                    return { data: undefined };
                } catch (error) {
                    console.error('Failed to delete vacancy:', error);

                    toast.error(
                        error instanceof Error
                            ? `Failed to delete vacancy: ${error.message}`
                            : 'Failed to delete vacancy'
                    );

                    return {
                        error: {
                            status: 'CUSTOM_ERROR',
                            error: 'Failed to delete vacancy',
                        },
                    };
                }
            },
        }),

        editVacancy: builder.mutation<
            string,
            { vacancyId: string; data: IVacancyForm }
        >({
            queryFn: async ({ vacancyId, data }) => {
                try {
                    const { error } = await supabase
                        .from('vacancies')
                        .update(data)
                        .eq('id', vacancyId);

                    if (error) throw error;

                    return { data: undefined };
                } catch (error) {
                    console.error('Failed to edit vacancy:', error);

                    toast.error(
                        error instanceof Error
                            ? `Failed to edit vacancy: ${error.message}`
                            : 'Failed to edit vacancy'
                    );

                    return {
                        error: {
                            status: 'CUSTOM_ERROR',
                            error: 'Failed to edit vacancy',
                        },
                    };
                }
            },
        }),
    }),
});

export const {
    useGetVacanciesQuery,
    useCreateVacancyMutation,
    useGetEmployerVacanciesQuery,
    useDeleteVacancyMutation,
    useEditVacancyMutation,
} = vacanciesApi;
