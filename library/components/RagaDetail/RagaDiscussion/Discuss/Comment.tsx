import { createStyles, Text, ActionIcon, Avatar, Button, Group, Grid, Stack, rem } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconCaretUp, IconCaretDown, IconMessage2 } from '@tabler/icons-react'
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { CommentForm } from './CommentForm';

dayjs.extend(relativeTime);

const useStyles = createStyles((theme) => ({
    body: {
        paddingTop: theme.spacing.sm,
    },
}));

export type Comment = {
    comment_id: string;
    parent_comment_id: string;
    created_at: string;
    content: string;
    raga_id: number;
    user_id: string;
    profiles: {
        full_name: string;
        username: string;
        avatar_url: string;
    };
}

export type CommentWithChildren = Comment & {
    children?: Comment[];
}

export type CommentThread = CommentWithChildren[]

interface CommentProps {
    comment: Comment;
    addNewComment: Function;
}

export function CommentItem({ comment, addNewComment }: CommentProps) {
    const { classes } = useStyles();

    const [showCommentForm, handlers] = useDisclosure(false);

    return (
        <>
            <Grid>
                <Grid.Col span={1}>
                    <Avatar src={comment.profiles.avatar_url} alt={comment.profiles.username} radius="md" />
                </Grid.Col>
                <Grid.Col span={10}>
                    <Stack spacing={0}>
                        <Text size="sm" fw={500}>@{comment.profiles.username}</Text>
                        <Text size="xs" color="dimmed">
                            {dayjs(comment.created_at).fromNow()}
                        </Text>
                        <Text className={classes.body} size="sm">
                            {comment.content}
                        </Text>
                        <Group mt={16}>
                            <Button leftIcon={<IconMessage2 />} variant="light" color="gray" radius="lg" size="xs" onClick={handlers.toggle} compact>Reply</Button>
                        </Group>
                        {showCommentForm && <CommentForm toggleClose={handlers.close} ragaId={comment.raga_id} addNewComment={addNewComment} parentCommentId={comment.parent_comment_id || comment.comment_id} />}
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