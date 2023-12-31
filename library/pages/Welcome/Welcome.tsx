import { Title, Text, Anchor, Box, BackgroundImage, Flex, Card, Button, Grid, Group, Badge, rem, Stack, UnstyledButton, Divider, Space } from '@mantine/core';
import useStyles from './Welcome.styles';
import { Player } from './Player';
import { PlaylistCarousel } from './PlaylistCarousel';
import useAuthModal from '../../hooks/useAuthModal';
import { useUser } from '../../hooks/useUser';
import ShadowButton from '../../components/ui_components/ShadowButton';
import { IconCircleCheck } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';


export function Welcome() {
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
      <Grid>
        <Grid.Col sm={12} lg={5} >
          <Box className={classes.box} mt={{ 'sm': '0', 'lg': "100px" }} sx={{ backgroundImage: `url('/flat-sparkling-star-collection/star_icon_5.png')` }}>
            <Title className={classes.title} align="left">
              Experience
              <Text inherit className={classes['.highlight-box']}>
                Carnatic Music{' '}
              </Text>
              like never before
            </Title>
            <Group mt={16} w={'90%'}>
              <Text color="dark.8" align="left" size="xl">
                Our expertly curated performances, easy-to-use interface, and lively community invite you to delve into one of the world's oldest musical traditions.
              </Text>
              {user ? <ShadowButton color='teal'><IconCircleCheck size={20}/> You're on the waitlist</ShadowButton> : 
              <UnstyledButton mt={8} className={classes['.highlight-button']} onClick={authModal.onOpen}>Get Early Access</UnstyledButton>
              }
            </Group>
          </Box>
        </Grid.Col>
        <Grid.Col sm={12} lg={7}>
          <Stack>
            <Box className={classes.card} sx={{ backgroundColor: theme.colors['lime'][3], backgroundImage: `url('/flat-sparkling-star-collection/star_icon_2.png')` }}>
              <Text color="green.9" align="left" fw={700} style={{ fontSize: '24px' }}>
                <Text span fw={900} inherit>Ragahub</Text> is your portal into the world of{' '}
                <Anchor href='/about' inherit className={classes['.highlight-text']}>Carnatic music</Anchor>
              </Text>
            </Box>
            <Grid>
              <Grid.Col lg={8}>
                <Box className={classes.card} >
                  <PlaylistCarousel />
                  <Group position='apart' align='center' mt={16}>
                    <Text color="dark.8" align="left" size="xl" w={{'lg':'50%', 'sm':'100%'}}>
                      <Text span fw={700} inherit>Handcrafted playlists</Text> that broaden your knowledge and appreciation.
                    </Text>
                    <UnstyledButton className={classes['.highlight-button']} onClick={() => handleBecomeCurator()}>Become a Curator</UnstyledButton>
                  </Group>
                </Box>
              </Grid.Col>
              <Grid.Col lg={4}>
                <Box className={classes.card} sx={{ backgroundColor: theme.colors['violet'][3], backgroundImage: `url('/flat-sparkling-star-collection/star_icon_3.png')` }}>
                  <Text color="dark.8" align="left" size="xl">
                    Explore and discover music based on <Text span fw={700} inherit>ragas & moods</Text>.
                  </Text>
                  <Flex mt={'xl'} gap={'xs'} wrap={'wrap'}>
                    <Badge size='lg' variant='filled' color='teal.5'>Uplifting</Badge>
                    <Badge size='lg' variant='filled' color='orange.6'>Joy</Badge>
                    <Badge size='lg' color='gray.8'>Shanmukhapriya</Badge>
                    <Badge size='lg' variant='filled' color='indigo.6'>Melancholy</Badge>
                    <Badge size='lg' variant='filled' color='red.6'>Slow</Badge>
                    <Badge size='lg' color='gray.8'>Kamboji</Badge>
                  </Flex>
                </Box>
              </Grid.Col>
            </Grid>
            <Grid>
              <Grid.Col lg={4}>
                <Box className={classes.card} sx={{ backgroundColor: theme.colors['indigo'][3], backgroundImage: `url('/flat-sparkling-star-collection/3209906_drawn_finance_globe_hand_internet_icon.png')` }}>
                  <Text color="white" align="left" size="xl" mt={{'lg':'16', 'sm': '0'}}>
                    Connect with rasikas and artists <Text span fw={700} inherit>around the globe</Text>.
                  </Text>
                </Box>
              </Grid.Col>
              <Grid.Col lg={8}>
                <Box className={classes.card} sx={{ backgroundColor: theme.colors['yellow'][3], backgroundImage: `url('/flat-sparkling-star-collection/star_icon_4.png')` }}>
                  <Player />
                </Box>
              </Grid.Col>
            </Grid>
          </Stack>
        </Grid.Col>
      </Grid>
    </div>
  );
}
