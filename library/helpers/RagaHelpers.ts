import { SupabaseClient } from "@supabase/supabase-js";
import { createContext } from "react";

export interface Raga {
    id: number;
    name: string;
    format_name: string;
    arohanam: string;
    avarohanam: string;
    melakarta: number;
    is_janaka: boolean;
    is_janya: boolean;
    aliases: string;
    is_vakra: boolean;
    is_bashanga: boolean;
    is_upanga: boolean;
    raga_comments_cnt: number;
    raga_videos_cnt: number;
}

export const defaultRaga: Raga = { 
    id: 0,
    name: '',
    format_name: '',
    arohanam: '',
    avarohanam: '',
    melakarta: 0,
    is_janaka: false,
    is_janya: false,
    aliases: '',
    is_vakra: false,
    is_bashanga: false,
    is_upanga: false,
    raga_comments_cnt: 0,
    raga_videos_cnt: 0
}

export type RagaType = 'melakarta' | 'janya'
export type RagaTypeState = {melakarta: boolean; janya: boolean}

export type RagaSwaraCountVal = 'five' | 'six' | 'seven' | 'others'
export type SwaraCountState = {five: boolean; six: boolean; seven: boolean; others: boolean;}

export type RagaSortOption = 'melakarta' | 'name'

export const RagaContext = createContext({} as Raga)


// Database Functions

export async function getRaga(ragaId: string, supabase: SupabaseClient) {
    const { data: raga, error } = await supabase
    .from('ragas')
    .select()
    .eq('id', ragaId)
    .single()

    if (error) throw error;
    return raga;
}
