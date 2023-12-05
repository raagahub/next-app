import React from 'react'
import RagaExplore from '../../../library/components/raga_components/RagaExplore/RagaExplore'
import { Box, Text, Title } from '@mantine/core'

const RagaHome = () => {
    return (
        <>
            <Box py={32}>
                <Title align="center" fw={700} fz={64} order={1}>
                    Ragas{' '}
                    <Text inherit variant="gradient" gradient={{ from: 'raga-red.6', to: 'raga-orange.4', deg: 45 }} component="span">
                        Explore
                    </Text>
                </Title>
                <Text color="dimmed" align="center" size="lg" sx={{ maxWidth: 580 }} mx="auto" mt="xs">
                    Search, filter and discover Carnatic Ragas.
                </Text>
            </Box>
            <RagaExplore />
        </>
    )
}

export default RagaHome