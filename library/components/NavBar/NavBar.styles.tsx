import { createStyles, rem } from "@mantine/core";

export const useStyles = createStyles((theme) => ({
    header: {
        backgroundColor: 'rgba(255, 255, 255, 0)',
        border: 'none',
        // borderBottom: '2px solid black'
        '&.scrolling': {
            backgroundColor: 'rgba(255, 255, 255, 1)',
            borderBottom: '2px solid black',
        }
    },

    link: {
        alignItems: 'center',
        borderRadius: '16px',
        border: '2px solid transparent',
        color: theme.black,
        display: 'flex',
        fontWeight: 500,
        fontSize: theme.fontSizes.sm,
        height: 'fit-content',
        padding: '4px 16px',
        margin: '0px 8px',
        textDecoration: 'none',

        ...theme.fn.hover({
            border: '2px solid black',
        }),
    },

    linkMobile: {
        fontSize: theme.fontSizes.xl,
        fontWeight: 700,
        borderTop: '2px solid black',
        color: theme.black,
        display: 'flex',
        height: 'fit-content',
        padding: '16px 32px',
        margin: '0',
        textDecoration: 'none',
        width: '100%',
        '&:first-child': {
            border: 'none'
        }

    },

    subLink: {
        width: '100%',
        padding: `${theme.spacing.xs} ${theme.spacing.md}`,
        borderRadius: theme.radius.md,

        ...theme.fn.hover({
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors['raga-green'][1]
        }),

        '&:active': theme.activeStyles,

        '&:disabled': {
            color: theme.colors.gray[6],
            cursor: 'not-allowed',
            '&:hover': {
                backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0]
            }
        }
    },

    signupButton: {
        backgroundColor: theme.colors["raga-orange"][8],
        borderColor: theme.black,
        color: theme.white,
        padding: '8px 16px',
        borderRadius: '32px',
        borderWidth: '2px',
        borderStyle: 'solid',
        fontSize: theme.fontSizes.md,
        fontWeight: 500,
        textAlign: 'center',

        ...theme.fn.hover({
            backgroundColor: theme.white,
            color: theme.colors["raga-orange"][8],
            borderColor: theme.colors["raga-orange"][8],
        }),

        [theme.fn.smallerThan('sm')]: {
            fontSize: theme.fontSizes.xl,
        },

    },

    dropdownFooter: {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors['raga-green'][1],
        margin: `calc(${theme.spacing.md} * -1)`,
        marginTop: theme.spacing.sm,
        padding: `${theme.spacing.md} calc(${theme.spacing.md} * 2)`,
        paddingBottom: theme.spacing.xl,
        borderTop: `${rem(1)} solid ${theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1]
            }`,
    },

    hiddenMobile: {
        [theme.fn.smallerThan('sm')]: {
            display: 'none',
        },
    },

    hiddenDesktop: {
        [theme.fn.largerThan('sm')]: {
            display: 'none',
        },
    },
}));