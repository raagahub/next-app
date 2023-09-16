import { AspectRatio, Button, Group, Switch } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks";
import { IconPlayerPlay, IconPlayerTrackNext } from "@tabler/icons-react";
import { useState } from "react";
import YouTube, { YouTubeProps } from 'react-youtube';

const initialOpts: YouTubeProps['opts'] = {
    height: '390',
    width: '640',
    playerVars: {
      autoplay: 0,
    },
  };

interface YTPlayerProps {
    youtubeId: string;
    playNext: Function;
}

export const YTPlayer = ({ youtubeId, playNext }: YTPlayerProps) => {
    const [opts, setOpts] = useState<YouTubeProps['opts']>(initialOpts)

    const [autoplay, setAutoplay] = useState(true)

    const handleStateChange: YouTubeProps['onStateChange'] = (event) => {
        const playerState = event.target.getPlayerState()
        // Returns the state of the player. Possible values are:
        // -1 – unstarted
        // 0 – ended
        // 1 – playing
        // 2 – paused
        // 3 – buffering
        // 5 – video cued
    }

    const handleReady: YouTubeProps['onReady'] = (event) => {
        if (autoplay) {
            event.target.playVideo()
        }
    }

    return (
        <>
        <AspectRatio ratio={16 / 9}>
            <YouTube videoId={youtubeId} opts={opts} onStateChange={(e) => handleStateChange(e)} onReady={(e) => handleReady(e)}/>
            {/* <iframe
                src={`https://www.youtube.com/embed/${youtubeId}`}
                title="YouTube Player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            /> */}
        </AspectRatio>
        <Group>
            <Button leftIcon={<IconPlayerTrackNext />} variant="subtle" color="gray" radius="lg" size="xs" compact onClick={()=> playNext()}>Play Next</Button>
            <Switch checked={autoplay} onChange={(event) => setAutoplay(event.currentTarget.checked)} label="Autoplay"/>
        </Group>
        </>
    )
}