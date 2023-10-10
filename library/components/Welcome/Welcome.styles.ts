import { createStyles } from '@mantine/core';

export default createStyles((theme) => ({
  container: {
    backgroundImage: `url('/mandala.png')`,
    backgroundPosition: 'center',
    backgroundSize: 'auto',
    backgroundRepeat: 'no-repeat'
  },

  box: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)'
  },

  title: {
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    fontSize: 100,
    fontWeight: 700,

    [theme.fn.smallerThan('md')]: {
      fontSize: 50,
    },
  },
}));
