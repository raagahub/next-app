import { createContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { initSupabase } from '../../library/helpers/SupabaseHelpers'
import { Box, Container, Button, Paper, Text, Title, useMantineColorScheme, Grid } from '@mantine/core';
import { databaseErrorNotification } from '../../library/helpers/NotificationHelpers'
import { Raga, RagaContext } from '../../library/helpers/RagaHelpers'
import { RagaCard } from '../../library/components/raga_components/RagaCard/RagaCard';
import { RagaDescription } from '../../library/components/raga_components/RagaDetail/RagaDescription';
import { RagaScalePlayer } from '../../library/components/raga_components/RagaDetail/RagaScalePlayer';
import { RagaDiscussion } from '../../library/components/raga_components/RagaDetail/RagaDiscussion/RagaDiscussion';

export const RagaDetail = () => {
    const router = useRouter();
    const { supabase } = initSupabase();

    const [raga, setRaga] = useState<Raga | null>(null);
    const [loading, setLoading] = useState(true);

    const getRaga = async (ragaId: string) => {
        try {
            let { data, error } = await supabase
                .from('ragas')
                .select('*')
                .eq('id', ragaId)
                .single();
            if (error) {
                databaseErrorNotification(error);
            } else {
                setRaga(data);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        const ragaId = router.query.id;
        if (ragaId) {
            getRaga(ragaId as string);
        }
    }, [router.query.id]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (!raga) {
        return <p>Raga not found</p>;
    }

    return (
        <>
        <RagaContext.Provider value={raga}>
            <Container mt={16}>
                <RagaCard raga={raga} bookmarked={false} variant='header' />
                <Grid p={36} gutter={48}>
                    <Grid.Col span={5}>
                        <RagaScalePlayer/>
                    </Grid.Col>
                    <Grid.Col span={7}>
                        <RagaDescription/>
                    </Grid.Col>
                </Grid>
                <Box p={36}>
                    <RagaDiscussion/>
                </Box>
            </Container>
        </RagaContext.Provider>
        </>
    )
}

export default RagaDetail;
