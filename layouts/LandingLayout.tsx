import { PropsWithChildren } from 'react'
import { withRouter, NextRouter } from 'next/router'
import { Footer } from '../library/components/page_components/Footer/Footer'
import { NavBar } from '../library/components/page_components/NavBar/NavBar'

// interface WithRouterProps {
//     router: NextRouter
// }

// interface MainProps extends WithRouterProps { }

import { createStyles, keyframes } from '@mantine/core';
import Image from 'next/image';

const spinner = keyframes`
100% { transform: rotate(360deg) }
`

const useStyles =  createStyles((theme) => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100dvh',
        // backgroundImage: `url('/backgrounds/gradient-mesh-background-1.png')`,
        // backgroundPosition: 'left',
        // backgroundSize: 'cover',
        // backgroundRepeat: 'no-repeat',
        // backgroundAttachment: 'scroll',
        // backgroundColor: theme.colors['gray'][4],
        // backgroundBlendMode: 'overlay',
        position: 'relative'
      },

    content: {
        paddingBottom: '40px',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
    }
}))

const LandingLayout = (props: PropsWithChildren) => {
    const { classes } = useStyles();
    return (
        <div className={classes.container}>
            <Image 
            fill
            alt='background-gradient'
            src={'/backgrounds/gradient-mesh-background-1.png'}
            quality={100}
            style={{objectFit: 'cover', zIndex: -1, opacity: 0.5}}
            />
            <NavBar />
            <div className={classes.content}>{props.children}</div>
            <Footer/>
        </div>
    )
}

// export default withRouter(MainLayout)
export default LandingLayout
