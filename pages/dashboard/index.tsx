import { ReactElement } from 'react'
import DashboardLayout from '../../layouts/DashboardLayout'
import { DashboardComponent } from '../../library/pages/Dashboard/DashboardComponent'

const Dashboard = () => {
  return (
    <>
    <DashboardComponent />
    </>
  )
}

Dashboard.getLayout = function getLayout(page: ReactElement) {
  return (
    <DashboardLayout>{page}</DashboardLayout>
  )
}
export default Dashboard
