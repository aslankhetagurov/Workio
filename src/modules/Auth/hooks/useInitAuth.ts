import { useEffect } from 'react';
import { toast } from 'sonner';
import { AuthChangeEvent, Session } from '@supabase/supabase-js';

import { useAppDispatch } from '@/store/hooks';
import supabase from '../../../../supabaseClient';
import { setUserData, setUserDataIsLoading } from '../store/authSlice';
import { Tables } from '@/shared/types/database.types';

export const useInitAuth = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange(
            (_event: AuthChangeEvent, session: Session | null) => {
                if (!session) {
                    dispatch(setUserData(null));
                    return;
                }
                dispatch(setUserDataIsLoading(true));

                (async () => {
                    const { data: userInfo, error } = await supabase
                        .from('users')
                        .select('*')
                        .eq('id', session?.user.id)
                        .single<Tables<'users'>>();

                    if (error) {
                        toast.error(
                            'Error fetching user data. Please try again later.'
                        );
                        console.error(error);
                    }

                    if (userInfo) {
                        dispatch(
                            setUserData({
                                ...session?.user,
                                ...userInfo,
                            })
                        );
                    }
                    dispatch(setUserDataIsLoading(false));
                })();
            }
        );

        return () => {
            subscription.unsubscribe();
        };
    }, [dispatch]);
};
