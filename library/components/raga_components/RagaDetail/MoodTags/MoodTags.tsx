import { Badge, Button } from '@mantine/core';
import { IconMoodPlus } from '@tabler/icons-react';


export const getMoodTags = () => {
  return (
    [<Badge color="red">Uplifting</Badge>, <Badge color="green">Positive</Badge>, <Badge color="cyan">Dynamic</Badge>]
  )
}

export const AddMoodButton = () => {
    return (
        <Button leftIcon={<IconMoodPlus />} variant="light" color="gray" radius="lg" size="xs" compact>Add Mood</Button>
    )
}
