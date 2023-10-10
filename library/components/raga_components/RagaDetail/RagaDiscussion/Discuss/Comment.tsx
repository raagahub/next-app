import { createStyles, Alert, Text, ActionIcon, Avatar, Button, Group, Grid, Stack, Modal, rem, TypographyStylesProvider, useMantineTheme } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconCaretUp, IconCaretDown, IconMessage2, IconShare, IconTrashX } from '@tabler/icons-react'
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { CommentForm } from './CommentForm';
import { initSupabase } from '../../../../../helpers/SupabaseHelpers';
import { useEffect, useState } from 'react';
import { databaseErrorNotification } from '../../../../../helpers/NotificationHelpers';
import { LinkPreview } from '../LinkPreview';
import ReactMarkdown from 'react-markdown'

dayjs.extend(relativeTime);
const extractUrls = require("extract-urls") //https://www.npmjs.com/package/extract-urls

// REFERENCE FOR THREADED COMMENTS: https://github.com/lawrencecchen/threaded-comments/tree/main

const useStyles = createStyles((theme) => ({
    body: {
        padding: 0,
        h1: {
            fontSize: "16px"
        },
        h2: {
            fontSize: "16px"
        },
        h3: {
            fontSize: "16px"
        }
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
    const theme = useMantineTheme();

    const [showCommentForm, handlers] = useDisclosure(false);

    const [voteCount, updateVoteCount] = useState(0)
    async function submitVote(value: number) {
        const { status, error } = await supabase
            .from('raga_comment_votes')
            .upsert([
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

    const [urls, updateUrls] = useState([])

    const [opened, { open, close }] = useDisclosure(false);
    const [loading, setLoading] = useState(false)
    const [deleted, setDeleted] = useState(false)
    async function deleteComment() {
        setLoading(true)
        const { status, error } = await supabase
            .from('raga_comments')
            .delete()
            .eq('comment_id', comment.comment_id)
        
        if (status == 204) {
            setLoading(false)
            setDeleted(true)
            close()
        }

        if (error) {
            databaseErrorNotification(error)
            setLoading(false)
            close()
        }
    }


    useEffect(() => {
        updateVoteCount(comment.raga_comment_votes.reduce((acc, val) => acc + val.value, 0))
        updateUrls(extractUrls(comment.content))
    }, [comment]);

    if (!deleted) {
        return (
            <>
                <Modal
                    opened={opened}
                    onClose={close}
                    withCloseButton={false}
                    radius={'md'}
                    overlayProps={{
                    color: theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2],
                    opacity: 0.55,
                    blur: 3,
                    }}
                >
                    <Stack px={8} mt={8} spacing={0}>
                        <Text fw={700}>Are you sure you want to delete your comment?</Text>
                        <Text c={'gray'} fz={'sm'}>This action cannot be undone.</Text>
                        <Group position='right' mt={24}>
                            <Button variant='filled' color={"raga-red.6"} loading={loading} onClick={() => deleteComment()}>Delete Comment</Button>
                            <Button variant='default' onClick={close}>Cancel</Button>
                        </Group>
                    </Stack>
                </Modal>
                <Grid>
                    <Grid.Col span={10}>
                        <Stack spacing={0}>
                            <Group spacing="xs" noWrap my={8}>
                                <Avatar size={16} src={comment.profiles.avatar_url} alt={comment.profiles.username} radius="md"/>
                                <Text size="xs">{comment.profiles.username}</Text>
                                <Text size="xs"> • </Text>
                                <Text size="xs" color="dimmed">{dayjs(comment.created_at).fromNow()}</Text>
                            </Group>
                            <Text className={classes.body}>
                                <ReactMarkdown>
                                    {comment.content}
                                </ReactMarkdown>
                            </Text>
                            {urls && urls.map((url) => (
                                <LinkPreview url={url}/>
                            ))}
                            <Group my={16}>
                                <Button leftIcon={<IconMessage2 />} variant="light" color="gray" radius="lg" size="xs" onClick={handlers.toggle} compact>Reply</Button>
                                <Button leftIcon={<IconShare />} variant="light" color="gray" radius="lg" size="xs" compact>Share</Button>
                                {user?.id == comment.user_id && 
                                <Button leftIcon={<IconTrashX />} variant="light" color="red" radius="lg" size="xs" compact onClick={open}>Delete</Button>
                                }
                            </Group>
                            {showCommentForm && <CommentForm toggleClose={handlers.close} ragaId={comment.raga_id} addNewComment={addNewComment} parentCommentId={comment.parent_comment_id || comment.comment_id} />}
                        </Stack>
                    </Grid.Col>
                    <Grid.Col span={2}>
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
    } else {
        return (
            <Alert icon={<IconTrashX size="1rem" />} color="red" radius={'md'}>Comment Deleted</Alert>
        )
    }

}