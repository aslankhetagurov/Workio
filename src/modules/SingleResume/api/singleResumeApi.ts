import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { toast } from 'sonner';

import { ResumeWithUserAndExperiencesAndEducations } from '@/shared/types/database.types';
import supabase from '@/../supabaseClient';

export const singleResumeApi = createApi({
    reducerPath: 'singleResumeApi',
    baseQuery: fakeBaseQuery(),
    endpoints: (build) => ({
        getResume: build.query<
            ResumeWithUserAndExperiencesAndEducations,
            string
        >({
            queryFn: async (id) => {
                try {
                    const { data, error } = await supabase
                        .from('resumes')
                        .select(
                            '*, users(*), work_experiences(*), education(*)'
                        )
                        .eq('id', id)
                        .single();

                    if (error) throw error;

                    return { data };
                } catch (error) {
                    console.error('Failed to fetch resume:', error);

                    if (error instanceof Error) {
                        toast.error(`Failed to fetch resume: ${error.message}`);
                    } else {
                        toast.error('Failed to fetch resume');
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

export const { useGetResumeQuery } = singleResumeApi;
