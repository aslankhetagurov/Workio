import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { toast } from 'sonner';

import supabase from '../../../../supabaseClient';
import { ResumeWithUser } from '@/types/database.types';
import { TJobCategoriesWithAll } from '@/consts/jobCategories';

export const featuredResumesApi = createApi({
    reducerPath: 'featuredResumesApi',
    baseQuery: fakeBaseQuery(),
    endpoints: (builder) => ({
        getFeaturedResumes: builder.query<
            ResumeWithUser[],
            TJobCategoriesWithAll | null
        >({
            queryFn: async (category) => {
                try {
                    let query = supabase
                        .from('resumes')
                        .select('*, users(*)')
                        .order('rating', { ascending: false })
                        .limit(6);

                    if (category && category !== 'All categories') {
                        query = query.eq('category', category);
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
    }),
});

export const { useGetFeaturedResumesQuery } = featuredResumesApi;
