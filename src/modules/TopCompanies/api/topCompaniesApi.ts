import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { toast } from 'sonner';

import supabase from '../../../../supabaseClient';
import { Tables } from '@/types/database.types';

export const topCompaniesApi = createApi({
    reducerPath: 'topCompaniesApi',
    baseQuery: fakeBaseQuery(),
    endpoints: (builder) => ({
        getTopCompanies: builder.query<Tables<'companies'>[], void>({
            queryFn: async () => {
                try {
                    const { data, error } = await supabase
                        .from('companies')
                        .select('*')
                        .order('rating', { ascending: false })
                        .limit(6);

                    if (error) throw error;

                    if (!data) {
                        return {
                            error: {
                                status: 'NO_DATA',
                                error: 'No companies found',
                            },
                        };
                    }

                    return { data };
                } catch (error) {
                    console.error('Failed to fetch top companies:', error);

                    if (error instanceof Error) {
                        toast.error(
                            `Failed to fetch top companies: ${error.message}`
                        );
                    } else {
                        toast.error('Failed to fetch top companies');
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

export const { useGetTopCompaniesQuery } = topCompaniesApi;
