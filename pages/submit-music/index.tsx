import { ReactElement } from 'react'
import DashboardLayout from '../../layouts/DashboardLayout'
import { SubmitMusicComponent } from '../../library/pages/SubmitMusic/SubmitMusicComponent'

const SubmitMusic = () => {
  return (
    <>
    <SubmitMusicComponent />
    </>
  )
}

SubmitMusic.getLayout = function getLayout(page: ReactElement) {
  return (
    <DashboardLayout>{page}</DashboardLayout>
  )
}
export default SubmitMusic
