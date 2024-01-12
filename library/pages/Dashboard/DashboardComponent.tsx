import useStyles from "./Dashboard.styles"
import { PendingArtists } from "./PendingArtists"
import { Submissions } from "./Submissions"

export const DashboardComponent = () => {
    const { classes } = useStyles()
    return (
        <div className={classes.container}>
            <Submissions/>
            <PendingArtists/>
        </div >
  )
}
