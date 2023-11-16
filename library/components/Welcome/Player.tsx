import { ActionIcon, Anchor, AspectRatio, Box, Grid, Group, Image, Slider, Stack, Text } from '@mantine/core'
import React from 'react'
import useStyles from './Welcome.styles';
import { IconPlayerPlay, IconPlayerPlayFilled, IconPlayerTrackNext, IconPlayerTrackNextFilled, IconPlayerTrackPrev, IconPlayerTrackPrevFilled } from '@tabler/icons-react';

export const Player = () => {
    const { classes } = useStyles();
    return (
        <div>
            <Grid>
                <Grid.Col span={4}>
                    <Image className={classes.vinyl} src={'/artist-profiles/mssubu.jpeg'} radius={'100px'}/>
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
                            <Slider value={50} size={'sm'} />
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
