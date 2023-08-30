import { createStyles, rem } from '@mantine/core';

export default createStyles((theme) => ({
    tabs: {
        [theme.fn.smallerThan('sm')]: {
            display: 'none',
        },
    },

    tabsList: {
        
    },

    tab: {
        fontSize: 16,
        fontWeight: 400,
        height: rem(38),

        '&:hover': {
            borderColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[2],
        },

        '&[data-active]': {
            borderColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[2],
            color: theme.colorScheme === 'dark' ? theme.colors.gray[2] : theme.colors.dark[7],
            fontWeight: 700
        },
    },
}));
