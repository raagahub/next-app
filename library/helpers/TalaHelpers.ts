import { SupabaseClient } from "@supabase/supabase-js";

export interface Tala {
    id: number;
    name: string;
    nadai: number;
    jati: number;
    tala: string;
}

export const defaultTala: Tala = {
    id: 0,
    name: '',
    nadai: 0,
    jati: 0,
    tala: ''
}

// Database Functions

export async function getTala(talaId: string, supabase: SupabaseClient) {
    const { data: tala, error } = await supabase
    .from('talas')
    .select()
    .eq('id', talaId)
    .single()

    if (error) throw error;
    return tala;
}