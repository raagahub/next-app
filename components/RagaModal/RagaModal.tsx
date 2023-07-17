import {
    createStyles,
    ActionIcon,
    Group,
    Modal,
    Text,
    Stack,
    Badge,
    rem,
    Box,
} from '@mantine/core';
import { IconPlayerPlay, IconHeart, IconBookmark, IconShare } from '@tabler/icons-react'
import { RagaCardProps } from '../RagaCard/RagaCard'
import SwaraGradient from '../SwaraGradient/SwaraGradient';
import { swaraNoteMap } from '../SwaraMapping'
import Tone from '../Tone'

const useStyles = createStyles((theme) => ({
    modal: {
        [theme.fn.smallerThan('md')]: {
            width: '100%'
          },
    },
}));

export function RagaModal({raga}: RagaCardProps) {
    const { classes, theme } = useStyles();

    // start global Transport
    Tone.Transport.bpm.value = 75
    Tone.Transport.start();
    // create synth instrument
    const synth = new Tone.MonoSynth().toDestination();
    const noteDuration = 0.5

    function notesToTime(notecount: number) {
        const bpm = Tone.Transport.bpm.value
        const timePerBeat = 60/bpm
        return notecount*timePerBeat*noteDuration
    }

    function formatNoteList(noteList: string[], scaleType: string) {
        if (scaleType == "arohanam") {
            noteList[noteList.length - 1] = "C5"
        } else if (scaleType == "avarohanam") {
            noteList[0] = "C5"
        }
        return noteList
    }

    function playSwaras(swaras: string, scaleType: string) {
        let swaraList = swaras.split(' ')
        let noteList = swaraList.map(swara => swaraNoteMap.get(swara))
        let formatNotes = formatNoteList(noteList, scaleType)
        console.log(formatNotes)
        let seq = new Tone.Sequence((time, note) => {
            synth.triggerAttackRelease(note, noteDuration, time);
            // subdivisions are given as subarrays
        }, noteList).start(Tone.now());
        seq.stop(Tone.now() + (notesToTime(noteList.length)))
    }
    
    return (
        <Box className='modal'>
            <Group position="apart">
                <Text fz="lg" fw={700} mr={16}>
                    {raga.format_name}
                </Text>
                <Group spacing={0}>
                    <ActionIcon>
                        <IconHeart size="1.2rem" color={theme.colors.red[6]} stroke={1.5} />
                    </ActionIcon>
                    <ActionIcon>
                        <IconBookmark size="1.2rem" color={theme.colors.yellow[6]} stroke={1.5} />
                    </ActionIcon>
                    <ActionIcon>
                        <IconShare size="1.2rem" color={theme.colors.blue[6]} stroke={1.5} />
                    </ActionIcon>
                </Group>
            </Group>
            <Stack my="lg" spacing="lg">
                <div>
                    <Text fz="xs" c="dimmed">
                        Arohanam:
                    </Text>
                    <Group position="apart">
                        <Text fw={500}>{raga.arohanam}</Text>
                        <ActionIcon variant="outline" color='blue' onClick={() => playSwaras(raga.arohanam, "arohanam")}>
                            <IconPlayerPlay size="1.2rem" stroke={1.5} />
                        </ActionIcon>
                    </Group>
                </div>
                <div>
                    <Text fz="xs" c="dimmed">
                        Avarohanam:
                    </Text>
                    <Group position="apart">
                        <Text fw={500}>{raga.avarohanam}</Text>
                        <ActionIcon variant="outline" color='blue' onClick={() => playSwaras(raga.avarohanam, "avarohanam")}>
                            <IconPlayerPlay size="1.2rem" stroke={1.5} />
                        </ActionIcon>
                    </Group>
                </div>
            </Stack>
            <SwaraGradient raga={raga} />
            <Group mt="lg">
            {raga.is_janaka ? 
                <Badge variant="gradient" gradient={{ from: '#ed6ea0', to: '#ec8c69', deg: 35 }}>MELAKARTA RAAGA</Badge> : 
                <Badge>JANYA RAAGA</Badge>}
            </Group>
        </Box>
    )
}