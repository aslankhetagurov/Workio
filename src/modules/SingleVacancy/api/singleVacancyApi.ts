import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { toast } from 'sonner';

import { VacancyWithCompany } from '@/shared/types/database.types';
import supabase from '@/../supabaseClient';

export const singleVacancyApi = createApi({
    reducerPath: 'singleVacancyApi',
    baseQuery: fakeBaseQuery(),
    endpoints: (build) => ({
        getVacancy: build.query<VacancyWithCompany, string>({
            queryFn: async (id) => {
                try {
                    const { data, error } = await supabase
                        .from('vacancies')
                        .select('*, companies(*, users(*))')
                        .eq('id', id)
                        .single();

                    if (error) throw error;

                    return { data };
                } catch (error) {
                    console.error('Failed to fetch vacancy:', error);

                    if (error instanceof Error) {
                        toast.error(
                            `Failed to fetch vacancy: ${error.message}`
                        );
                    } else {
                        toast.error('Failed to fetch vacancy');
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

export const { useGetVacancyQuery } = singleVacancyApi;
