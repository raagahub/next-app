import { SupabaseClient } from "@supabase/supabase-js";
import { Submission } from "./SubmissionHelpers";

export const comp_formats = [
    { value: 'varnam', label: 'Varnam' },
    { value: 'kriti', label: 'Kriti' },
    { value: 'rtp', label: 'Ragam Tanam Pallavi' },
    { value: 'keertana', label: 'Keertana' },
    { value: 'padam', label: 'Padam' },
    { value: 'javali', label: 'Javali' },
    { value: 'thillana', label: 'Thillana' },
    { value: 'viruttam', label: 'Viruttam' },
]

export interface Composition {
    id: number;
    raga: number;
    tala: number;
    format: string;
    title: string;
    composer: number;
}

export const defaultComposition: Composition = {
    id: 0,
    raga: 0,
    tala: 0,
    format: '',
    title: '',
    composer: 0
}

export interface Composer {
    id: number;
    name: string;
    years: string;
    languages: string;
    url: string;
}

export const defaultComposer: Composer = {
    id: 0,
    name: '',
    years: '',
    languages: '',
    url: '',
}

// Database Functions

export async function getComposition(compId: string, supabase: SupabaseClient) {
    const { data: composition, error } = await supabase
    .from('compositions')
    .select()
    .eq('id', compId)
    .single()

    if (error) throw error;
    return composition;
}

export async function getComposer(compId: string, supabase: SupabaseClient) {
    const { data: composer, error } = await supabase
    .from('composers')
    .select()
    .eq('id', compId)
    .single()

    if (error) throw error;
    return composer;
}

export async function insertNewComposition(submission: Submission, supabase: SupabaseClient) {
    const { data: composition, error } = await supabase
        .from('compositions')
        .insert({
            title: submission.composition_title,
            format: submission.format,
            raga: submission.raga_id,
            tala: submission.tala_id,
            composer: submission.composer_id
        })
        .select()
        .single()

    if (error) throw error;
    return composition;
}