import { useSession, useSupabaseClient, useUser } from '@supabase/auth-helpers-react';

export const initSupabase = () => {
    const supabase = useSupabaseClient()
    const session = useSession()
    const user = useUser()

    return {
        supabase: supabase,
        session: session,
        user: user
    }
}