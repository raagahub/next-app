import { useContext } from "react"
import { SubmitMusicContext } from "./SubmitMusicComponent"
import { AspectRatio, Badge, Box, Card, Group, Image, Text } from "@mantine/core"
import useStyles from "./SubmitMusic.styles"

export const SubmitMusicPreview = () => {
    const form = useContext(SubmitMusicContext)
    const { classes } = useStyles()

    return (
        <div className={classes.previewContainer}>
            <Card>
                <Card.Section>
                    <AspectRatio ratio={21 / 9}>
                        <Image src={form.values.image} />
                    </AspectRatio>
                </Card.Section>
                <Box mt={16}>
                    <Badge color="orange" variant="light">
                        {form.values.format}
                    </Badge>
                    <Text weight={500}>{form.values.title}</Text>
                </Box>
            </Card>
        </div>
    )
}
