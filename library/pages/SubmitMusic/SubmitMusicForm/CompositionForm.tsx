import { Badge, Box, Grid, Group, Paper, Select, SelectItem, Text, TextInput } from "@mantine/core"
import { useContext, useEffect, useState } from "react"
import { SubmitMusicContext } from "../SubmitMusicComponent"
import { useSupabaseClient } from "@supabase/auth-helpers-react"
import { Raga } from "../../../helpers/RagaHelpers";
import { databaseErrorNotification } from "../../../helpers/NotificationHelpers";
import { Tala } from "../../../helpers/TalaHelpers";
import { Composer, Composition, comp_formats } from "../../../helpers/CompositionHelpers";

export interface RagaSelect extends SelectItem {
    raga: Raga | null;
    value: string;
    label: string;
}

export interface TalaSelect extends SelectItem {
    tala: Tala | null;
    value: string;
    label: string;
}

export interface CompSelect extends SelectItem {
    comp: Composition | null;
    value: string;
    label: string;
}

export interface ComposerSelect extends SelectItem {
    composer: Composer | null;
    value: string;
    label: string;
}

export const CompositionForm = () => {
    const form = useContext(SubmitMusicContext)
    const supabase = useSupabaseClient()

    const [allRagas, setRagas] = useState<RagaSelect[]>([])
    const [ragaActive, setRagaActive] = useState(false)

    async function getRagas() {
        const { data, status, error } = await supabase
            .from('ragas')
            .select('*')

        if (status == 200 && data) {
            setRagas(data.map((raga) => ({ raga: raga, value: raga.id, label: raga.format_name })))
        }

        if (error) {
            databaseErrorNotification(error)
        }

    }

    const [allTalas, setTalas] = useState<TalaSelect[]>([])
    const [talaActive, setTalaActive] = useState(false)

    async function getTalas() {
        const { data, status, error } = await supabase
            .from('talas')
            .select('*')

        if (status == 200 && data) {
            console.log('tala data', data)
            setTalas(data.map((tala) => ({ tala: tala, value: tala.id, label: tala.name })))
        }

        if (error) {
            databaseErrorNotification(error)
        }

    }

    const [allComps, setComps] = useState<CompSelect[]>([])
    const [newComp, setNewComp] = useState<CompSelect | null>(null)
    const [compActive, setCompActive] = useState(false)

    async function getComps() {
        const { data, status, error } = await supabase
            .from('compositions')
            .select('*')

        if (status == 200 && data) {
            setComps(data.map((comp) => ({ comp: comp, value: comp.id, label: comp.title })))
        }

        if (error) {
            databaseErrorNotification(error)
        }

    }

    const [allComposers, setComposers] = useState<ComposerSelect[]>([])
    const [composerActive, setComposerActive] = useState(false)

    async function getComposers() {
        const { data, status, error } = await supabase
            .from('composers')
            .select('*')

        if (status == 200 && data) {
            setComposers(data.map((composer) => ({ composer: composer, value: composer.id, label: composer.name })))
        }

        if (error) {
            databaseErrorNotification(error)
        }

    }

    useEffect(() => {
        getRagas();
        getTalas();
        getComps();
        getComposers();
    }, []);

    useEffect(() => {
        const selected = form.values.format
        console.log(form.getInputProps('format'))
        if (selected) {
            if (selected == 'rtp') {
                setRagaActive(true)
                setTalaActive(true)
                setCompActive(false)
            } else {
                setCompActive(true)
                setRagaActive(false)
                setTalaActive(false)
                setComposerActive(false)
            }
        }

        if (newComp) {
            setRagaActive(true)
            setTalaActive(true)
            setComposerActive(true)
        }
        
    }, [form.values.format, newComp]);


    return (
        <Paper withBorder p={16} mt={16}>
            <Grid>
                <Grid.Col span={2}>
                    <Badge color="orange" style={{ position: 'relative', right: '0px' }}>Composition</Badge>
                </Grid.Col>
                <Grid.Col span={10}>

                    <Group position='left'>
                        <Select
                            label="Format"
                            placeholder="Varnam / Krithi / etc."
                            data={comp_formats}
                            description="Please select the correct format of item"
                            searchable
                            {...form.getInputProps(`format`)}
                        />
                        <Select
                            label="Title of Composition"
                            placeholder="Raghuvamsa Sudha"
                            data={allComps}
                            description="Please add a new entry if composition does not exist"
                            searchable
                            creatable
                            getCreateLabel={(query) => (<Text><Text span fs="italic">Add </Text>{query}</Text>)}
                            onCreate={(query) => {
                                const newComp: CompSelect = { comp: null, label: query, value: query }
                                setComps((current) => [...current, newComp]);
                                setNewComp(newComp)
                                form.setFieldValue(`compName`, query)
                                form.setFieldValue(`newComp`, true)
                                return newComp;
                            }}
                            disabled={!compActive}
                            {...form.getInputProps('compId')}
                        />
                    </Group>
                    <Group position='left' mt={16}>
                        <Select
                            label="Raga"
                            placeholder="Type Raga name"
                            data={allRagas}
                            searchable
                            disabled={!ragaActive}
                            {...form.getInputProps(`ragaId`)}
                        />

                        <Select
                            label="Tala"
                            placeholder="Type Tala name"
                            data={allTalas}
                            searchable
                            disabled={!talaActive}
                            {...form.getInputProps(`talaId`)}
                        />
                        
                        <Select
                                label="Composer"
                                placeholder="Type Composer's name"
                                data={allComposers}
                                searchable
                                disabled={!composerActive}
                                {...form.getInputProps(`composerId`)}
                            />


                    </Group>
                </Grid.Col>
            </Grid>



        </Paper>
    )
}
