import { UnstyledButton, createStyles, DefaultProps, useMantineTheme } from '@mantine/core';

const useStyles = createStyles((theme, params: { color: keyof typeof theme.colors }) => ({
    '.shadow-button': {
        fontSize: '20px',
        fontWeight: 500,
        backgroundColor: 'white',
        padding: '8px 16px',
        marginLeft: '-8px',
        width: 'fit-content',
        borderRadius: '100px',
        borderWidth: '2px',
        borderStyle: 'solid',
        boxShadow: `4px 4px 0px 0px ${theme.colors['gray'][8]}`,
        borderColor: theme.colors[params.color][8], // Dynamic border color
        color: theme.colors[params.color][8], // Dynamic text color
        '&:hover': {
            color: theme.colors['gray'][8],
            borderColor: theme.colors['gray'][8],
            boxShadow: `4px 4px 0px 0px ${theme.colors['gray'][8]}`,
        }
    },
}))

interface UnstyledButtonProps extends DefaultProps {
    color: keyof ReturnType<typeof useMantineTheme>['colors'];
    children: React.ReactNode;
}

const ShadowButton: React.FC<UnstyledButtonProps> = ({ color, children, ...others }) => {
    const { classes } = useStyles({ color });
    return (
        <UnstyledButton 
        className={classes['.shadow-button']} 
        {...others}>
            {children}
        </UnstyledButton>
    );
};

export default ShadowButton;


