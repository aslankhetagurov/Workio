import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { toast } from 'sonner';

import supabase from '../../../../supabaseClient';
import { VacancyWithCompany } from '@/shared/types/database.types';
import { TJobCategoriesWithAll } from '@/shared/consts/jobCategories';

export const featuredVacanciesApi = createApi({
    reducerPath: 'featuredVacanciesApi',
    baseQuery: fakeBaseQuery(),
    endpoints: (builder) => ({
        getFeaturedVacancies: builder.query<
            VacancyWithCompany[],
            TJobCategoriesWithAll | null
        >({
            queryFn: async (category) => {
                try {
                    let query = supabase
                        .from('vacancies')
                        .select('*, companies(*)')
                        .order('rating', { ascending: false })
                        .limit(6);

                    if (category && category !== 'All categories') {
                        query = query.eq('category', category);
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

export const { useGetFeaturedVacanciesQuery } = featuredVacanciesApi;
