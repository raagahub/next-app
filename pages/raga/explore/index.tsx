import React from 'react'
import RagaExplore from '../../../library/components/raga_components/RagaExplore/RagaExplore'
import { Text, Title } from '@mantine/core'

const RagaHome = () => {
    return (
        <>
            <Title align="center" mt={32} fw={700} fz={64} order={1}>
                Ragas{' '}
                <Text inherit variant="gradient" gradient={{ from: 'raga-red.6', to: 'orange.5', deg: 45 }} component="span">
                    Explore
                </Text>
            </Title>
            <Text color="dimmed" align="center" size="lg" sx={{ maxWidth: 580 }} mx="auto" mt="xl">
                Search, filter and discover Carnatic Ragas.
            </Text>
            <RagaExplore />
        </>
    )
}

export default RagaHome