import { createStyles, keyframes } from '@mantine/core';

const spinner = keyframes`
100% { transform: rotate(360deg) }
`

export default createStyles((theme) => ({
    body: {
        backgroundImage: `url('/backgrounds/gradient-mesh-background-1.png')`,
        backgroundPosition: 'left',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'scroll',
        backgroundColor: theme.colors['gray'][4],
        backgroundBlendMode: 'overlay',
        height: '100vh',
      },
}))