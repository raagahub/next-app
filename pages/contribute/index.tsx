import React, { ReactElement } from 'react'
import { ContributeComponent } from '../../library/pages/Contribute/Contribute'
import LandingLayout from '../../layouts/LandingLayout'

const Contribute = () => {
    return (
        <ContributeComponent />
    )
}

Contribute.getLayout = function getLayout(page: ReactElement) {
    return (
        <LandingLayout>{page}</LandingLayout>
    )
}

export default Contribute