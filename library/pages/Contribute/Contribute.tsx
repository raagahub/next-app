import { Box, Container, Grid, Group, Image, Paper, Text, Title, UnstyledButton } from '@mantine/core';
import useStyles from './Contribute.styles'
import ShadowButton from '../../components/ui_components/ShadowButton';

export const ContributeComponent = () => {
    const { classes, theme } = useStyles();

    return (
        <div className={classes.container}>
            <Box>
                <Paper className={classes.banner}
                    sx={{ backgroundImage: `url('/geometric-patterns/6323198.jpg')`, backgroundColor: theme.colors['teal'][3] }} />
                <Grid className={classes.box} sx={{ backgroundColor: theme.colors['teal'][1] }} align='center'>
                    <Grid.Col sm={12} lg={5} >
                        <Image src={'/people-illustrations/sammy-line-meditation.png'} />
                    </Grid.Col>
                    <Grid.Col sm={12} lg={7} px={{ 'lg': 64 }}>
                        <Box className={classes.card} sx={{ backgroundColor: theme.colors['teal'][3] }}>
                            <Title className={classes.title} align="left" sx={{ color: theme.colors['teal'][9] }}>
                                For Rasikas
                            </Title>
                            <Text color="teal.9" align="left" size="lg" fw={500}>
                                a.k.a Enthusiasts, Learners, Teachers and Connoisseurs
                            </Text>
                        </Box>
                        <Group mt={32} w={{ 'lg': '90%', 'sm': '100%' }}>
                            <Text size={'xl'}>Whether you are a seasoned listener or new to Carnatic music, your insights and passion drive Ragahub's heartbeat. Share your favorite performances, create and curate playlists, and contribute insights and information that help others on their musical journey.</Text>
                            <ShadowButton color='teal' mt={8}>Become a Curator</ShadowButton>
                        </Group>
                    </Grid.Col>
                </Grid>

                <Paper className={classes.banner}
                    sx={{ backgroundImage: `url('/geometric-patterns/6323198.jpg')`, backgroundColor: theme.colors['violet'][3] }} />
                <Grid className={classes.box} sx={{ backgroundColor: theme.colors['violet'][1] }} align='center'>
                    <Grid.Col sm={12} lg={5} >
                        <Image src={'/people-illustrations/sammy-line-girl-updates-the-system-settings-of-the-computer.png'} />
                    </Grid.Col>
                    <Grid.Col sm={12} lg={7} px={{ 'lg': 64 }}>
                        <Box className={classes.card} sx={{ backgroundColor: theme.colors['violet'][3] }}>
                            <Title className={classes.title} align="left" sx={{ color: theme.colors['violet'][9] }}>
                                For Developers
                            </Title>
                            <Text color="violet.9" align="left" size="lg" fw={500}>
                                a.k.a Techies, Coders, Engineers, and Designers
                            </Text>
                        </Box>
                        <Group mt={32} w={{ 'lg': '90%', 'sm': '100%' }}>
                            <Text size={'xl'}>Lend your technical expertise to enhance Ragahub. Work on exciting projects at the intersection of technology and tradition, develop new features, or help us fine-tune our algorithms to better serve the Carnatic community.</Text>
                            <ShadowButton color='violet' mt={8}>Join the Dev Team</ShadowButton>
                        </Group>
                    </Grid.Col>
                </Grid>

                <Paper className={classes.banner}
                    sx={{ backgroundImage: `url('/geometric-patterns/6323198.jpg')`, backgroundColor: theme.colors['yellow'][3] }} />
                <Grid className={classes.box} sx={{ backgroundColor: theme.colors['yellow'][1] }} align='center'>
                    <Grid.Col sm={12} lg={5} >
                        <Image src={'/people-illustrations/Vasant Panchami Festival-cuate.png'} />
                    </Grid.Col>
                    <Grid.Col sm={12} lg={7} px={{ 'lg': 64 }}>
                        <Box className={classes.card} sx={{ backgroundColor: theme.colors['yellow'][3] }}>
                            <Title className={classes.title} align="left" sx={{ color: theme.colors['yellow'][9] }}>
                                For Artistes
                            </Title>
                            <Text color="yellow.9" align="left" size="lg" fw={500}>
                                a.k.a Musicians, Performers, Maestros and Labels
                            </Text>
                        </Box>
                        <Group mt={32} w={{ 'lg': '90%', 'sm': '100%' }}>
                            <Text size={'xl'}>Ragahub is a platform dedicated to artists who breathe life into Carnatic music. Whether you're a vocalist, instrumentalist, or composer, join us to reach a global audience, collaborate with other artists, and keep the tradition thriving.</Text>
                            <ShadowButton color='yellow' mt={8}>Share your Work</ShadowButton>
                        </Group>
                    </Grid.Col>
                </Grid>
            </Box>
        </div>
    )
}
