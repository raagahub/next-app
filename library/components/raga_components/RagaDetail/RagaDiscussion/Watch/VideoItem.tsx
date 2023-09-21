import Link from "next/link";
import { ActionIcon, Alert, AspectRatio, Avatar, Button, Card, Collapse, Divider, Grid, Group, Image, Loader, LoadingOverlay, Mark, Modal, Stack, Text, Tooltip, createStyles, useMantineTheme } from "@mantine/core";
import { IconCaretDown, IconCaretUp, IconShare, IconTrashX, IconPlaylistAdd, IconPlayerPlay, IconUsersGroup } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { initSupabase } from "../../../../../helpers/SupabaseHelpers";
import { databaseErrorNotification } from "../../../../../helpers/NotificationHelpers";
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useDisclosure } from "@mantine/hooks";
import { useUnfurlUrl } from "../../../../../helpers/UrlHelpers";
import { Artist } from "../../../../../helpers/ArtistHelpers";

dayjs.extend(relativeTime);

const useStyles = createStyles((theme) => ({
    title: {
        fontWeight: 500,
    },

    body: {
        paddingLeft: '16px',
        paddingRight: '16px',
        width: '100%'
    },
}));

export type YoutubeVideo = {
    video_id: string;
    created_at: string;
    video_url: string;
    youtube_video_id: string;
    raga_id: number;
    user_id: string;
    profiles: {
        full_name: string;
        username: string;
        avatar_url: string;
    };
    raga_video_artists: [
        {
            role: string;
            instrument: string;
            artist_id: {
                id: number;
                name: string;
            }
        }
    ];
    pending_artists: [
        {
            id: number;
            role: string;
            main_instrument: string;
            name: string;
        }
    ]
}

export type ArtistWithPending = Artist & {
    pending: boolean;
}

interface VideoProps {
    video: YoutubeVideo;
    setNowPlaying: Function;
    isPlaying?: boolean;
}

export const VideoItem = ({ video, setNowPlaying, isPlaying = false }: VideoProps) => {
    const { classes } = useStyles();
    const { data, status } = useUnfurlUrl(video.video_url);
    const { supabase, user } = initSupabase()
    const theme = useMantineTheme();

    const [opened, { open, close }] = useDisclosure(false);
    const [loading, setLoading] = useState(false)
    const [deleted, setDeleted] = useState(false)
    async function deleteVideo() {
        setLoading(true)
        const { status, error } = await supabase
            .from('raga_videos')
            .delete()
            .eq('video_id', video.video_id)
        
        if (status == 204) {
            setLoading(false)
            setDeleted(true)
            close()
        }

        if (error) {
            databaseErrorNotification(error)
            setLoading(false)
            close()
        }
    }

    const [voteCount, updateVoteCount] = useState(0)
    async function submitVote(value: number) {
        const { status, error } = await supabase
            .from('raga_video_votes')
            .upsert([
                {
                    user_id: user?.id,
                    video_id: video.video_id,
                    value: value
                },
            ])

        if (status == 201) {
            updateVoteCount(voteCount + value)
        }

        if (error) {
            databaseErrorNotification(error)
        }

    }

    const [mainArtist, setMainArtist] = useState<ArtistWithPending | null>(null)
    const [accompanyingArtists, setAccompanying] = useState<ArtistWithPending[]>([])
    const [moreInfoOpen, { toggle: toggleInfo }] = useDisclosure(false);

    function parseArtists() {
        let accompanyingArtists: ArtistWithPending[] = []

        video.raga_video_artists.forEach((artist) => {
            const artistFormat: ArtistWithPending = {
                id: artist.artist_id.id,
                name: artist.artist_id.name,
                main_instrument: artist.instrument,
                pending: false
            }

            if (artist.role == 'main') {
                setMainArtist(artistFormat)
            } else if (artist.role == 'accompanying') {
                accompanyingArtists.push(artistFormat)
            }
        })

        video.pending_artists.forEach((artist) => {
            const artistFormat: ArtistWithPending = {
                id: artist.id,
                name: artist.name,
                main_instrument: artist.main_instrument,
                pending: true
            }

            if (artist.role == 'main') {
                setMainArtist(artistFormat)
            } else if (artist.role == 'accompanying') {
                accompanyingArtists.push(artistFormat)
            }
        })

        setAccompanying(accompanyingArtists)
    }

    useEffect(() => {
        parseArtists()
      }, [video]);

    if (status === "error") {
        return <Link href={video.video_url} />;
    }

    if (status === "success" && !deleted) {
        return (
            <>
            <Modal
                opened={opened}
                onClose={close}
                withCloseButton={false}
                radius={'md'}
                overlayProps={{
                color: theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2],
                opacity: 0.55,
                blur: 3,
                }}
            >
                <Stack px={8} mt={8} spacing={0}>
                    <Text fw={700}>Are you sure you want to remove video?</Text>
                    <Text c={'gray'} fz={'sm'}>This action cannot be undone.</Text>
                    <Group position='right' mt={24}>
                        <Button variant='filled' color={"raga-red.6"} loading={loading} onClick={() => deleteVideo()}>Remove Video</Button>
                        <Button variant='default' onClick={close}>Cancel</Button>
                    </Group>
                </Stack>
            </Modal>
            <Grid mt={16}>
                <Grid.Col span={2}>
                <AspectRatio ratio={16 / 9} maw={400} mx="auto">
                    {data?.imageSrc && <Image src={data?.imageSrc} height={'100%'} radius={'md'} />}
                    <LoadingOverlay visible={isPlaying} overlayBlur={2} loaderProps={{color:"orange", variant:"bars"}} />
                </AspectRatio>
                </Grid.Col>
                <Grid.Col span={8}>
                    <Group noWrap spacing={0} w={'100%'}>
                        <div className={classes.body}>
                            <Group spacing="xs" noWrap my={8}>
                                <Avatar size={16} src={video.profiles.avatar_url} />
                                <Text size="xs">{video.profiles.username}</Text>
                                <Text size="xs"> • </Text>
                                <Text size="xs" color="dimmed">{dayjs(video.created_at).fromNow()}</Text>
                            </Group>
                            <Text className={classes.title} mb="xs">
                                {data?.title.slice(0, -(" - YouTube".length))}
                            </Text>
                            <Text color="dimmed" size="xs" mb="xs" lineClamp={3}>
                                {data?.description}
                            </Text>
                            <Divider 
                            my="xs" 
                            labelPosition="left"
                            label={
                                <Button p={0} variant="subtle" size={"xs"} onClick={toggleInfo}>
                                    Artistes
                                </Button>
                            } 
                             />
                            <Collapse in={moreInfoOpen} mb={16}>
                                <Grid>
                                    <Grid.Col span={6}>
                                        <Text color="dimmed" size={"xs"} fw={300}>Main Artiste</Text>
                                    </Grid.Col>
                                    <Grid.Col span={6}>
                                        <Group position="right" spacing={20}>
                                            <Text size={"xs"}>{mainArtist?.name}</Text>
                                            <Text size={"xs"}>{mainArtist?.main_instrument.toUpperCase()}</Text>
                                        </Group>
                                    </Grid.Col>
                                </Grid>
                                <Grid>
                                    <Grid.Col span={6}>
                                        <Text color="dimmed" size={"xs"} fw={300}>Accompanying Artistes</Text>
                                    </Grid.Col>
                                    <Grid.Col span={6}>
                                        {accompanyingArtists.map((artist) => (
                                        <Group position="apart">
                                            <Text size="xs">
                                                {!artist.pending ? artist.name : (
                                                    <Tooltip inline label="Pending Approval"
                                                    color="yellow"
                                                    position="top-end"
                                                    withArrow>
                                                        <Mark>{artist.name}</Mark>
                                                    </Tooltip>
                                                )}
                                            </Text>
                                            <Text size={"xs"}>{artist.main_instrument.toUpperCase()}</Text>
                                        </Group>

                                        ))}
                                    </Grid.Col>
                                </Grid>
                            </Collapse>
                            
                            <Group noWrap spacing="xs" mt={16}>
                                <Group spacing="xs" noWrap>
                                    <Button leftIcon={<IconPlayerPlay />} variant="light" color="gray" radius="lg" size="xs" compact onClick={()=> setNowPlaying(video)}>Play Now</Button>
                                    <Button leftIcon={<IconPlaylistAdd />} variant="light" color="gray" radius="lg" size="xs" compact>Play Next</Button>
                                    {user?.id == video.user_id &&
                                        <Button leftIcon={<IconTrashX />} variant="light" color="red" radius="lg" size="xs" compact onClick={open}>Remove</Button>
                                    }
                                </Group>
                            </Group>
                        </div>
                    </Group>
                </Grid.Col>
                <Grid.Col span={2}>
                    <Stack spacing={0} align="center">
                        <ActionIcon size="lg" onClick={() => submitVote(1)}>
                            <IconCaretUp size="1.625rem" />
                        </ActionIcon>
                        <Text size={'sm'} color='dimmed'>{voteCount}</Text>
                        <ActionIcon size="lg" onClick={() => submitVote(-1)}>
                            <IconCaretDown size="1.625rem" />
                        </ActionIcon>
                    </Stack>
                </Grid.Col>
            </Grid>
            </>

        )
    } else if (deleted) {
        return (
            <Alert icon={<IconTrashX size="1rem" />} color="red" radius={'md'}>Video Deleted</Alert>
        )
    } else {
        return (
            <div>Loading Preview</div>
        )
    }
}
