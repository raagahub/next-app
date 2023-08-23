import { ReactElement } from 'react'
import { ProfileForm } from '../../../components/Dashboard/ProfileForm'
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
