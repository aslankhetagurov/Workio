import { toast } from 'sonner';
import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';

import { VacancyWithCompany } from '@/shared/types/database.types';
import { IVacanciesSearchForm } from '../components/VacanciesSearchForm/VacanciesSearchForm';
import supabase from '../../../../supabaseClient';

export const vacanciesApi = createApi({
    reducerPath: 'vacanciesApi',
    baseQuery: fakeBaseQuery(),
    endpoints: (builder) => ({
        getVacancies: builder.query<
            VacancyWithCompany[],
            {
                filters: IVacanciesSearchForm | null;
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
                            query = query.eq('location', location);
                        }
                        if (createdAt && createdAt !== 'All') {
                            query = query.gte('created_at', createdAt);
                        }
                        if (salaryMin) {
                            query = query.gte('salary_from', salaryMin);
                        }
                        if (salaryMax) {
                            query = query.lte('salary_to', salaryMax);
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
    }),
});

export const { useGetVacanciesQuery } = vacanciesApi;
