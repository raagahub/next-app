import { ReactElement } from 'react';
import LandingLayout from '../layouts/LandingLayout';
import { Welcome } from '../library/pages/Welcome/Welcome';

const HomePage = () => {
  return (
    <Welcome />
  )
}

HomePage.getLayout = function getLayout(page: ReactElement) {
  return (
    <LandingLayout>{page}</LandingLayout>
  )
}

export default HomePage