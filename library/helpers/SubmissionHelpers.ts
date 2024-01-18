import { SupabaseClient } from "@supabase/supabase-js";
import { PendingArtist, SubmissionArtist, SubmissionPendingArtist } from "./ArtistHelpers";

export type Submission = {
    id: number;
    user_id: string;
    status: string;
    notes: string;
    approved_video_id: string;
    composer_id: number;
    composition_title: string;
    moods: string[];
    format: string;
    youtube_url: string;
    youtube_video_id: string;
    title: string;
    image: string;
    composition_id: number;
    new_composition: boolean;
    raga_id: number;
    tala_id: number;
    submitted_at: string;
    ragas: { format_name: string };
    talas: { name: string };
    composers: { name: string };
    compositions: { title: string };
    submission_artists: SubmissionArtist[]
    submission_pending_artists: SubmissionPendingArtist[]
}

export async function approveSubmissionStatus(submission: Submission, musicVideoId: string, supabase: SupabaseClient) {
    const { error } = await supabase
        .from('submissions')
        .update({ status: 'approved', approved_video_id: musicVideoId })
        .eq('id', submission.id);

    if (error) throw error;
}

export async function rejectSubmissionStatus(submission: Submission, supabase: SupabaseClient) {
    const { error } = await supabase
        .from('submissions')
        .update({ status: 'rejected' })
        .eq('id', submission.id);

    if (error) throw error;
}


