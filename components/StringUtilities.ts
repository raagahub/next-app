// Return the ordinal suffixes for positive integers ie. 1st, 2nd, 3rd, etc.
export function nth(n: number){return["st","nd","rd"][((n+90)%100-10)%10-1]||"th"}