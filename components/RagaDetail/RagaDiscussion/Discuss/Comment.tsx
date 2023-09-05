import { createStyles, Text, ActionIcon, Avatar, Button, Group, Grid, Stack, rem } from '@mantine/core';
import { IconCaretUp, IconCaretDown, IconMessage2} from '@tabler/icons-react'

const useStyles = createStyles((theme) => ({
    body: {
        paddingTop: theme.spacing.sm,
    },
}));

export type Comment = {
    postedAt: string;
    body: string;
    author: {
        name: string;
        image: string;
    };
}

interface CommentProps {
    comment: Comment
}

export function CommentItem({ comment }: CommentProps) {
    const { classes } = useStyles();
    return (
        <>
            <Grid>
                <Grid.Col span={1}>
                    <Avatar src={comment.author.image} alt={comment.author.name} radius="md" />
                </Grid.Col>
                <Grid.Col span={10}>
                    <Stack spacing={0}>
                        <Text size="sm">{comment.author.name}</Text>
                        <Text size="xs" color="dimmed">
                            {comment.postedAt}
                        </Text>
                        <Text className={classes.body} size="sm">
                            {comment.body}
                        </Text>
                        <Group mt={16}>
                            <Button leftIcon={<IconMessage2 />} variant="light" color="gray" radius="lg" size="xs" compact>Reply</Button>
                        </Group>
                    </Stack>
                </Grid.Col>
                <Grid.Col span={1}>
                    <Stack spacing={0} align="center">
                    <ActionIcon size="lg">
                        <IconCaretUp size="1.625rem" />
                    </ActionIcon>
                    <Text size={'sm'} color='dimmed'>231</Text>
                    <ActionIcon size="lg">
                        <IconCaretDown size="1.625rem" />
                    </ActionIcon>
                    </Stack>
                </Grid.Col>
            </Grid>
        </>
    );
}