import { ReactElement } from 'react'
import DashboardLayout from '../../../layouts/DashboardLayout'

const Bookmarks = () => {
  return (
    <div>Bookmarks here</div>
  )
}

Bookmarks.getLayout = function getLayout(page: ReactElement) {
  return (
    <DashboardLayout>{page}</DashboardLayout>
  )
}
export default Bookmarks
