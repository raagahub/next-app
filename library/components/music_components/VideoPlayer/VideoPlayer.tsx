import { Box } from '@mantine/core';
import React from 'react'
import ReactPlayer from 'react-player/youtube'
import useStyles from './VideoPlayer.styles'

interface VideoPlayerProps {
    url: string;
    controls: boolean;
}

export const VideoPlayer = ({url, controls}: VideoPlayerProps) => {
    const {classes} = useStyles()
  return (
    <Box className={classes.playerWrapper}>
        <ReactPlayer 
        url={url} 
        controls={controls}
        width='100%' height='100%' className={classes.reactPlayer}/>
    </Box>
  )
}
