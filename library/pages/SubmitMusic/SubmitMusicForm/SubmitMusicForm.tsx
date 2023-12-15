import { forwardRef, useContext, useEffect, useState } from "react";
import { databaseErrorNotification } from '../../../helpers/NotificationHelpers';
import { Accordion, ActionIcon, Alert, Autocomplete, Badge, Box, Button, Divider, Group, Loader, Paper, Select, SelectItemProps, Text, TextInput, Textarea, Title, rem } from "@mantine/core";
import { useForm } from '@mantine/form';
import { youtubeIdRegExp, youtubeRegExp } from "../../../helpers/UrlHelpers";
import { useDebouncedValue, useToggle } from "@mantine/hooks";
import { IconAlertCircle, IconCheck, IconCircleCheck, IconCircleMinus, IconMinus, IconUser, IconUsersGroup } from "@tabler/icons-react";
import { Raga } from "../../../helpers/RagaHelpers";
import type { SelectItem } from "@mantine/core/lib/Select"
import { Artist, leadOptions, accompanimentOptions, defaultArtiste } from "../../../helpers/ArtistHelpers";
import { PostgrestError } from "@supabase/supabase-js";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useUser } from "../../../hooks/useUser";
import useStyles from '../SubmitMusic.styles';
import { SubmitMusicContext } from "../SubmitMusicComponent";
import { ArtistesForm } from "./ArtistesForm";
import { CompositionForm } from "./CompositionForm";
import { MoodForm } from "./MoodForm";



const linkStateMap = {
    success: { icon: <IconCircleCheck size="xs" color="teal" />, title: 'Looks Good!', color: 'teal' },
    error: { icon: <IconAlertCircle size="xs" color="red" />, title: 'Oops!', color: 'red' },

}

interface SubmitMusicFormProps {
    linkValidation: {
        loading: boolean;
        status: string;
        msg: string;
    };
}

export const SubmitMusicForm = ({ linkValidation }: SubmitMusicFormProps) => {
    const [loading, setLoading] = useState(false)
    const supabase = useSupabaseClient()
    const { user } = useUser();
    const { classes } = useStyles()

    const form = useContext(SubmitMusicContext)

    async function submitArtists(video_id: string) {
        if (form.values.mainArtist.id > 0) {
            try {
                if (form.values.mainArtist.id == 0) {
                    const { status, error } = await supabase
                        .from('pending_artists')
                        .insert([
                            {
                                role: 'main',
                                video_id: video_id,
                                name: form.values.mainArtist.name,
                                main_instrument: form.values.mainArtist.main_instrument,
                                user_id: user?.id,
                            },
                        ])
                    if (error) { throw error }

                } else {
                    const { status, error } = await supabase
                        .from('raga_video_artists')
                        .insert([
                            {
                                role: 'main',
                                video_id: video_id,
                                artist_id: form.values.mainArtist.id,
                                instrument: form.values.mainArtist.main_instrument
                            },
                        ])
                    if (error) { throw error }
                }

            } catch (error) {
                console.error("Error submitting main artist:", error);
                throw error
            }

        }

        if (form.values.accompanying[0].id > 0) {
            form.values.accompanying.forEach(async (artist: Artist) => {
                try {
                    if (artist.id == 0) {
                        const { status, error } = await supabase
                            .from('pending_artists')
                            .insert([
                                {
                                    role: 'accompanying',
                                    video_id: video_id,
                                    name: artist.name,
                                    main_instrument: artist.main_instrument,
                                    user_id: user?.id,
                                },
                            ])
                        if (error) { throw error }


                    } else {
                        const { status, error } = await supabase
                            .from('raga_video_artists')
                            .insert([
                                {
                                    role: 'accompanying',
                                    video_id: video_id,
                                    artist_id: artist.id,
                                    instrument: artist.main_instrument
                                },
                            ])
                        if (error) { throw error }
                    }

                } catch (error) {
                    console.error("Error submitting main artist:", error);
                    throw error
                }
            })
        }

    }

    async function submitYTLink() {
        setLoading(true)
        const { data: video, status, error } = await supabase
            .from('raga_videos')
            .insert([
                {
                    user_id: user?.id,
                    // raga_id: raga.id,
                    video_url: form.values.youtubeLink,
                    youtube_video_id: form.values.youtubeId
                },
            ])
            .select('*')
            .single()

        if (status == 201 && video) {
            try {
                await submitArtists(video.video_id)

            } catch (error) {
                // Handle errors and potential rollbacks as before
                if (video) {
                    await supabase.from('raga_videos').delete().eq('video_id', video.video_id);
                }
                console.error("Error submitting video:", error);
            }
            setLoading(false)
        }

        if (error) {
            setLoading(false)
            databaseErrorNotification(error)
        }
    }

    

    return (
        <Box className={classes.container}>
            <Text size={"xl"} fw={700} my={8}>Submit Music from Youtube</Text>
            <form onSubmit={form.onSubmit((values) => submitYTLink())}>
                <TextInput
                    withAsterisk
                    placeholder="https://www.youtube.com/watch?v=1a2b3c4d5e"
                    label="Paste a Youtube URL"
                    rightSection={linkValidation.loading ? <Loader size="xs" /> : null}
                    {...form.getInputProps('youtubeLink')}
                />
                {linkValidation.status &&
                    <Alert
                        mt={8}
                        icon={linkStateMap[linkValidation.status as 'success' | 'error']['icon']}
                        // title={linkStateMap[validationStatus as 'success' | 'error']['title']}
                        color={linkStateMap[linkValidation.status as 'success' | 'error']['color']} >
                        {linkValidation.msg}
                    </Alert>
                }

                <CompositionForm/>
                <ArtistesForm/>
                <MoodForm/>
                
                <Group position='right' mt={16}>
                    <Button variant="default">Save Draft</Button>
                    <Button variant='filled' loading={loading} type="submit">Submit Music</Button>
                </Group>
            </form>
        </Box>
    )
}
