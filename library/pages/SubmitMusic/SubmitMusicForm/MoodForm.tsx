import { useContext } from "react"
import { SubmitMusicContext } from "../SubmitMusicComponent"
import { Badge, Grid, Group, MultiSelect, Paper } from "@mantine/core"
import { moods } from "../../../helpers/MoodHelper"

export const MoodForm = () => {
    const form = useContext(SubmitMusicContext)
    return (
        <Paper withBorder p={16} mt={16}>
            <Grid>
                <Grid.Col span={2}>
                    <Badge color="teal" style={{ position: 'relative', right: '0px' }}>Moods</Badge>
                </Grid.Col>
                <Grid.Col span={10}>
                    <Group position='left'>
                        <MultiSelect
                            data={moods}
                            label='Select up to 3 moods that represent this piece'
                            searchable
                            maxSelectedValues={3}
                            {...form.getInputProps(`moods`)}
                        />
                    </Group>
                </Grid.Col>
            </Grid>
        </Paper>
    )
}
