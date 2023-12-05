import { ReactElement } from 'react'
import { ProfileForm } from '../../../library/pages/Dashboard/ProfileForm'
import DashboardLayout from '../../../layouts/DashboardLayout'

const Profile = () => {
  return (
    <ProfileForm/>
  )
}

Profile.getLayout = function getLayout(page: ReactElement) {
  return (
    <DashboardLayout>{page}</DashboardLayout>
  )
}
export default Profile
