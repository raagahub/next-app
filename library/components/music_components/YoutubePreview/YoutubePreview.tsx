import { Card, Spoiler, Text } from '@mantine/core';
import { useState, useEffect } from 'react';


interface YoutubePreviewProps {
    videoId: string;
}

export const YoutubePreview = ({ videoId }: YoutubePreviewProps) => {
    const apiKey = process.env.NEXT_PUBLIC_YOUTUBE_API;
    const [videoTitle, setVideoTitle] = useState('');
    const [videoDescription, setVideoDescription] = useState('');

    useEffect(() => {
        fetch(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${apiKey}`)
        .then(response => response.json())
        .then(response => {
            // Process the response
            const video = response.items[0];
            if (video) {
                setVideoTitle(video.snippet.title);
                setVideoDescription(video.snippet.description);
            }
        }, (error) => {
            console.error('Error fetching video details:', error);
        });
    }, [videoId]);


    return (
        <div>
            <Card shadow="sm" padding="md" radius="md" mt={8} withBorder title='Youtube Details'>
                <Text fw={700}>{videoTitle}</Text>
                <Text size={'sm'} fw={500} color='dimmed' mt={8}>Description</Text>
                <Spoiler maxHeight={80} showLabel="Show more" hideLabel="Hide">
                    <Text>{videoDescription}</Text>
                </Spoiler>
            </Card>
        </div>
    )
}

// Example Response:
// "items": [
//     {
//       "kind": "youtube#video",
//       "etag": "1gyK8B6tmaQdshGjM6oA7tAdYfw",
//       "id": "zNhSkwl-th0",
//       "snippet": {
//         "publishedAt": "2024-01-10T11:30:26Z",
//         "channelId": "UC6-4EXwd60J6cfJPttOHd3A",
//         "title": "Rara Raghuveera | Maharajapuram Santhanam | Sri Ramachandra | Tyagaraja | Carnatic Classical Music",
//         "description": "🌟 Immerse yourself in the divine world of classical Carnatic music with the soul-stirring rendition of \"Rara Raghuveera\" by the legendary Maharajapuram Santhanam. 🙏 Only on  @saregamacarnaticclassical  \n\nCredits:\n\nSong Name: Rara Raghuveera\nArtist: Maharajapuram Santhanam\nMusic Director: Tyagaraja\nLyricist: Tyagaraja\nRaag: Atana\n\n#RaraRaghuveera\n#maharajapuramsanthanam \n#tyagaraja \n#saregamacarnatic \n#carnaticmusicians \n#carnaticmusic \n#devotional \n#sriramachandra\n\nLabel: Saregama India Limited, A RPSG Group Company\n\nTo buy the original and virus free track, visit www.saregama.com\nFollow us on: YouTube: https://www.youtube.com/user/Saregamacarnatic\nFacebook: http://www.facebook.com/Saregamatamil\nTwitter: https://twitter.com/saregamasouth\u200b\u200b",
//         "thumbnails": {
//           "default": {
//             "url": "https://i.ytimg.com/vi/zNhSkwl-th0/default.jpg",
//             "width": 120,
//             "height": 90
//           },
//           "medium": {
//             "url": "https://i.ytimg.com/vi/zNhSkwl-th0/mqdefault.jpg",
//             "width": 320,
//             "height": 180
//           },
//           "high": {
//             "url": "https://i.ytimg.com/vi/zNhSkwl-th0/hqdefault.jpg",
//             "width": 480,
//             "height": 360
//           },
//           "standard": {
//             "url": "https://i.ytimg.com/vi/zNhSkwl-th0/sddefault.jpg",
//             "width": 640,
//             "height": 480
//           },
//           "maxres": {
//             "url": "https://i.ytimg.com/vi/zNhSkwl-th0/maxresdefault.jpg",
//             "width": 1280,
//             "height": 720
//           }
//         },
//         "channelTitle": "Saregama Carnatic Classical",
//         "tags": [
//           "carnatic music",
//           "carnatic classical songs",
//           "carnatic classical",
//           "tamil carnatic music",
//           "carnatic vocal",
//         ],
//         "categoryId": "10",
//         "liveBroadcastContent": "none",
//         "defaultLanguage": "en",
//         "localized": {
//           "title": "Rara Raghuveera | Maharajapuram Santhanam | Sri Ramachandra | Tyagaraja | Carnatic Classical Music",
//           "description": "🌟 Immerse yourself in the divine world of classical Carnatic music with the soul-stirring rendition of \"Rara Raghuveera\" by the legendary Maharajapuram Santhanam. 🙏 Only on  @saregamacarnaticclassical  \n\nCredits:\n\nSong Name: Rara Raghuveera\nArtist: Maharajapuram Santhanam\nMusic Director: Tyagaraja\nLyricist: Tyagaraja\nRaag: Atana\n\n#RaraRaghuveera\n#maharajapuramsanthanam \n#tyagaraja \n#saregamacarnatic \n#carnaticmusicians \n#carnaticmusic \n#devotional \n#sriramachandra\n\nLabel: Saregama India Limited, A RPSG Group Company\n\nTo buy the original and virus free track, visit www.saregama.com\nFollow us on: YouTube: https://www.youtube.com/user/Saregamacarnatic\nFacebook: http://www.facebook.com/Saregamatamil\nTwitter: https://twitter.com/saregamasouth\u200b\u200b"
//         },
//         "defaultAudioLanguage": "ta"
//       }
//     }
//   ],
