import { ActionIcon, Autocomplete, Badge, Box, Button, Card, Collapse, Container, Divider, Flex, Grid, Group, Image, Text, useMantineColorScheme } from '@mantine/core';
import { IconSearch, IconAdjustments } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
import { RagaCard } from '../RagaCard/RagaCard';

let mockdata = require('./mockdata.json');

const RagaExplore = () => {
    const [opened, { toggle }] = useDisclosure(false);
    const { colorScheme, toggleColorScheme } = useMantineColorScheme();
    const dark = colorScheme === 'dark';
    const ragaNames = mockdata.map(
        raga => raga.format_name
    )
    const ragaCards = mockdata.map((raga) => (
        <RagaCard raga={raga}/>
    ))
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
                    width={800}
                    icon={<IconSearch />}
                    data={ragaNames} />
            </Container>
            <Container pb="lg" mx="auto" w={{ base: 320, sm: 480, lg: 640 }}>
                <Divider
                    my="xs"
                    labelPosition="center"
                    label={
                            <ActionIcon size="lg" onClick={toggle}>
                                <IconAdjustments size="1.625rem" />
                            </ActionIcon>
                    }
                />
                <Collapse in={opened}>
                    <Box bg="black">this is the end</Box>
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