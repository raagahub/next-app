import { ActionIcon, Alert, Badge, Button, Grid, Group, Paper, Select, SelectItem, Text } from "@mantine/core";
import { IconMinus, IconUser, IconUsersGroup } from "@tabler/icons-react";
import { useContext, useEffect, useState } from "react";
import { SubmitMusicContext } from "../SubmitMusicComponent";
import { Artist, accompanimentOptions, defaultArtiste, leadOptions } from "../../../helpers/ArtistHelpers";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { databaseErrorNotification } from "../../../helpers/NotificationHelpers";
import { useUser } from "../../../hooks/useUser";

export interface ArtistSelect extends SelectItem {
    artist: Artist | null;
    value: string;
    label: string;
}

export const ArtistesForm = () => {
    const form = useContext(SubmitMusicContext)
    const supabase = useSupabaseClient()
    const { user } = useUser();
    const [allArtists, setArtists] = useState<ArtistSelect[]>([])

    const accompanyingFields = form.values.accompanying.map((artist, index) => (
        <Group position='left' mb={8} key={`accompanying_${index}`}>
            <Select
                label="Instrument"
                placeholder="Vocal / Violin / etc."
                data={accompanimentOptions}
                searchable
                {...form.getInputProps(`accompanying.${index}.main_instrument`)}
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

    async function getArtists() {
        const { data, status, error } = await supabase
            .from('artists')
            .select('id, name, main_instrument')

        if (status == 200 && data) {
            setArtists(data.map((artist) => ({ artist: artist, value: artist.id, label: artist.name })))
        }

        if (error) {
            databaseErrorNotification(error)
        }

    }

    useEffect(() => {
        getArtists()
    }, []);

    const [addedNewArtist, updateNewArtist] = useState({ main: false, accompanying: false })

    return (
        <Paper withBorder p={16} mt={16}>
            <Grid>
                <Grid.Col span={2}>
                <Badge style={{ position: 'relative', right: '0px' }}>Artistes</Badge>
                </Grid.Col>
                <Grid.Col span={10}>

                    <Text fw={500}>Main Artiste</Text>
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
                    <Text fw={500} mt={16}>Accompanying Artistes</Text>
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
                </Grid.Col>

            </Grid>
        </Paper>
    )
}
