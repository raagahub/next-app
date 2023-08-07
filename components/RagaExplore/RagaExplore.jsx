import { ActionIcon, Autocomplete, Badge, Box, Button, Card, Collapse, Container, Divider, Flex, Grid, Group, Image, Text, useMantineColorScheme } from '@mantine/core';
import { IconSearch, IconAdjustments } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
import { useState } from 'react';
import { RagaCard } from '../RagaCard/RagaCard';
import { RagaFilter } from '../RagaFilter/RagaFilter'
import { allSwaras } from '../SwaraMapping'

let data = require('./ragas.json');

const swaraSelectStartState = {
    "S": false,
    "R1": false,
    "R2": false,
    "R3": false,
    "G1": false,
    "G2": false,
    "G3": false,
    "M1": false,
    "M2": false,
    "P": false,
    "D1": false,
    "D2": false,
    "D3": false,
    "N1": false,
    "N2": false,
    "N3": false,
}

const RagaExplore = () => {
    const [opened, { toggle }] = useDisclosure(false);
    const { colorScheme, toggleColorScheme } = useMantineColorScheme();
    const dark = colorScheme === 'dark';

    const ragaNames = data.map(
        raga => raga.format_name
    )

    const [query, setQuery] = useState("")
    const [swaraSelectState, updateSwaraSelect] = useState(swaraSelectStartState)
    function handleSwaraSelect(swara) {
        updateSwaraSelect({
            ...swaraSelectState,
            [swara]: !(swaraSelectState[swara])
        })
    }
    function getSwaraSelectList() {
        const out = []
        for (let key in swaraSelectState) {
            if (swaraSelectState[key]) {
                out.push(key)
            }
        }
        if (out.length == 0) {
            return []
        } else {
            return out
        }
    }

    console.log(getSwaraSelectList())

    const ragaCards = data.filter(
        raga=>raga.format_name.toLowerCase().startsWith(query.toLowerCase()) && 
        getSwaraSelectList().every(swara => raga.arohanam.includes(swara) || raga.avarohanam.includes(swara))
        ).map(
            (raga) => (<RagaCard raga={raga} key={raga.id}/>))

    return (
        <Flex
            mt="xl"
            mih={50}
            bg={dark ? 'dark.6' : 'indigo.0'}
            gap="md"
            justify="flex-start"
            align="center"
            direction="column"
            wrap="wrap"
        >
            <Container mt="lg" py="lg" mx="auto" w={{ base: 320, sm: 480, lg: 640 }}>
                <Autocomplete
                    size="xl"
                    width={800}
                    icon={<IconSearch />}
                    data={ragaNames} 
                    dropdownPosition="top"
                    onChange={setQuery}
                    onItemSubmit={item => setQuery(item.value)}
                    />
            </Container>
            <Container pb="lg" mx="auto" w="100%">
                <Divider
                    my="xs"
                    labelPosition="center"
                    w="100%"
                    label={
                            <ActionIcon size="lg" onClick={toggle}>
                                <IconAdjustments size="1.625rem" />
                            </ActionIcon>
                    }
                />
                <Collapse in={opened}>
                    <RagaFilter selectedSwaras={swaraSelectState} handleSwaraSelect={handleSwaraSelect}/>
                </Collapse>
            </Container>
            <Flex
            mih={50}
            px="lg"
            gap="lg"
            justify="center"
            align="flex-start"
            direction="row"
            wrap="wrap"
            >
                {ragaCards}
            </Flex>
        </Flex>
    )
}

export default RagaExplore