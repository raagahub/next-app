import { Box, Grid, Group, Paper, Text, Title } from '@mantine/core';
import useStyles from './Contribute.styles'
import ShadowButton from '../../components/ui_components/ShadowButton';
import useAuthModal from '../../hooks/useAuthModal';
import { useRouter } from 'next/navigation';
import { useUser } from '../../hooks/useUser';
import Image from 'next/image';
import listening_music from '../../../public/people-illustrations/sammy-line-meditation.png'
import coding from '../../../public/people-illustrations/sammy-line-girl-updates-the-system-settings-of-the-computer.png'
import saraswati from '../../../public/people-illustrations/Vasant Panchami Festival-cuate.png'

export const ContributeComponent = () => {
    const { classes, theme } = useStyles();
    const authModal = useAuthModal();
    const router = useRouter()
    const { user } = useUser();

    const handleBecomeCurator = () => {
        if (user) {
            router.push('/become-curator')
        } else {
            authModal.onOpen()
        }
    }

    return (
        <div className={classes.container}>
            <Box>
                <Paper className={classes.banner}
                    sx={{ backgroundImage: `url('/geometric-patterns/6323198.jpg')`, backgroundColor: theme.colors['teal'][3] }} />
                <Grid className={classes.box} sx={{ backgroundColor: theme.colors['teal'][1] }} align='center'>
                    <Grid.Col sm={12} lg={5} className={classes.imagebox}>
                        <Image alt='listening_music' 
                        src={listening_music} 
                        style={{
                            width: '100%',
                            height: 'auto',
                        }}/>
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
                            <ShadowButton color='teal' mt={8} onClick={() => handleBecomeCurator()}>Become a Curator</ShadowButton>
                        </Group>
                    </Grid.Col>
                </Grid>

                <Paper className={classes.banner}
                    sx={{ backgroundImage: `url('/geometric-patterns/6323198.jpg')`, backgroundColor: theme.colors['violet'][3] }} />
                <Grid className={classes.box} sx={{ backgroundColor: theme.colors['violet'][1] }} align='center'>
                    <Grid.Col sm={12} lg={5} className={classes.imagebox}>
                        <Image alt='coding' 
                        src={coding} 
                        style={{
                            width: '100%',
                            height: 'auto',
                        }}/>
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
                    <Grid.Col sm={12} lg={5} className={classes.imagebox}>
                        <Image alt='saraswati' 
                        src={saraswati} 
                        style={{
                            width: '100%',
                            height: 'auto',
                        }}/>
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
