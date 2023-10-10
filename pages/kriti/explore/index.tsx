import React from 'react'
import { Text, Title } from '@mantine/core'
import KritiExplore from '../../../library/components/kriti_components/KritiExplore/KritiExplore'

const KritiHome = () => {
    return (
        <>
            <Title align="center" mt={32} fw={700} fz={64} order={1}>
                Kritis{' '}
                <Text inherit variant="gradient" gradient={{ from: 'raga-red.6', to: 'orange.5', deg: 45 }} component="span">
                    Explore
                </Text>
            </Title>
            <Text color="dimmed" align="center" size="lg" sx={{ maxWidth: 580 }} mx="auto" mt="xl">
                Search, filter and discover Carnatic Compositions.
            </Text>
            <KritiExplore />
        </>
    )
}

export default KritiHome