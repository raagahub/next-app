import { ActionIcon, AspectRatio, Button, Group, Progress, Stack, Switch, Text, Title, Tooltip } from "@mantine/core"
import { useDisclosure, useInterval, useToggle } from "@mantine/hooks";
import { IconMovie, IconMovieOff, IconPlayerPause, IconPlayerPlay, IconPlayerTrackNext, IconPlayerTrackPrev } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import YouTube, { YouTubeProps, YouTubePlayer } from 'react-youtube';
import { YoutubeVideo } from "./VideoItem";
import { useUnfurlUrl } from "../../../../../helpers/UrlHelpers";

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

const initialOpts: YouTubeProps['opts'] = {
    height: '0',
    width: '0',
    playerVars: {
        autoplay: 0,
    },
};

interface YTPlayerProps {
    video: YoutubeVideo;
    playNext: Function;
}

export const YTPlayer = ({ video, playNext }: YTPlayerProps) => {
    const [opts, setOpts] = useState<YouTubeProps['opts']>(initialOpts)
    const [player, setPlayer] = useState<YouTubePlayer>(null)
    const [isPlaying, setPlaying] = useState(false)
    const [showVideo, setShowVideo] = useToggle([false, true])
    const { data, status } = useUnfurlUrl(video.video_url);

    const [autoplay, setAutoplay] = useState(true)
    const [totalTime, setTotalTime] = useState(0)
    const [currentTime, setCurrentTime] = useState(0)

    const getCurrentTime = () => {
        return player?.target.getCurrentTime() || 0;
    }

    const getDuration = () => {
        return player?.target.getDuration() || 0;
    }

    const updateTime = () => {
        if (totalTime != getDuration()){
            setTotalTime(getDuration())
        }
        setCurrentTime(getCurrentTime())
    }

    const [intervalRunning, setIntervalRunning] = useState(false);
    const interval = useInterval(() => {
        if (player && isPlaying) {
            setCurrentTime(player.target.getCurrentTime());
        }
    }, 100);

    const handleStateChange: YouTubeProps['onStateChange'] = (event) => {
        const playerState = event.target.getPlayerState()
        // Returns the state of the player. Possible values are:
        // -1 – unstarted
        // 0 – ended
        // 1 – playing
        // 2 – paused
        // 3 – buffering
        // 5 – video cued

        switch (playerState) {
            case 1: // playing
            setPlaying(true);
                if (!intervalRunning) {
                    interval.start();
                    setIntervalRunning(true);
                }
                // Fetch duration when video starts playing
                if (totalTime === 0) {
                    setTotalTime(getDuration());
                }
                break;
            case 2: // paused
            case 0: // ended
                setPlaying(false);
                if (intervalRunning) {
                    interval.stop();
                    setIntervalRunning(false);
                }
                break;
            default:
                break;
        }
    }

    const handleReady: YouTubeProps['onReady'] = (event) => {
        setPlayer(event)
        updateTime()
        if (autoplay) {
            event.target.playVideo()
        }

        // Check for video duration after a short delay (e.g., 500ms)
        setTimeout(() => {
            if (totalTime === 0) {
                setTotalTime(getDuration());
            }
        }, 500);
    }

    const togglePlay = () => {
        if (isPlaying) {
            player.target.pauseVideo()
            setPlaying(false)
        } else {
            player.target.playVideo()
            setPlaying(true)
        }
    }

    const setShowVideoOpts = () => {
        if (showVideo) {
            setOpts((prevOpts: YouTubeProps['opts']) => ({ ...prevOpts, height: 360, width: 640 }))
        } else {
            setOpts(initialOpts)
        }
    }

    useEffect(() => {
        setCurrentTime(0);
        setTotalTime(0);
    }, [video]);

    useEffect(() => {
        setShowVideoOpts()
    }, [showVideo]);

    useEffect(() => {
        updateTime()
    }, [player]);

    useEffect(() => {
        interval.start();
        return interval.stop;
    }, []);



    return (
        <>
            <YouTube videoId={video.youtube_video_id} opts={opts} onStateChange={(e) => handleStateChange(e)} onReady={(e) => handleReady(e)}/>
            {
                !showVideo &&
                <Stack>
                    <Title order={3}>{data?.title}</Title>
                    <Group spacing="xs" noWrap my={8}>
                        {video.raga_video_artists.map((artist) => (
                            <Text size="xs">{artist.role} {artist.artist_id.name}</Text>
                        ))}
                    </Group>
                </Stack>
            }
            <Text size={"xs"} color="raga-red.6">{currentTime} / {totalTime}</Text>
            <Progress color="raga-red.6" value={(currentTime / totalTime)*100} animate />
            <Group position="apart">
                <Tooltip label={showVideo ? "Hide Video" : "Show Video"}>
                    <ActionIcon p={4} radius="md" size="md" color={"raga-red.6"} variant="outline" onClick={() => setShowVideo()}>
                        {showVideo ? <IconMovie /> : <IconMovieOff />}
                    </ActionIcon>
                </Tooltip>

                <Group>
                    <Tooltip label="Previous">
                        <ActionIcon p={4} radius="md" size="md" color={"raga-red.6"} onClick={() => playNext()}><IconPlayerTrackPrev /></ActionIcon>
                    </Tooltip>
                    <ActionIcon p={8} radius="md" size="lg" color={"raga-red.6"} variant="filled" onClick={() => togglePlay()}>
                        {isPlaying ? <IconPlayerPause /> : <IconPlayerPlay />}
                    </ActionIcon>
                    <Tooltip label="Next">
                        <ActionIcon p={4} radius="md" size="md" color={"raga-red.6"} onClick={() => playNext()}><IconPlayerTrackNext /></ActionIcon>
                    </Tooltip>

                </Group>
                <Switch checked={autoplay} onChange={(event) => setAutoplay(event.currentTarget.checked)} label="Autoplay" />
            </Group>
        </>
    )
}