import { ActionIcon, Anchor, Box, Grid, Group, Slider, Stack, Text } from '@mantine/core'
import React from 'react'
import useStyles from './Welcome.styles';
import { IconPlayerPlay, IconPlayerPlayFilled, IconPlayerTrackNext, IconPlayerTrackNextFilled, IconPlayerTrackPrev, IconPlayerTrackPrevFilled } from '@tabler/icons-react';
import Image from 'next/image';
import ms_profile from '../../../public/artist-profiles/mssubu.jpeg'

export const Player = () => {
    const { classes } = useStyles();
    return (
        <div>
            <Grid>
                <Grid.Col span={4}>
                    <Image 
                        className={classes.vinyl}
                        alt='artist_image'
                        src={ms_profile}
                        style={{
                            width: '100%',
                            height: 'auto',
                        }} />
                </Grid.Col>
                <Grid.Col span={8}>
                    <Stack align="center" mt={8} ml={16}>
                        <Box style={{ textAlign: 'center' }}>
                            <Text color="dark.6" size="xl" fw={700}>Rangapura Vihara</Text>
                            <Anchor href="https://en.wikipedia.org/wiki/Carnatic_music" size="lg">
                                M.S. Subbulakshmi
                            </Anchor>
                        </Box>
                        <Box w={'90%'}>
                            <Slider value={40} size={'sm'} showLabelOnHover={false} label={null} />
                        </Box>
                        <Group position="center">
                            <ActionIcon variant='outline' size={'xl'} color='raga-red.6' radius={'xl'}>
                                <IconPlayerTrackPrevFilled />
                            </ActionIcon>
                            <ActionIcon variant='outline' size={'xl'} color='raga-red.6' radius={'xl'}>
                                <IconPlayerPlayFilled />
                            </ActionIcon>
                            <ActionIcon variant='outline' size={'xl'} color='raga-red.6' radius={'xl'}>
                                <IconPlayerTrackNextFilled />
                            </ActionIcon>
                        </Group>
                    </Stack>
                </Grid.Col>
            </Grid>
        </div>
    )
}
