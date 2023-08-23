import { ReactElement } from 'react'
import DashboardLayout from '../../../layouts/DashboardLayout'

const Activity = () => {
  return (
    <div>Activity here</div>
  )
}

Activity.getLayout = function getLayout(page: ReactElement) {
  return (
    <DashboardLayout>{page}</DashboardLayout>
  )
}
export default Activity
