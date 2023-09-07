import { createStyles, Text, ActionIcon, Avatar, Button, Group, Grid, Stack, rem } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconCaretUp, IconCaretDown, IconMessage2, IconShare } from '@tabler/icons-react'
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { CommentForm } from './CommentForm';
import { initSupabase } from '../../../../helpers/SupabaseHelpers';
import { useEffect, useState } from 'react';
import { databaseErrorNotification } from '../../../../helpers/NotificationHelpers';

dayjs.extend(relativeTime);

// REFERENCE FOR THREADED COMMENTS: https://github.com/lawrencecchen/threaded-comments/tree/main

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
    raga_comment_votes: [{
        value: number
    }]
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
    const { supabase, user } = initSupabase()

    const [showCommentForm, handlers] = useDisclosure(false);

    const [voteCount, updateVoteCount] = useState(0)

    async function submitVote(value: number) {
        const { status, error } = await supabase
            .from('raga_comment_votes')
            .insert([
                {
                    user_id: user?.id,
                    comment_id: comment.comment_id,
                    value: value
                },
            ])

        if (status == 201) {
            updateVoteCount(voteCount + value)
        }

        if (error) {
            databaseErrorNotification(error)
        }

    }

    useEffect(() => {
        updateVoteCount(comment.raga_comment_votes.reduce((acc, val) => acc + val.value, 0))
    }, [comment]);

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
                        <Group my={16}>
                            <Button leftIcon={<IconMessage2 />} variant="light" color="gray" radius="lg" size="xs" onClick={handlers.toggle} compact>Reply</Button>
                            <Button leftIcon={<IconShare />} variant="light" color="gray" radius="lg" size="xs" compact>Share</Button>
                        </Group>
                        {showCommentForm && <CommentForm toggleClose={handlers.close} ragaId={comment.raga_id} addNewComment={addNewComment} parentCommentId={comment.parent_comment_id || comment.comment_id} />}
                    </Stack>
                </Grid.Col>
                <Grid.Col span={1}>
                    <Stack spacing={0} align="center">
                        <ActionIcon size="lg" onClick={() => submitVote(1)}>
                            <IconCaretUp size="1.625rem" />
                        </ActionIcon>
                        <Text size={'sm'} color='dimmed'>{voteCount}</Text>
                        <ActionIcon size="lg" onClick={() => submitVote(-1)}>
                            <IconCaretDown size="1.625rem" />
                        </ActionIcon>
                    </Stack>
                </Grid.Col>
            </Grid>
        </>
    );
}