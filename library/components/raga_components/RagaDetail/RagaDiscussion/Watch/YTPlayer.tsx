import { ActionIcon, AspectRatio, Button, Group, Loader, Progress, Slider, Stack, Switch, Text, ThemeIcon, Title, Tooltip } from "@mantine/core"
import { useDebouncedValue, useDisclosure, useInterval, useToggle } from "@mantine/hooks";
import { IconMovie, IconMovieOff, IconPlayerPause, IconPlayerPlay, IconPlayerTrackNext, IconPlayerTrackPrev, IconSettingsAutomation, IconVolume } from "@tabler/icons-react";
import { useEffect, useRef, useState } from "react";
import YouTube, { YouTubeProps, YouTubePlayer } from 'react-youtube';
import { YoutubeVideo } from "./VideoItem";
import { useUnfurlUrl } from "../../../../../helpers/UrlHelpers";

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import Duration from 'dayjs/plugin/duration'
dayjs.extend(relativeTime);
dayjs.extend(Duration)

const initialOpts: YouTubeProps['opts'] = {
    height: '0',
    width: '0',
    playerVars: {
        autoplay: 0,
        controls: 0,
        disablekb: 0,
        enablejsapi: 1,
        fs: 0,
        playsinline: 1,
        rel: 0,
        start: 0
    },
};

interface YTPlayerProps {
    video: YoutubeVideo;
    playNext: Function;
    playPrev: Function;
}

export const YTPlayer = ({ video, playNext, playPrev }: YTPlayerProps) => {
    const [opts, setOpts] = useState<YouTubeProps['opts']>(initialOpts)
    const [player, setPlayer] = useState<YouTubePlayer>(null)
    const [isPlaying, setPlaying] = useState(false)
    const [showVideo, setShowVideo] = useToggle([false, true])
    const { data, status } = useUnfurlUrl(video.video_url);
    const [isLoading, setLoading] = useState(true)


    const [totalTime, setTotalTime] = useState(0)
    const [currentTime, setCurrentTime] = useState(0)
    const [scrubberVal, setScrubberVal] = useState(0)
    const [scrubberEndValue, setEndValue] = useState(0);
    const [isScrubbing, setScrubbing] = useState(false)

    const [volumeLevel, setVolume] = useState(100)

    const getCurrVolume = () => {
        return player?.target.getVolume() || 0;
    }

    const setVolumeLevel = () => {
        return player?.target.setVolume(volumeLevel)
    }

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
        if (volumeLevel === 0) {
            setVolume(getCurrVolume())
        }
        setCurrentTime(getCurrentTime())
    }

    const seekToTime = (value: number) => {
        const seekingTime = (value/100) * totalTime
        player?.target.seekTo(seekingTime, true)
    }

    const [intervalRunning, setIntervalRunning] = useState(false);
    const interval = useInterval(() => {
        if (player && isPlaying) {
            setCurrentTime(player.target.getCurrentTime());
        }
    }, 200);

    const handleStateChange: YouTubeProps['onStateChange'] = (event) => {
        const playerState = event.target.getPlayerState();
        console.log("State Change Triggered", playerState);

        // Returns the state of the player. Possible values are:
        // -1 – unstarted
        // 0 – ended
        // 1 – playing
        // 2 – paused
        // 3 – buffering
        // 5 – video cued

        switch (playerState) {
            case 1: // playing
                setLoading(false);
                setPlaying(true);
                updateTime(); // Manually call updateTime when video starts playing
                if (!intervalRunning) {
                    interval.start();
                    setIntervalRunning(true);
                }
                if (totalTime === 0) {
                    setTotalTime(getDuration());
                }
                break;
            case 2: // paused
                setLoading(false);
                setPlaying(false);
                if (intervalRunning) {
                    interval.stop();
                    setIntervalRunning(false);
                }
                break;
            case 3: // buffering
                setLoading(true);
            case 0: // ended
                setLoading(false);
                setPlaying(false);
                if (intervalRunning) {
                    interval.stop();
                    setIntervalRunning(false);
                }
                break;
            default:
                break;
        }
    };

    const handleReady: YouTubeProps['onReady'] = (event) => {
        console.log("Ready Event Triggered");
        setPlayer(event);
        setLoading(false);
        
        // Delay the autoplay to ensure that duration is fetched before playing
        setTimeout(() => {
            if (totalTime === 0) {
                setTotalTime(getDuration());
            }
            if (volumeLevel === 0) {
                setVolume(getCurrVolume());
            } 
            if (isPlaying) {
                event.target.loadVideoById({videoId: video.youtube_video_id, startSeconds: 0});
                event.target.playVideo();
                console.log("loadVideoByID and play");
            } else {
                event.target.cueVideoById({videoId: video.youtube_video_id, startSeconds: 0});
                console.log("cueVideoByID");
            }
        }, 500);
    };

    const togglePlay = () => {
        if (isPlaying) {
            player.target.pauseVideo()
            setPlaying(false)
        } else {
            player.target.playVideo()
            setPlaying(true)
        }
    }

    const handlePlayNext = () => {
        interval.stop(); // Stop the current interval
        player.target.destroy()
        setLoading(true);
        playNext();
    };
    
    const handlePlayPrev = () => {
        interval.stop();
        player.target.destroy()
        setLoading(true);
        playPrev(); 
    };

    const setShowVideoOpts = () => {
        if (showVideo) {
            setOpts((prevOpts: YouTubeProps['opts']) => ({ ...prevOpts, height: 360, width: 640 }))
        } else {
            setOpts(initialOpts)
        }
    }

    const videoIdRef = useRef(video.youtube_video_id);
    const intervalRef = useRef(0);

    useEffect(() => {
        if (currentTime > 0 && !isScrubbing) {
            setScrubberVal((currentTime/totalTime)*100)
        }
    }, [currentTime])
    

    useEffect(() => {
        if (scrubberEndValue > 0) {
            seekToTime(scrubberEndValue)
        }
    }, [scrubberEndValue]);

    useEffect(() => {
        videoIdRef.current = video.youtube_video_id;
        setCurrentTime(0);
        setTotalTime(0);
        setScrubberVal(0);
        
        // if (player) {
        //     if (isPlaying) {
        //         player.target.loadVideoById(video.youtube_video_id, 0); // Load and play the video from the beginning
        //         interval.start(); // Restart the interval
        //     } else {
        //         player.target.cueVideoById(video.youtube_video_id, 0); // Just load the video but don't play
        //     }
        // }
    }, [video, player]);

    useEffect(() => {
        setVolumeLevel()
    }, [volumeLevel]);

    useEffect(() => {
        setShowVideoOpts()
    }, [showVideo]);

    useEffect(() => {
        updateTime();
    }, [player, isPlaying]);

    useEffect(() => {
        if (isPlaying) {
            interval.start();
            return interval.stop; 
        }
    }, [isPlaying]);



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
            <Text size={"xs"} color="raga-red.6">{dayjs.duration(currentTime, 'seconds').format('mm:ss')} / {dayjs.duration(totalTime, 'seconds').format('mm:ss')}</Text>
            <Slider 
            size={'xs'}
            thumbSize={16}
            label={dayjs.duration((scrubberVal/100)*totalTime, 'seconds').format('mm:ss')}
            value={scrubberVal} 
            onChange={setScrubberVal} 
            onChangeEnd={setEndValue} 
            onMouseDown={()=>{setScrubbing(true)}} 
            onMouseUp={()=>setScrubbing(false)} />
            <Group position="apart">
                <Group>
                    <Tooltip label={showVideo ? "Hide Video" : "Show Video"}>
                        <ActionIcon p={4} radius="md" size="md" color={showVideo ? "raga-red.6" : "raga-green.6"} variant="outline" onClick={() => setShowVideo()}>
                            {showVideo ? <IconMovie /> : <IconMovieOff />}
                        </ActionIcon>
                    </Tooltip>
                </Group>

                <Group>
                    <Tooltip label="Previous">
                        <ActionIcon p={4} radius="md" size="md" color={"raga-red.6"} onClick={() => handlePlayPrev()}><IconPlayerTrackPrev /></ActionIcon>
                    </Tooltip>
                    <ActionIcon p={8} radius="md" size="lg" color={"raga-red.6"} variant="filled" onClick={() => togglePlay()}>
                        {isLoading ? <Loader color="white" size={'sm'}/> : (isPlaying ? <IconPlayerPause /> : <IconPlayerPlay />)}
                    </ActionIcon>
                    <Tooltip label="Next">
                        <ActionIcon p={4} radius="md" size="md" color={"raga-red.6"} onClick={() => handlePlayNext()}><IconPlayerTrackNext /></ActionIcon>
                    </Tooltip>

                </Group>
                <Group>
                    <ThemeIcon color="raga-green.6" variant="light" size={"sm"}>
                        <IconVolume/>
                    </ThemeIcon>
                    <Slider w='100px' color="raga-green.6" size={'xs'} value={volumeLevel} onChange={setVolume}/>
                </Group>

            </Group>
        </>
    )
}