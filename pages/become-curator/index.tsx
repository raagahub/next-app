import React, { ReactElement } from 'react'
import { BecomeCuratorForm } from '../../library/pages/BecomeCurator/BecomeCuratorForm'
import LandingLayout from '../../layouts/LandingLayout'

const BecomeContributor = () => {
  return (
    <BecomeCuratorForm />
  )
}

BecomeContributor.getLayout = function getLayout(page: ReactElement) {
  return (
    <LandingLayout>{page}</LandingLayout>
  )
}

export default BecomeContributor