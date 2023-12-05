import { createStyles, rem } from "@mantine/core";

export const useStyles = createStyles((theme) => ({
    avatar: {
        border: `2px solid ${theme.black}`,
        backgroundColor: theme.colors["raga-red"][6],
        color: theme.white,

        cursor: 'pointer',

        ...theme.fn.hover({
            border: `2px solid ${theme.colors["raga-red"][6]}`,
            backgroundColor: theme.white,
            color: theme.colors["raga-red"][6],
        }),
    },


}))