import { toast } from 'sonner';

import supabase from '../../../../supabaseClient';

export const handleLogOut = async (): Promise<void> => {
    let { error } = await supabase.auth.signOut();

    if (error) {
        toast.error(`Log out error: ${error.message}`);
        console.error(error);
    } else {
        toast.success('Logged out successfully.');
    }
};
