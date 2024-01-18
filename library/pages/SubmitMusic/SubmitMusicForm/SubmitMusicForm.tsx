import { useContext, useState } from "react";
import { databaseErrorNotification } from '../../../helpers/NotificationHelpers';
import { Alert, Box, Button, Center,Group, Loader, Text, TextInput, Title } from "@mantine/core";
import { IconAlertCircle, IconCircleCheck  } from "@tabler/icons-react";
import { SubmissionArtist } from "../../../helpers/ArtistHelpers";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useUser } from "../../../hooks/useUser";
import useStyles from '../SubmitMusic.styles';
import { SubmitMusicContext } from "../SubmitMusicComponent";
import { ArtistesForm } from "./ArtistesForm";
import { CompositionForm } from "./CompositionForm";
import { MoodForm } from "./MoodForm";
import { useRouter } from "next/navigation";



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
    const router = useRouter()
    const { user } = useUser();
    const { classes } = useStyles()

    const form = useContext(SubmitMusicContext)
    const [submitted, setSubmitted] = useState(false)

    async function submitArtists(submission_id: string) {
        if (form.values.mainArtist.artist_id) {
            try {
                // Handle New Artist Submission
                if (form.values.mainArtist.artist_id >= 1000) {
                    const { data, status, error } = await supabase
                        .from('pending_artists')
                        .insert([
                            {
                                role: 'main',
                                submission_id: submission_id,
                                name: form.values.mainArtist.artists.name,
                                main_instrument: form.values.mainArtist.instrument,
                                user_id: user?.id,
                            },
                        ])
                        .select('*').single();
                    if (error) { throw error }
                    if (status == 201 && data) {
                        const { status, error } = await supabase
                            .from('submission_pending_artists')
                            .insert([
                                {
                                    role: 'main',
                                    submission_id: submission_id,
                                    pending_artist_id: data.id,
                                    instrument: form.values.mainArtist.instrument
                                },
                            ])
                        if (error) { throw error }
                    }

                } else {
                    const { status, error } = await supabase
                        .from('submission_artists')
                        .insert([
                            {
                                role: 'main',
                                submission_id: submission_id,
                                artist_id: form.values.mainArtist.artist_id,
                                instrument: form.values.mainArtist.instrument
                            },
                        ])
                    if (error) { throw error }
                }

            } catch (error) {
                console.error("Error submitting main artist:", error);
                throw error
            }

        }

        if (form.values.accompanying[0] && form.values.accompanying[0].instrument && form.values.accompanying[0].artist_id) {
            form.values.accompanying.forEach(async (artist: SubmissionArtist) => {
                try {
                    // Handle New Artist Submission
                    if (artist.artist_id >= 1000) {
                        const { data, status, error } = await supabase
                            .from('pending_artists')
                            .insert([
                                {
                                    role: 'accompanying',
                                    submission_id: submission_id,
                                    name: artist.artists.name,
                                    main_instrument: artist.instrument,
                                    user_id: user?.id,
                                },
                            ])
                            .select('*').single();
                        if (error) { throw error }
                        if (status == 201 && data) {
                            if (error) { throw error }
                            if (status == 201 && data) {
                                const { status, error } = await supabase
                                    .from('submission_pending_artists')
                                    .insert([
                                        {
                                            role: 'main',
                                            submission_id: submission_id,
                                            pending_artist_id: data.id,
                                            instrument: artist.instrument
                                        },
                                    ])
                                if (error) { throw error }
                            }
                        }


                    } else {
                        const { status, error } = await supabase
                            .from('submission_artists')
                            .insert([
                                {
                                    role: 'accompanying',
                                    submission_id: submission_id,
                                    artist_id: artist.artist_id,
                                    instrument: artist.instrument
                                },
                            ])
                        if (error) { throw error }
                    }

                } catch (error) {
                    console.error("Error submitting accompanying artist:", error);
                    throw error
                }
            })
        }

    }

    async function submitYTLink() {
        setLoading(true);

        // Define the base object for insertion
        const submissionData = {
            user_id: user?.id,
            youtube_url: form.values.youtubeLink,
            youtube_video_id: form.values.youtubeId,
            format: form.values.format,
            title: form.values.title,
            image: form.values.image,
            composition_title: form.values.compName,
            raga_id: form.values.ragaId,
            tala_id: form.values.talaId,
            composer_id: form.values.composerId,
            moods: form.values.moods,
            // Set either new_composition flag or composition_id based on form values
            ...(form.values.newComp ? { new_composition: true } :
                { composition_id: form.values.compId }),
        };

        // Perform the insert operation
        try {
            const { data: submission, status, error } = await supabase
                .from('submissions')
                .insert([submissionData])
                .select('*').single();

            if (error) {
                // Handle error here
                databaseErrorNotification(error);
                setLoading(false);
                return;
            }

            // If insertion is successful, proceed to submit artists
            if (status === 201 && submission) {
                await submitArtists(submission.id);
                setSubmitted(true)
            }
        } catch (error) {
            // Handle errors and potential rollbacks
            console.error("Error submitting video:", error);
        }
        // Finally, set loading to false
        setLoading(false);
        
    }

    if (submitted) {
        return (
            <Box className={classes.container}>
                <Center>
                    <Box mt={96} maw={400}>
                        <Title align="center" order={2} color="raga-red">
                            Your submission was successful
                        </Title>
                        <Text align="center">
                            You will be notified once your submission has been approved by the team of moderators.
                        </Text>
                        <Group mt={32} position={'center'}>
                            <Button variant='default' onClick={() => router.push('/dashboard')}>Back to Dashboard</Button>
                            <Button variant='filled' onClick={router.refresh}>New Submission</Button>
                        </Group>
                    </Box>
                </Center>
            </Box>
        )
    }





    return (
        <Box className={classes.container}>
            <Text size={"xl"} fw={700} my={8}>Submit Music from Youtube - {user?.email}</Text>
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

                <CompositionForm />
                <ArtistesForm />
                <MoodForm />

                <Group position='right' mt={16}>
                    <Button variant="default">Save Draft</Button>
                    <Button variant='filled' loading={loading} type="submit">Submit Music</Button>
                </Group>
            </form>
        </Box>
    )
}
