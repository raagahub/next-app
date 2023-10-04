import { useContext, useEffect, useState } from "react";
import { initSupabase } from "../../../../helpers/SupabaseHelpers";
import { useDisclosure } from "@mantine/hooks";
import { RagaContext } from "../../../../helpers/RagaHelpers";
import { Button, Stack } from "@mantine/core";
import { IconVideoPlus } from "@tabler/icons-react";
import { YTPlayer } from "./YTPlayer";
import { YTSubmitForm } from "./YTSubmitForm";
import { databaseErrorNotification } from "../../../../helpers/NotificationHelpers";
import { VideoItem, YoutubeVideo } from "./VideoItem";

export const Watch = () => {
    const raga = useContext(RagaContext)
    const { supabase, user } = initSupabase()

    const [showYTSubmitForm, handlers] = useDisclosure(false);
    const [playlist, setPlaylist] = useState<YoutubeVideo[]>([])
    const [loading, setLoading] = useState(false)

    const [nowPlaying, setNowPlaying] = useState("")
    const [nowPlayingIndex, setNowPlayingIndex] = useState(0)

    async function getRagaVideos() {
        setLoading(true)
        const { data, error, status } = await supabase
            .from('raga_videos')
            .select('*, profiles!raga_videos_user_id_fkey (full_name, username, avatar_url), raga_video_artists (role, instrument, artist_id (id, name)), pending_artists (id, role, main_instrument, name)')
            .eq('raga_id', raga.id)

        if (status == 200) {
            console.log(data)
            setPlaylist(data as YoutubeVideo[])
            setLoading(false)
        }

        if (error) {
            setLoading(false)
            databaseErrorNotification(error)
        }
    }

    function addVideoToPlaylist(video: YoutubeVideo) {
        getRagaVideos()
    }

    function updateNowPlaying(video: YoutubeVideo) {
        setNowPlaying(video.youtube_video_id)
    }

    const [queue, updateQueue] = useState<string[]>([])
    function addToQueue(video: YoutubeVideo) {
        updateQueue((prevQueue) => {return [...prevQueue, video.youtube_video_id]})
    }

    function playNext() {
        if(queue.length > 0) {
            updateQueue((currQueue)=> {
                setNowPlaying(currQueue.shift() as string)
                return currQueue
            })
        } else {
            setNowPlayingIndex(nowPlayingIndex + 1)
        }
    }

    const videoPlaylist = playlist.map((video) => (
        <VideoItem key={video.video_id} video={video} setNowPlaying={updateNowPlaying} isPlaying={nowPlaying == video.youtube_video_id}/>
    ))

    useEffect(() => {
        getRagaVideos()
      }, [raga]);

    useEffect(() => {
        if (playlist.length > 0 && playlist.length > nowPlayingIndex) {
            setNowPlaying(playlist[nowPlayingIndex].youtube_video_id)
        }
    }, [playlist, nowPlayingIndex])


    return (
        <Stack mt={16}>
            {nowPlaying ? <YTPlayer youtubeId={nowPlaying} playNext={playNext} /> : "Playlist is empty"}
            {showYTSubmitForm ? <YTSubmitForm toggleClose={handlers.close} raga={raga} addVideo={addVideoToPlaylist} /> :
                <Button leftIcon={<IconVideoPlus />} variant="light" color="gray" radius="lg" onClick={handlers.open}>Add to Playlist</Button>
            }
            {loading ? "loading playlist" : videoPlaylist}
        </Stack>
    )
}