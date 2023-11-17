import React, { ReactElement } from 'react'
import { AboutComponent } from '../../library/pages/About/About'
import LandingLayout from '../../layouts/LandingLayout'

const About = () => {
  return (
    <AboutComponent />
  )
}

About.getLayout = function getLayout(page: ReactElement) {
  return (
    <LandingLayout>{page}</LandingLayout>
  )
}

export default About