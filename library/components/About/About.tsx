import { Box, Container, Grid, Group, Image, Paper, Stack, Text, Title, UnstyledButton } from '@mantine/core';
import useStyles from './About.styles'
import ShadowButton from '../ui_components/ShadowButton';

export const AboutComponent = () => {
    const { classes, theme } = useStyles();

    return (
        <div className={classes.container}>
            <Paper
                shadow="md"
                p="0"
                radius="md"
                sx={{ backgroundImage: `url('/geometric-patterns/6323198.jpg')`, backgroundColor: theme.colors['raga-red'][3] }}
                className={classes.banner}
            />
            <Grid className={classes.box} align='center' >
                <Grid.Col sm={12} lg={6} px={{ 'lg': 64, 'sm': '16px' }} py={{ 'lg': 16, 'sm': 64 }} >
                    <Image src={'/people-illustrations/carnatic_music_performers.png'} />
                </Grid.Col>
                <Grid.Col sm={12} lg={6} px={{ 'lg': 64 }}>
                    <Box>
                        <Title order={3} className={classes.title} sx={{ color: theme.colors['raga-red'][6] }}>
                            Premier destination for{' '}
                            <Text inherit color='dark.8'>
                                Rasikas around the world
                            </Text>
                        </Title>
                    </Box>
                    <Group mt={8} spacing={'xl'} className={classes.textcontainer}>
                        <Text size={'xl'} mt={16} className={classes.bodytext}>Ragahub's purpose is to make it easy to discover, listen to, and learn about Carnatic music, offering curated playlists, live performances, and educational content for both aficionados and newcomers to the genre.</Text>
                        <ShadowButton color='red' mt={8}>Get Early Access</ShadowButton>
                    </Group>
                    <Box className={classes.shapebox} sx={{ maskImage: `url('/flat-sparkling-star-collection/star_icon.png')`, backgroundImage: `url('/grainy-gradients/grainy gradients - saintricchi.store/grainy gradients - saintricchi.store (3).jpg')`}}/>
                </Grid.Col>
            </Grid>
        </div>
    )
}
