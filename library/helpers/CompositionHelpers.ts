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
}

export const defaultComposition: Composition = {
    id: 0,
    raga: 0,
    tala: 0,
    format: '',
    title: '',
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

