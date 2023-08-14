export const allSwaras = ["R1", "R2", "R3", "G1", "G2", "G3", "M1", "M2", "P", "D1", "D2", "D3", "N1", "N2", "N3"];

// Swara Select Filter Related
export type SwaraSelectKey = 'S' | 'R1' | 'R2' | 'R3' | 'G1' | 'G2' | 'G3' | 'M1' | 'M2' | 'P' | 'D1' | 'D2' | 'D3' | 'N1' | 'N2' | 'N3';
export type SwaraSelectState = {
    S: boolean;
    R1: boolean;
    R2: boolean;
    R3: boolean;
    G1: boolean;
    G2: boolean;
    G3: boolean;
    M1: boolean;
    M2: boolean;
    P: boolean;
    D1: boolean;
    D2: boolean;
    D3: boolean;
    N1: boolean;
    N2: boolean;
    N3: boolean;
    
};
export const selectableSwaras = ["R1", "R2G1", "R3G2", "G3", "M1", "M2", "P", "D1", "D2N1", "D3N2", "N3"];
export const swaraSelectStartState = {
    S: false,
    R1: false,
    R2: false,
    R3: false,
    G1: false,
    G2: false,
    G3: false,
    M1: false,
    M2: false,
    P: false,
    D1: false,
    D2: false,
    D3: false,
    N1: false,
    N2: false,
    N3: false,
};

// Swara Color Related
export const swaraColorMap = new Map([
    ["S", "dark.3"],
    ["P", "pink.5"],
    ["R1", "pink.3"],
    ["R2", "grape.3"],
    ["R3", "violet.3"],
    ["G1", "indigo.3"],
    ["G2", "indigo.4"],
    ["G3", "blue.3"],
    ["M1", "cyan.3"],
    ["M2", "cyan.4"],
    ["D1", "teal.3"],
    ["D2", "green.3"],
    ["D3", "lime.3"],
    ["N1", "yellow.3"],
    ["N2", "orange.3"],
    ["N3", "orange.4"],
])

export const swaraHexColorMap = new Map([
    ["S", "#5c5f66"],
    ["P", "#f06595"],
    ["R1", "#faa2c1"],
    ["R2", "#e599f7"],
    ["R3", "#b197fc"],
    ["G1", "#91a7ff"],
    ["G2", "#748ffc"],
    ["G3", "#74c0fc"],
    ["M1", "#66d9e8"],
    ["M2", "#3bc9db"],
    ["D1", "#63e6be"],
    ["D2", "#8ce99a"],
    ["D3", "#c0eb75"],
    ["N1", "#ffe066"],
    ["N2", "#ffc078"],
    ["N3", "#ffa94d"],
])

// Swara Note Related
export const swaraNoteMap = new Map([
    ["S", "C4"],
    ["R1", "C#4"],
    ["R2", "D4"],
    ["R3", "D#4"],
    ["G1", "D4"],
    ["G2", "D#4"],
    ["G3", "E4"],
    ["M1", "F4"],
    ["M2", "F#4"],
    ["P", "G4"],
    ["D1", "G#4"],
    ["D2", "A4"],
    ["D3", "A#4"],
    ["N1", "A4"],
    ["N2", "A#4"],
    ["N3", "B4"],
])