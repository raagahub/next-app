import { SupabaseClient } from "@supabase/supabase-js";
import { databaseErrorNotification } from "./NotificationHelpers";

export type Artist = {
    id: number;
    name: string;
    main_instrument: string;
}

export const defaultArtist = (role: string = 'main'): SubmissionArtist => {
    return {
        submission_id: 0,
        artist_id: 0,
        role: role,
        instrument: '',
        artists: {
            name: '',
            id: 0, // Not Used
            main_instrument: '', // Not Used
        }
    }
}

export type SubmissionArtist = {
    submission_id: number;
    artist_id: number;
    role: string;
    instrument: string;
    artists: Artist;
}

export type SubmissionPendingArtist = {
    submission_id: number;
    pending_artist_id: number;
    role: string;
    instrument: string;
    pending_artists: PendingArtist;
}

export type PendingArtist = {
    id: number;
    name: string;
    role: string;
    main_instrument: string;
    submitted_at: string;
    status: string;
}

// Instrument Options

export const leadOptions = [
    { value: 'vocal', label: 'Vocal' },
    { value: 'violin', label: 'Violin' },
    { value: 'flute', label: 'Flute / Venu' },
    { value: 'veena', label: 'Veena' },
    { value: 'nadaswaram', label: 'Nadaswaram' },
    { value: 'others', label: 'Others' },
];

export const accompanimentOptions = [
    { value: 'vocal', label: 'Vocal' },
    { value: 'violin', label: 'Violin' },
    { value: 'mridangam', label: 'Mridangam' },
    { value: 'ghatam', label: 'Ghatam' },
    { value: 'kanjira', label: 'Kanjira' },
    { value: 'morsing', label: 'Morsing' },
    { value: 'tambura', label: 'Tambura' },
    { value: 'tabla', label: 'Tabla' },
];

// Database Functions

export async function getArtists(supabase: SupabaseClient) {
    const { data: artists, status, error } = await supabase
        .from('artists')
        .select('id, name, main_instrument')

    if (error) throw error;
    return artists;
}

export async function getArtist(artistId: number, supabase: SupabaseClient) {
    const { data: artist, status, error } = await supabase
        .from('artists')
        .select('id, name, main_instrument')
        .eq('id', artistId)
        .single()

    if (error) throw error;
    return artist;
}

export async function insertSubmissionArtist(artist: SubmissionPendingArtist, artistId: number, supabase: SupabaseClient) {
    const { data: submissionArtist, error } = await supabase
        .from('submission_artists')
        .insert([{
            submission_id: artist.submission_id,
            artist_id: artistId,
            role: artist.role,
            instrument: artist.instrument
        }])
        .select()
        .single()

    if (error) throw error;
    return submissionArtist;
}

export async function deleteSubmissionPendingArtist(artist: SubmissionPendingArtist, supabase: SupabaseClient) {
    const { status, error } = await supabase
        .from('submission_pending_artists')
        .delete()
        .eq('pending_artist_id', artist.pending_artist_id)

    if (error) throw error;
}

export async function processSubmissionArtists(submissionId: number, musicVideoId: string, supabase: SupabaseClient) {
    const { data: subArtists, status: subArtistsStatus, error: subArtistsError } = await supabase
        .from('submission_artists')
        .select()
        .eq('submission_id', submissionId)

    if (subArtistsStatus == 200 && subArtists) {
        subArtists.forEach((subArtist: SubmissionArtist) => {
            insertMusicVideoArtist(subArtist, musicVideoId, supabase);
        })
    }

}

export async function insertMusicVideoArtist(artist: SubmissionArtist, musicVideoId: string, supabase: SupabaseClient) {
    const { data: musicVideoArtist, error } = await supabase
        .from('music_video_artists')
        .insert([{
            video_id: musicVideoId,
            artist_id: artist.artist_id,
            role: artist.role,
            instrument: artist.instrument
        }])
        .select()
        .single()

    if (error) throw error;
    return musicVideoArtist;

}