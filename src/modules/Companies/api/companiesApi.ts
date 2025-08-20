import { toast } from 'sonner';
import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';

import {
    CompanyWithUser,
    CompanyWithUserAndVacanciesAndReviews,
    Tables,
} from '@/shared/types/database.types';
import supabase from '@/../supabaseClient';
import { ICompanySearchForm } from '../components/CompaniesSearchForm/CompaniesSearchForm';
import { ICompanyForm } from '@/shared/components/CompanyForm/CompanyForm';

export const companiesApi = createApi({
    reducerPath: 'companiesApi',
    baseQuery: fakeBaseQuery(),
    tagTypes: ['company'],
    endpoints: (builder) => ({
        getCompanies: builder.query<
            CompanyWithUser[],
            {
                filters: ICompanySearchForm | null;
                limit: number;
                offset: number;
            }
        >({
            queryFn: async (args) => {
                const { filters, limit = 10, offset } = args;

                try {
                    let query = supabase
                        .from('companies')
                        .select('*, users(*)')
                        .range(offset, offset + limit - 1);

                    if (filters) {
                        const { companyName, category, location } = filters;

                        if (companyName) {
                            query = query.ilike('name', `%${companyName}%`);
                        }
                        if (category) {
                            query = query.eq('industry', category);
                        }
                        if (location) {
                            query = query.ilike('location', `%${location}%`);
                        }
                    }
                    const { data, error } = await query;

                    if (error) throw error;

                    return { data };
                } catch (error) {
                    console.error('Failed to fetch companies:', error);

                    if (error instanceof Error) {
                        toast.error(
                            `Failed to fetch companies: ${error.message}`
                        );
                    } else {
                        toast.error('Failed to fetch companies');
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

        getCompany: builder.query<
            CompanyWithUserAndVacanciesAndReviews,
            string
        >({
            providesTags: ['company'],
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

        createCompany: builder.mutation<
            Tables<'companies'>,
            { companyData: ICompanyForm }
        >({
            queryFn: async ({ companyData }) => {
                try {
                    const { data, error } = await supabase
                        .from('companies')
                        .insert(companyData)
                        .select()
                        .single();

                    if (error) throw error;

                    return { data };
                } catch (error) {
                    console.error('Failed to create company:', error);

                    toast.error(
                        error instanceof Error
                            ? `Failed to create company: ${error.message}`
                            : 'Failed to create company'
                    );

                    return {
                        error: {
                            status: 'CUSTOM_ERROR',
                            error: 'Failed to create company',
                        },
                    };
                }
            },
        }),

        editCompany: builder.mutation<
            Tables<'companies'>,
            { companyId: string; data: ICompanyForm }
        >({
            invalidatesTags: ['company'],
            queryFn: async ({ companyId, data }) => {
                try {
                    const { data: resData, error } = await supabase
                        .from('companies')
                        .update(data)
                        .eq('id', companyId)
                        .select()
                        .single();

                    if (error) throw error;

                    return { data: resData };
                } catch (error) {
                    console.error('Failed to edit company information:', error);

                    toast.error(
                        error instanceof Error
                            ? `Failed to edit company information: ${error.message}`
                            : 'Failed to edit company information'
                    );

                    return {
                        error: {
                            status: 'CUSTOM_ERROR',
                            error: 'Failed to edit company information',
                        },
                    };
                }
            },
        }),

        deleteCompany: builder.mutation<void, string>({
            queryFn: async (id) => {
                try {
                    const { error } = await supabase
                        .from('companies')
                        .delete()
                        .eq('id', id);

                    if (error) throw error;

                    return { data: undefined };
                } catch (error) {
                    console.error('Failed to delete company:', error);

                    return {
                        error: {
                            status: 'CUSTOM_ERROR',
                            error: 'Failed to delete company',
                        },
                    };
                }
            },
        }),
    }),
});

export const {
    useGetCompaniesQuery,
    useCreateCompanyMutation,
    useEditCompanyMutation,
    useGetCompanyQuery,
    useDeleteCompanyMutation,
    useLazyGetCompanyQuery,
} = companiesApi;
