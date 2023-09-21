import { createStyles, Button, Stack, rem } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { CommentItem, Comment, CommentThread, CommentWithChildren } from './Comment';
import { IconMessage2Plus } from '@tabler/icons-react'
import { CommentForm } from './CommentForm';
import { useContext, useEffect, useState } from 'react';
import { RagaContext } from '../../../../../helpers/RagaHelpers';
import { initSupabase } from '../../../../../helpers/SupabaseHelpers';
import { databaseErrorNotification } from '../../../../../helpers/NotificationHelpers';


// let data = require('./mockdata.json');

function createCommentThread(comments: Comment[]): CommentThread {
  const commentThread: CommentThread = [];
  const repliesMap: { [parentCommentId: string]: Comment[] } = {};

  comments.forEach((comment) => {
    if (comment.parent_comment_id === null) {
      // Top-level comment
      commentThread.push(comment as CommentWithChildren);
    } else {
      // Reply, add it to the replies map
      if (!repliesMap[comment.parent_comment_id]) {
        repliesMap[comment.parent_comment_id] = [];
      }
      repliesMap[comment.parent_comment_id].push(comment);
    }
  });

  // Attach replies to their parent comments
  commentThread.forEach((comment) => {
    comment.children = repliesMap[comment.comment_id] || [];
  });

  return commentThread;
}


export const Discuss = () => {
  const raga = useContext(RagaContext)
  const { supabase, user } = initSupabase()

  const [showCommentForm, handlers] = useDisclosure(false);
  const [commentThread, setCommentThread] = useState<Comment[]>([])
  const [loading, setLoading] = useState(false)

  async function getAllComments() {
    setLoading(true)
    const { data, error, status } = await supabase
      .from('raga_comments')
      .select('*, profiles!raga_comments_user_id_fkey (full_name, username, avatar_url), raga_comment_votes (value)')
      .eq('raga_id', raga.id)

    if (status == 200) {
      console.log(data)
      setCommentThread(createCommentThread(data as Comment[]))
      setLoading(false)
    }

    if (error) {
      setLoading(false)
      databaseErrorNotification(error)
    }
  }

  const addNewComment = (newComment: Comment) => {
    setCommentThread((prevThread) => {
      if (!newComment.parent_comment_id) {
        // If there's no parentCommentId, it's a top-level comment
        return [...prevThread, newComment];
      }

      // Find the parent comment in the thread
      const updatedThread = prevThread.map((comment: CommentWithChildren) => {
        if (comment.comment_id === newComment.parent_comment_id) {
          // Add the new comment as a child of the parent
          return {
            ...comment,
            children: [...(comment.children || []), newComment],
          };
        }
        return comment;
      });

      return updatedThread;
    });
  };

  const comments = commentThread?.map((comment: CommentWithChildren) => {
    if (comment.children) {
      const childComments = comment.children.map((childComment: Comment) => (
        <CommentItem comment={childComment} key={childComment.comment_id} addNewComment={addNewComment}/>
      ))
      return (
        <>
          <CommentItem comment={comment} key={comment.comment_id} addNewComment={addNewComment}/>
          <Stack ml={64}>
            {childComments}
          </Stack>
        </>
      )
    } else {
      return (
        <CommentItem comment={comment} key={comment.comment_id} addNewComment={addNewComment}/>
      )
    }
  })

  useEffect(() => {
    getAllComments()
  }, [raga]);

  return (
    <Stack mt={16}>
      {showCommentForm ? <CommentForm toggleClose={handlers.close} ragaId={raga.id} addNewComment={addNewComment}/> :
        <Button leftIcon={<IconMessage2Plus />} variant="light" color="gray" radius="lg" onClick={handlers.open}>Join</Button>
      }
      {loading ? "loading comments" : comments}
    </Stack>
  )
}
