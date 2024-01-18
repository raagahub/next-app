import { AspectRatio, BackgroundImage, Badge, Box, Card, Center, Divider, Grid, Group, Image, Stack, Text } from "@mantine/core";
import { Submission } from "../../../helpers/SubmissionHelpers";
import { IconPlayerPlay } from "@tabler/icons-react";
import { VideoPlayer } from "../VideoPlayer/VideoPlayer";
import { YoutubePreview } from "../YoutubePreview/YoutubePreview";

interface SubmissionPreviewProps {
    submission: Submission | null;
}

export const SubmissionPreview = ({ submission }: SubmissionPreviewProps) => {
    if (submission) {
        const mainArtist = submission.submission_artists.find(artist => artist.role === 'main')

        const submissionArtists = submission.submission_artists
            .filter(artist => artist.role == 'accompanying')
            .map((artist) => (
                <Text key={`${submission.id}_${artist.artist_id}`} size="sm" truncate>{artist.artists.name} • <Text size={'xs'} color="dimmed" span> {artist.instrument.toUpperCase()} </Text></Text>
            ))

        const submissionMoods = submission.moods.map((mood) => (
            <Badge>{mood}</Badge>
        ))
        return (
            <div>
                <Text fw={700} mb={8}>Submission Preview</Text>
                <Card shadow="sm" padding="sm" radius="md" my={8} withBorder>
                    <Grid>
                        <Grid.Col span={4}>
                            <Box style={{
                                aspectRatio: '1/1', borderRadius: '8px',
                                backgroundImage: `url(${submission.image})`, backgroundPosition: 'left', backgroundSize: '200%'
                            }} >
                                <Center h={'100%'}>
                                    <IconPlayerPlay size={40} color="white" />
                                </Center>
                            </Box>
                        </Grid.Col>
                        <Grid.Col span={8}>
                            <Group position={'apart'}>
                                <Group spacing="xs" noWrap>
                                    <Text size="xs" color={'raga-red'}>{submission.ragas.format_name.toUpperCase()}</Text>
                                    <Text size="xs"> • </Text>
                                    <Text size="xs" color={'raga-red'}>{submission.talas.name.toUpperCase()}</Text>
                                </Group>
                                <Badge radius={'sm'} variant={'filled'} size='sm' color={'raga-red.4'}>{submission.format}</Badge>
                            </Group>
                            <Text weight={700}>{submission.composition_title}</Text>
                            <Text weight={500} size={'sm'}>{mainArtist?.artists.name}</Text>
                            <Text size={'xs'} color="dimmed">{submission.composers.name}</Text>
                        </Grid.Col>
                    </Grid>
                </Card>
                <Grid mt={8}>
                    <Grid.Col span={3}>
                        <Text fw={500} size={'sm'} mb={8}>Accompanying:</Text>
                    </Grid.Col>
                    <Grid.Col span={9} pl={16}>
                        {submissionArtists}
                    </Grid.Col>
                </Grid>
                <Grid>
                    <Grid.Col span={3}>
                        <Text fw={500} size={'sm'} mb={8}>Moods:</Text>
                    </Grid.Col>
                    <Grid.Col span={9}>
                        <Group spacing={'xs'}>
                            {submissionMoods}
                        </Group>
                    </Grid.Col>
                </Grid>
                <Divider mt={16}/>
                <Text fw={700} mt={16} mb={8}>Youtube Video Info</Text>
                <VideoPlayer url={submission.youtube_url} controls={true} />
                <YoutubePreview videoId={submission.youtube_video_id} />

            </div>
        )
    } else {
        return (
            <Center>
                <Text>No Preview</Text>
            </Center>
        )
    }
}
