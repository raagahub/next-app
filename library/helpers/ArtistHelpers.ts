export type Artist = {
    id: number;
    name: string;
    main_instrument: string;
}

export const defaultArtiste: Artist = {
    id: 0,
    name: '',
    main_instrument: '',
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