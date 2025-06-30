import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { toast } from 'sonner';

import { CompanyWithUserAndVacanciesAndReviews } from '@/shared/types/database.types';
import supabase from '@/../supabaseClient';

export const singleCompanyApi = createApi({
    reducerPath: 'singleCompanyApi',
    baseQuery: fakeBaseQuery(),
    endpoints: (build) => ({
        getCompany: build.query<CompanyWithUserAndVacanciesAndReviews, string>({
            queryFn: async (id) => {
                try {
                    const { data, error } = await supabase
                        .from('companies')
                        .select('*, users(*), vacancies(*), company_reviews(*)')
                        .eq('id', id)
                        .single();

                    if (error) throw error;

                    return { data };
                } catch (error) {
                    console.error('Failed to fetch company:', error);

                    if (error instanceof Error) {
                        toast.error(
                            `Failed to fetch company: ${error.message}`
                        );
                    } else {
                        toast.error('Failed to fetch company');
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

export const { useGetCompanyQuery } = singleCompanyApi;
