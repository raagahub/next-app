import { ActionIcon, Group, Image, Stack, Text } from '@mantine/core'
import { IconPlayerPlay } from '@tabler/icons-react'
import { RagaScalePlayerProps } from './RagaDetailProps'
import { Swara, swaraNoteMap } from '../SwaraHelpers'
import Tone from '../Tone'

export const RagaScalePlayer = ({ raga }: RagaScalePlayerProps) => {
    // start global Transport
    Tone.Transport.bpm.value = 75
    Tone.Transport.start();
    // create synth instrument
    const synth = new Tone.MonoSynth().toDestination();
    const noteDuration = 0.5

    const notesToTime = (notecount: number) => {
        const bpm = Tone.Transport.bpm.value
        const timePerBeat = 60/bpm
        return notecount*timePerBeat*noteDuration
    }

    const formatNoteList = (noteList: string[], scaleType: string) => {
        if (scaleType == "arohanam") {
            noteList[noteList.length - 1] = "C5"
        } else if (scaleType == "avarohanam") {
            noteList[0] = "C5"
        }
        return noteList
    }

    const playSwaras = (swaras: string, scaleType: string) => {
        let swaraList: Swara[] = swaras.split(' ') as Swara[];
        const noteList: string[] = swaraList.map(swara => swaraNoteMap.get(swara)!);
        let formatNotes = formatNoteList(noteList, scaleType)
        console.log(formatNotes)
        let seq = new Tone.Sequence((time, note) => {
            synth.triggerAttackRelease(note, noteDuration, time);
            // subdivisions are given as subarrays
        }, noteList).start(Tone.now());
        seq.stop(Tone.now() + (notesToTime(noteList.length)))
    }

    return (
        <>
            <Image src={"/piano.png"} />
            <Stack my="lg" spacing="xs">
                <div>
                    <Text fz="xs" c="dimmed">
                        Arohanam:
                    </Text>
                    <Group position="apart">
                        <Text fw={500}>{raga.arohanam}</Text>
                        <ActionIcon variant="subtle" color='dark' onClick={() => playSwaras(raga.arohanam, "arohanam")}>
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
                        <ActionIcon variant="subtle" color='dark' onClick={() => playSwaras(raga.avarohanam, "avarohanam")}>
                            <IconPlayerPlay size="1.2rem" stroke={1.5} />
                        </ActionIcon>
                    </Group>
                </div>
            </Stack>
        </>
    )
}
