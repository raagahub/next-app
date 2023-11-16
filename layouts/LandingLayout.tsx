import { PropsWithChildren } from 'react'
import { withRouter, NextRouter } from 'next/router'
import { Footer } from '../library/components/Footer/Footer'
import { NavBar } from '../library/components/NavBar/NavBar'

// interface WithRouterProps {
//     router: NextRouter
// }

// interface MainProps extends WithRouterProps { }

import { createStyles, keyframes } from '@mantine/core';

const spinner = keyframes`
100% { transform: rotate(360deg) }
`

const useStyles =  createStyles((theme) => ({
    container: {
        backgroundImage: `url('/backgrounds/gradient-mesh-background-1.png')`,
        backgroundPosition: 'left',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'scroll',
        backgroundColor: theme.colors['gray'][4],
        backgroundBlendMode: 'overlay',
        minHeight: '100vh',
        position: 'relative'
      },

    content: {
        paddingBottom: '40px'
    }
}))

const LandingLayout = (props: PropsWithChildren) => {
    const { classes } = useStyles();
    return (
        <div className={classes.container}>
            <NavBar />
            <div className={classes.content}>{props.children}</div>
            <Footer/>
        </div>
    )
}

// export default withRouter(MainLayout)
export default LandingLayout
