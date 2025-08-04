import { toast } from 'sonner';
import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';

import { CompanyWithUser } from '@/shared/types/database.types';
import supabase from '@/../supabaseClient';
import { ICompanySearchForm } from '../components/CompaniesSearchForm/CompaniesSearchForm';
import { ICompanyCreateForm } from '@/modules/CompanyCreate';

export const companiesApi = createApi({
    reducerPath: 'companiesApi',
    baseQuery: fakeBaseQuery(),
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

        createCompany: builder.mutation<
            { companyId: string },
            { companyData: ICompanyCreateForm }
        >({
            queryFn: async ({ companyData }) => {
                try {
                    const { data, error } = await supabase
                        .from('companies')
                        .insert(companyData)
                        .select()
                        .single();

                    if (error) throw error;

                    const companyId = data.id;

                    return { data: { companyId } };
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
    }),
});

export const { useGetCompaniesQuery, useCreateCompanyMutation } = companiesApi;
