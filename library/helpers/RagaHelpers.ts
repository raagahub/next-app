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

export type RagaType = 'melakarta' | 'janya'
export type RagaTypeState = {melakarta: boolean; janya: boolean}

export type RagaSwaraCountVal = 'five' | 'six' | 'seven' | 'others'
export type SwaraCountState = {five: boolean; six: boolean; seven: boolean; others: boolean;}

export type RagaSortOption = 'melakarta' | 'name'

export const RagaContext = createContext({} as Raga)
