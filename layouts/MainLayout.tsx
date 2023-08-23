import { PropsWithChildren } from 'react'
import { withRouter, NextRouter } from 'next/router'

// interface WithRouterProps {
//     router: NextRouter
// }

// interface MainProps extends WithRouterProps { }

const MainLayout = (props: PropsWithChildren) => {

    return (
        <>
            {props.children}
        </>
    )
}

// export default withRouter(MainLayout)
export default MainLayout
