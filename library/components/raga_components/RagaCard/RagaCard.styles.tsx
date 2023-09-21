import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    card: {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
        transition: 'transform 150ms ease, box-shadow 150ms ease',
        minWidth: '100%',

        '&:hover': {
            transform: 'scale(1.05)',
            boxShadow: theme.shadows.md
        },

        [theme.fn.smallerThan('md')]: {
            width: '100%'
        },
    },
    clickable: {
        '&:hover': {
            cursor: 'pointer'
        },
    },
    header: {
        minWidth: '100%',
    }
}));