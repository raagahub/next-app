import { forwardRef, useEffect, useState } from "react";
import { initSupabase } from "../../../../../helpers/SupabaseHelpers";
import { databaseErrorNotification } from "../../../../../helpers/NotificationHelpers";
import { Accordion, ActionIcon, Alert, Autocomplete, Button, Divider, Group, Loader, Paper, Select, SelectItemProps, Text, TextInput, Textarea, Title, rem } from "@mantine/core";
import { useForm } from '@mantine/form';
import { youtubeIdRegExp, youtubeRegExp } from "../../../../../helpers/UrlHelpers";
import { YoutubeVideo } from "./VideoItem";
import { useDebouncedValue, useToggle } from "@mantine/hooks";
import { IconAlertCircle, IconCheck, IconCircleCheck, IconCircleMinus, IconMinus, IconUser, IconUsersGroup } from "@tabler/icons-react";
import { Raga } from "../../../../../helpers/RagaHelpers";
import type { SelectItem } from "@mantine/core/lib/Select"
import { Artist, leadOptions, accompanimentOptions } from "../../../../../helpers/ArtistHelpers";
import { PostgrestError } from "@supabase/supabase-js";


export interface YTSubmitFormProps {
    toggleClose: () => void;
    raga: Raga;
    addVideo: Function;
}

export interface ArtistSelect extends SelectItem {
    artist: Artist | null;
    value: string;
    label: string;
}

const linkStateMap = {
    success: { icon: <IconCircleCheck size="xs" color="teal" />, title: 'Looks Good!', color: 'teal' },
    error: { icon: <IconAlertCircle size="xs" color="red" />, title: 'Oops!', color: 'red' },

}

export const YTSubmitForm = ({ toggleClose, raga, addVideo }: YTSubmitFormProps) => {
    const [loading, setLoading] = useState(false)
    const { supabase, user } = initSupabase()

    const [validationLoading, setValidationLoading] = useState(false)
    const [validationStatus, setValidationStatus] = useState<string | null>(null);
    const [validationMsg, setValidationMsg] = useState<string | null>(null);

    async function validateYTLink(url: string) {
        setValidationLoading(true)
        const { data, count, status, error } = await supabase
            .from('raga_videos')
            .select('*', { count: 'exact' })
            .eq('youtube_video_id', getVideoId(url))

        if (status == 200 && count && count > 0) {
            // TODO: Add way to access existing video
            console.log("validation result", data)
            setValidationLoading(false)
            setValidationStatus('error')
            setValidationMsg('This video has already been submitted.')
        } else {
            if (error) {
                databaseErrorNotification(error)
                setValidationLoading(false)
                setValidationMsg(null)
            } else {
                setValidationLoading(false)
                setValidationStatus('success')
                setValidationMsg('Your submission link looks good! Provide more details to make it better.')
            }
        }
    }

    const defaultArtiste = {
        id: 0,
        name: '',
        instrument: '',
    }

    const form = useForm({
        initialValues: {
            youtubeLink: '',
            mainArtist: defaultArtiste,
            accompanying: [defaultArtiste]
        },

        validateInputOnChange: true,

        validate: {
            youtubeLink: (value) => (youtubeRegExp.test(value) ? null : 'Invalid Youtube Link'),
        },
    });

    const [debouncedYTLink] = useDebouncedValue(form.values.youtubeLink, 200);

    function getVideoId(url: string) {
        const match = url.match(youtubeIdRegExp);
        console.log("getIdregex", match)
        return (match && match[7].length === 11)
            ? match[7]
            : null;
    }

    const [allArtists, setArtists] = useState<ArtistSelect[]>([])
    const [accordianVal, toggleAccordianVal] = useToggle(["main_artist", "accompanying_artists"])

    async function getArtists() {
        const { data, status, error } = await supabase
            .from('artists')
            .select('id, name, main_instrument')

        if (status == 200 && data) {
            setArtists(data.map((artist) => ({ artist: artist, value: artist.id, label: artist.name })))
        }

        if (error) {
            setLoading(false)
            databaseErrorNotification(error)
        }

    }

    useEffect(() => {
        getArtists()
    }, []);

    useEffect(() => {
        if (form.isValid('youtubeLink')) {
            validateYTLink(debouncedYTLink)
        }

    }, [debouncedYTLink]);

    const [addedNewArtist, updateNewArtist] = useState({ main: false, accompanying: false })

    const [addedMainArtist, mainArtistStatus] = useState(false)

    useEffect(() => {
        if (form.values.mainArtist.id && form.values.mainArtist.instrument) {
            mainArtistStatus(true)
            // toggleAccordianVal()
        } else {
            mainArtistStatus(false)
        }

    }, [form.values.mainArtist]);

    const [addedAccompanyingArtist, accompanyingArtistStatus] = useState(false)

    useEffect(() => {
        if (form.values.accompanying[0].id && form.values.accompanying[0].instrument) {
            accompanyingArtistStatus(true)
        } else {
            accompanyingArtistStatus(false)
        }

    }, [form.values.accompanying]);

    async function submitArtists(video_id: string) {
        if (addedMainArtist) {
            try {
                if (form.values.mainArtist.id == 0) {
                    const { status, error } = await supabase
                        .from('pending_artists')
                        .insert([
                            {
                                role: 'main',
                                video_id: video_id,
                                name: form.values.mainArtist.name,
                                main_instrument: form.values.mainArtist.instrument,
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

        if (addedAccompanyingArtist) {
            form.values.accompanying.forEach(async (artist) => {
                try {
                    if (artist.id == 0) {
                        const { status, error } = await supabase
                            .from('pending_artists')
                            .insert([
                                {
                                    role: 'accompanying',
                                    video_id: video_id,
                                    name: artist.name,
                                    main_instrument: artist.instrument,
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
                                    instrument: artist.instrument
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
                    raga_id: raga.id,
                    video_url: form.values.youtubeLink,
                    youtube_video_id: getVideoId(form.values.youtubeLink)
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
            addVideo()
            setLoading(false)
            toggleClose()
        }

        if (error) {
            setLoading(false)
            databaseErrorNotification(error)
        }
    }

    const accompanyingFields = form.values.accompanying.map((artist, index) => (
        <Group position='left' mb={8}>
            <Select
                label="Instrument"
                placeholder="Vocal / Violin / etc."
                data={accompanimentOptions}
                searchable
                {...form.getInputProps(`accompanying.${index}.instrument`)}
            />
            <Select
                label="Name of Artiste"
                placeholder="Type Name"
                data={allArtists}
                searchable
                creatable
                getCreateLabel={(query) => (<Text><Text span fs="italic">Add </Text>{query}</Text>)}
                onCreate={(query) => {
                    const newArtist: ArtistSelect = { artist: null, label: query, value: '0' }
                    setArtists((current) => [...current, newArtist]);
                    updateNewArtist({ ...addedNewArtist, accompanying: true })
                    form.setFieldValue(`accompanying.${index}.name`, query)
                    return newArtist;
                }}
                {...form.getInputProps(`accompanying.${index}.id`)}
            />
            <ActionIcon color="red" variant="light" mt={20} radius={'md'}
                onClick={() => form.removeListItem('accompanying', index)} disabled={form.values.accompanying.length < 2}>
                <IconMinus size="1.125rem" />
            </ActionIcon>

        </Group>
    ))

    return (
        <Paper shadow="md" p="md" radius={'md'}>
            <Text size={"xl"} fw={700} my={8}>Add a Video to {raga.format_name}</Text>
            <form onSubmit={form.onSubmit((values) => submitYTLink())}>
                <TextInput
                    withAsterisk
                    placeholder="https://www.youtube.com/watch?v=1a2b3c4d5e"
                    label="Paste a Youtube URL"
                    rightSection={validationLoading ? <Loader size="xs" /> : null}
                    {...form.getInputProps('youtubeLink')}
                />
                {validationStatus &&
                    <Alert
                        mt={8}
                        icon={linkStateMap[validationStatus as 'success' | 'error']['icon']}
                        // title={linkStateMap[validationStatus as 'success' | 'error']['title']}
                        color={linkStateMap[validationStatus as 'success' | 'error']['color']} >
                        {validationMsg}
                    </Alert>
                }
                <Accordion variant="separated" radius="md" chevronPosition="left" defaultValue={accordianVal} mt={16}>
                    <Accordion.Item value="main_artist">
                        <Accordion.Control icon={addedMainArtist ? <IconCircleCheck size={rem(20)} color="teal" /> : null}>Main Artiste</Accordion.Control>
                        <Accordion.Panel>
                            <Group position='left'>
                                <Select
                                    label="Instrument"
                                    placeholder="Vocal / Violin / etc."
                                    data={leadOptions}
                                    searchable
                                    {...form.getInputProps(`mainArtist.instrument`)}
                                />
                                <Select
                                    label="Name of Artiste"
                                    placeholder="Type Name"
                                    data={allArtists}
                                    searchable
                                    creatable
                                    getCreateLabel={(query) => (<Text><Text span fs="italic">Add </Text>{query}</Text>)}
                                    onCreate={(query) => {
                                        const newArtist: ArtistSelect = { artist: null, label: query, value: '0' }
                                        setArtists((current) => [...current, newArtist]);
                                        updateNewArtist({ ...addedNewArtist, main: true })
                                        form.setFieldValue(`mainArtist.name`, query)
                                        return newArtist;
                                    }}
                                    {...form.getInputProps(`mainArtist.id`)}
                                />
                            </Group>
                            {addedNewArtist.main &&
                                <Alert
                                    mt={8}
                                    icon={<IconUsersGroup size="xs" color="orange" />}
                                    color={"orange"} >
                                    Adding of new artists will be subject to approval by moderators. You will be notified once successful.
                                </Alert>
                            }
                        </Accordion.Panel>
                    </Accordion.Item>
                    <Accordion.Item value="accompanying_artists">
                        <Accordion.Control icon={addedAccompanyingArtist ? <IconCircleCheck size={rem(20)} color="teal" /> : null}>Accompanying Artistes</Accordion.Control>
                        <Accordion.Panel>
                            {accompanyingFields}
                            <Button mt={8} leftIcon={<IconUser size="1rem" />} variant={'outline'}
                                onClick={() => form.insertListItem('accompanying', defaultArtiste)}>Add Accompanying Artiste</Button>
                            {addedNewArtist.accompanying &&
                                <Alert
                                    mt={8}
                                    icon={<IconUsersGroup size="xs" color="orange" />}
                                    color={"orange"} >
                                    Adding of new artists will be subject to approval by moderators. You will be notified once successful.
                                </Alert>
                            }
                        </Accordion.Panel>
                    </Accordion.Item>
                </Accordion>
                <Group position='right' mt={16}>
                    <Button variant='filled' loading={loading} type="submit">Add to Playlist</Button>
                    <Button variant='default' onClick={toggleClose}>Cancel</Button>
                </Group>
            </form>
        </Paper>
    )
}
