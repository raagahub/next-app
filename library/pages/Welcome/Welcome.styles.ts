import { createStyles, keyframes } from '@mantine/core';

const spinner = keyframes`
100% { transform: rotate(360deg) }
`

export default createStyles((theme) => ({
  container: {
    padding: '32px 48px',
    [theme.fn.smallerThan('md')]: {
      padding: '32px 16px',
    },
  },

  box: {
    height: 'fit-content',
    padding: '32px 48px',
    backgroundPosition: 'top 10px right 50px',
    backgroundSize: '100px',
    backgroundRepeat: 'no-repeat',
    backgroundBlendMode: 'overlay',
    [theme.fn.smallerThan('md')]: {
      padding: '48px 16px',
      marginTop: '16px',
      marginBottom: '16px',
      backgroundPosition: 'top 0px right 0px',
    },
  },

  card: {
    height: "100%",
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    backgroundPosition: 'bottom -10px right -10px',
    backgroundSize: '100px',
    backgroundRepeat: 'no-repeat',
    backgroundBlendMode: 'overlay',
    borderRadius: '8px',
    borderColor: 'rgba(0, 0, 0, 0.9)',
    borderWidth: '2px',
    borderStyle: 'solid',
    boxShadow: '8px 8px 0px -2px rgba(0, 0, 0, 1)',
    padding: '36px',
    '&:hover': {
      backgroundSize: '120px',
    },
    [theme.fn.smallerThan('md')]: {
      padding: '24px',
      backgroundSize: '80px',
      backgroundPosition: 'bottom -10px right -16px',
    },
  },

  '.highlight-box': {
    color: 'white',
    backgroundColor: theme.colors['raga-red'][6],
    padding: '8px',
    marginLeft: '-8px',
    marginTop: '4px',
    marginBottom: '4px',
    width: 'fit-content',
    borderRadius: '8px',
    borderColor: theme.colors['gray'][8],
    borderWidth: '2px',
    borderStyle: 'solid',
    boxShadow: `4px 4px 0px 0px ${theme.colors['gray'][8]}`,
  },

  '.highlight-text': {
    color: 'inherit',
    width: 'fit-content',
    textDecoration: 'underline',
    '&:hover': {
      color: theme.black,
      textShadow: `2px 2px 0 rgba(255, 255, 255, 0.7)`,
    }
  },

  '.highlight-button': {
    color: theme.colors['raga-red'][6],
    fontSize: '20px',
    fontWeight: 500,
    backgroundColor: 'white',
    padding: '8px 16px',
    marginLeft: '-8px',
    width: 'fit-content',
    borderRadius: '100px',
    borderColor: theme.colors['raga-red'][6],
    borderWidth: '2px',
    borderStyle: 'solid',
    boxShadow: `4px 4px 0px 0px ${theme.colors['raga-red'][6]}`,
    '&:hover': {
      color: theme.colors['gray'][8],
      borderColor: theme.colors['gray'][8],
      boxShadow: `4px 4px 0px 0px ${theme.colors['gray'][8]}`,
    }
  },

  title: {
    color: theme.colors['gray'][8],
    fontSize: 60,
    fontWeight: 700,
    lineHeight: 1.1,

    [theme.fn.smallerThan('md')]: {
      fontSize: 45,
    },
  },

  subtitle: {
    color: theme.colors.gray[8],
    fontSize: 44,
    fontWeight: 700,

    [theme.fn.smallerThan('md')]: {
      fontSize: 50,
    },
  },

  link: {
    color: 'inherit',
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.6)',
    }
  },

  vinyl: {
    borderRadius: '100px',
    animation: `${spinner} 10s linear infinite`,
    border: '5px solid',
    borderColor: 'rgba(255, 255, 255, 0.7)',
    outline: '25px solid black',
    
    [theme.fn.smallerThan('md')]: {
      marginTop: 16,
      marginBottom: 16
    },
  }

}));
