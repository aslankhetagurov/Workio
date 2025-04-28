import { useState } from 'react';
import { toast } from 'sonner';

import supabase from '../../../../supabaseClient';
import { toggleAuthModal } from '../store/authSlice';
import { useAppDispatch } from '@/store/hooks';

interface AuthCredentials {
    email: string;
    password: string;
    fullName?: string;
    role?: 'employer' | 'applicant';
}

type AuthType = 'signUp' | 'logIn' | 'updateUser';

export const useAuth = () => {
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useAppDispatch();

    const handleAuth = async (type: AuthType, credentials: AuthCredentials) => {
        try {
            setIsLoading(true);
            const { email, password, fullName, role } = credentials;

            const authFn =
                type === 'signUp'
                    ? 'signUp'
                    : type === 'logIn'
                    ? 'signInWithPassword'
                    : 'updateUser';

            let { data, error } = await supabase.auth[authFn]({
                email,
                password,
                options: {
                    data: {
                        full_name: fullName,
                        role: role,
                    },
                },
            });

            if (error) throw error;

            if (data?.user && type === 'signUp') {
                toast('Please confirm your email');
            }

            dispatch(toggleAuthModal());
        } catch (err: unknown) {
            toast.error(
                `Authentication error: ${
                    err instanceof Error ? err.message : err
                }`
            );
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    return { handleAuth, isLoading };
};
