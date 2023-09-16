import Link from "next/link";
import { ActionIcon, AspectRatio, Avatar, Button, Card, Grid, Group, Image, Loader, LoadingOverlay, Modal, Stack, Text, createStyles, useMantineTheme } from "@mantine/core";
import { IconCaretDown, IconCaretUp, IconShare, IconTrashX, IconPlaylistAdd, IconPlayerPlay } from "@tabler/icons-react";
import { useState } from "react";
import { initSupabase } from "../../../../helpers/SupabaseHelpers";
import { databaseErrorNotification } from "../../../../helpers/NotificationHelpers";
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useDisclosure } from "@mantine/hooks";
import { useUnfurlUrl } from "../../../../helpers/UrlHelpers";

dayjs.extend(relativeTime);

const useStyles = createStyles((theme) => ({
    title: {
        fontWeight: 500,
    },

    body: {
        paddingLeft: '16px',
        paddingRight: '16px',
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
            .from('raga_comments')
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

    if (status === "error") {
        return <Link href={video.video_url} />;
    }

    if (status === "success") {
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
                    <Group noWrap spacing={0}>
                        <div className={classes.body}>
                            <Group spacing="xs" noWrap my={8}>
                                <Avatar size={16} src={video.profiles.avatar_url} />
                                <Text size="xs">{video.profiles.username}</Text>
                                <Text size="xs"> • </Text>
                                <Text size="xs" color="dimmed">{dayjs(video.created_at).fromNow()}</Text>
                            </Group>
                            <Text className={classes.title} mb="xs">
                                {data?.title}
                            </Text>
                            <Text color="dimmed" size="xs" mb="xs" lineClamp={3}>
                                {data?.description}
                            </Text>
                            <Group noWrap spacing="xs">
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
    }
    return (
        <div>Loading Preview</div>
    )
}
