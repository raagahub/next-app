import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { initSupabase } from '../../components/SupabaseHelpers'
import { Box, Container, Button, Paper, Text, Title, useMantineColorScheme, Grid } from '@mantine/core';
import { databaseErrorNotification } from '../../components/NotificationHelpers'
import { Raga } from '../../components/RagaHelpers'
import { RagaCard } from '../../components/RagaCard/RagaCard';
import { RagaDescription } from '../../components/RagaDetail/RagaDescription';
import { RagaScalePlayer } from '../../components/RagaDetail/RagaScalePlayer';
import { RagaDiscussion } from '../../components/RagaDetail/RagaDiscussion/RagaDiscussion';

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
            <Container mt={16}>
                <RagaCard raga={raga} bookmarked={false} variant='header' />
                <Grid p={36} gutter={48}>
                    <Grid.Col span={5}>
                        <RagaScalePlayer raga={raga}/>
                    </Grid.Col>
                    <Grid.Col span={7}>
                        <RagaDescription raga={raga} />
                    </Grid.Col>
                </Grid>
                <Box p={36}>
                    <RagaDiscussion raga={raga}/>
                </Box>
            </Container>
        </>
    )
}

export default RagaDetail;
