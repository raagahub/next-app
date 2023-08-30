import { Button, Group, Text } from '@mantine/core';
import { RagaDescriptionProps } from './RagaDetailProps';
import { IconEdit } from '@tabler/icons-react';
import dayjs from 'dayjs';

export const RagaDescription = ({ raga }: RagaDescriptionProps) => {
    var now = dayjs()
    return (
        <>
            <Text>{raga.format_name} is a ragam in Carnatic music (musical scale of South Indian classical music). It is the 56th melakarta rāgam (parent scale) in the 72 melakarta rāgam system of Carnatic music. It is called Chāmaram in Muthuswami Dikshitar school of Carnatic music.[1][2] It is said to be borrowed into Hindustani music from Carnatic music.[2] Many compositions on Lord Murugan and Lord Shiva are based on this raaga. </Text>
            <Group position='apart' mt={32}>
                <Button leftIcon={<IconEdit />} variant="light" color="gray" radius="lg" size="xs" compact>Edit Description</Button>
                <Text fz="xs" c="dimmed">Last Updated {now.toString()}</Text>
            </Group>
        </>
    )
}
