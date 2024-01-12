import { SupabaseClient } from "@supabase/supabase-js";
import { Composition } from "./CompositionHelpers";
import { Submission } from "./SubmissionHelpers";

export type MusicVideo = {
    id: string;
    user_id: string;
    composer_id: number;
    composition_id: number;
    composition_title: string;
    moods: string[];
    format: string;
    youtube_url: string;
    youtube_video_id: string;
    image: string;
    raga_id: number;
    tala_id: number;
}

// Database Functions

export async function insertNewMusicVideo(composition: Composition, submission: Submission, userId: string,  supabase: SupabaseClient) {
    const { data: musicVideo, error } = await supabase
        .from('music_videos')
        .insert({
            user_id: userId,
            format: composition.format,
            composition_id: composition.id,
            composition_title: composition.title,
            composer_id: composition.composer,
            raga_id: composition.raga,
            tala_id: composition.tala,
            youtube_video_id: submission.youtube_video_id,
            youtube_url: submission.youtube_url,
            image: submission.image,
            moods: submission.moods
        })
        .select()
        .single();

    if (error) throw error;
    return musicVideo;
}

export async function insertExistingMusicVideo(submission: Submission, userId: string,  supabase: SupabaseClient) {
    const { data: musicVideo, error } = await supabase
        .from('music_videos')
        .insert({
            user_id: userId,
            format: submission.format,
            composition_id: submission.id,
            composition_title: submission.title,
            composer_id: submission.composer_id,
            raga_id: submission.raga_id,
            tala_id: submission.tala_id,
            youtube_video_id: submission.youtube_video_id,
            youtube_url: submission.youtube_url,
            image: submission.image,
            moods: submission.moods
        })
        .select()
        .single();

    if (error) throw error;
    return musicVideo;
}

