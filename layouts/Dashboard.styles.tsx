import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    container: {
        display: 'flex',
        flexDirection: 'row',
        minHeight: '100dvh',
        backgroundImage: `url('/backgrounds/gradient-mesh-background-1.png')`,
        backgroundPosition: 'left',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'scroll',
        backgroundColor: theme.colors['gray'][4],
        backgroundBlendMode: 'overlay',
        position: 'relative'
      },

    content: {
        paddingBottom: '40px',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
    },

    navbar: {
        height: '100vh',
        width: '300px',
        display: 'flex',
        flexDirection: 'column',
        borderRight: `2px solid ${theme.colors.dark[8]}`,
      },
    
      navbarMain: {
        flex: 1,
        padding: theme.spacing.md,
      },
    
      header: {
        padding: theme.spacing.md,
        marginBottom: theme.spacing.md,
        borderBottom: `2px solid ${theme.colors.dark[8]}`,
        backgroundColor: 'white',
      },
    
      footer: {
        padding: theme.spacing.md,
        marginTop: theme.spacing.md,
        borderTop: `2px solid ${theme.colors.dark[8]}`,
      },
    
      link: {
        display: 'flex',
        alignItems: 'center',
        textDecoration: 'none',
        fontSize: theme.fontSizes.sm,
        color: theme.colors.gray[7],
        padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
        borderRadius: theme.radius.sm,
        fontWeight: 500,
        
        '&:hover': {
          backgroundColor: theme.colors.gray[0],
          color: theme.colors.black,
          '& $linkIcon': {
            color: theme.colors.black,
          },
        },
    
        '&[data-active]': {
          backgroundColor: theme.colors["raga-red"],
          color: theme.white,
          '&:hover': {
            backgroundColor: theme.colors["raga-red"],
            color: theme.white,
          },
          '& $linkIcon': {
            color: theme.colors["raga-red"],
          },
        },
      },
    
      linkIcon: {
        color: theme.colors["raga-red"][3],
        marginRight: theme.spacing.sm,
        width: 25,
        height: 25,
      },
    
}))