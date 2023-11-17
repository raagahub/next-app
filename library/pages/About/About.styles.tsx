import { createStyles, keyframes, rem } from '@mantine/core';


export default createStyles((theme) => ({
  container: {},

  box: {
    height: 'fit-content',
    width: '100%',
    margin: '0px',
    marginTop: '16px',
    marginBottom: '16px',
    [theme.fn.smallerThan('md')]: {
      padding: '32px 16px',
      margin: '0px',
      backgroundPosition: 'bottom 0px right 0px',
    },
    img: {
      margin: '0 auto'
      
    }
  },

  shapebox: {
    height: '100px',
    width: '100px',
    backgroundPosition: 'center',
    backgroundSize: '200px',
    backgroundRepeat: 'repeat',
    maskSize: '100px',
    maskRepeat: 'no-repeat',
    maskPosition: 'bottom 0px right 0px',
    position: 'absolute',
    right: '60px',
    [theme.fn.smallerThan('md')]: {
      bottom: '60px',
      right: '0px',
    },

  },

  banner: {
    height: rem(150),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    backgroundPosition: 'center',
    backgroundSize: '450px',
    backgroundRepeat: 'repeat',
    backgroundBlendMode: 'color-burn',
    borderRadius: '0px',
    borderColor: 'rgba(0, 0, 0, 0.9)',
    boxShadow: '0px 0px 0px 0px rgba(0, 0, 0, 1)',
    overflow: 'clip',
    [theme.fn.smallerThan('md')]: {
      height: rem(100),
    },
},

  '.highlight-box': {
    color: 'white',
    backgroundColor: theme.colors['raga-red'][6],
    padding: '8px',
    marginLeft: '-8px',
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
    color: theme.colors['gray'][8],
    fontSize: '20px',
    fontWeight: 500,
    backgroundColor: 'white',
    padding: '8px 16px',
    marginLeft: '-8px',
    width: 'fit-content',
    borderRadius: '100px',
    borderColor: theme.colors['gray'][8],
    borderWidth: '2px',
    borderStyle: 'solid',
    boxShadow: `4px 4px 0px 0px ${theme.colors['gray'][8]}`,
    '&:hover': {
      color: theme.colors['gray'][8],
      borderColor: theme.colors['gray'][8],
      boxShadow: `4px 4px 0px 0px ${theme.colors['gray'][8]}`,
    }
  },

  title: {
    color: theme.colors.dark[8],
    fontSize: 56,
    fontWeight: 700,
    lineHeight: 1.1,
    width: '100%',
    // textShadow: '3px 3px 0px rgba(0, 0, 0, 1)',

    [theme.fn.smallerThan('md')]: {
      fontSize: 30,
      textAlign: 'center'
    },
  },

  textcontainer: {
    [theme.fn.smallerThan('md')]: {
      textAlign: 'center'
    },
    button: {
      [theme.fn.smallerThan('md')]: {
        margin: '0 auto'
      },

    }

  },

  bodytext: {
    textAlign: 'left',
    [theme.fn.smallerThan('md')]: {
      textAlign: 'center'
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
}));
