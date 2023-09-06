import { createStyles, Button, Stack, rem } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { CommentItem, Comment } from './Comment';
import { IconMessage2Plus } from '@tabler/icons-react'
import { CommentForm } from './CommentForm';
import { useContext, useEffect, useState } from 'react';
import { RagaContext } from '../../../../helpers/RagaHelpers';
import { initSupabase } from '../../../../helpers/SupabaseHelpers';
import { databaseErrorNotification } from '../../../../helpers/NotificationHelpers';


let data = require('./mockdata.json');

export const Discuss = () => {
  const raga = useContext(RagaContext)
  const { supabase, user } = initSupabase()

  const [showCommentForm, handlers] = useDisclosure(false);
  const [allComments, setComments] = useState<any[] | null>([])
  const [loading, setLoading] = useState(false)

  async function getAllComments() {
    setLoading(true)
    const { data, error, status } = await supabase
      .from('raga_comments')
      .select('*, profiles (full_name, username, avatar_url)')
      .eq('raga_id', raga.id)

    if (status == 200) {
      console.log(data)
      setComments(data)
      setLoading(false)
    }

    if (error) {
      setLoading(false)
      databaseErrorNotification(error)
    }
  }

  const comments = allComments?.map((comment: Comment) => (
    <CommentItem comment={comment} key={comment.comment_id}/>
  ))

  useEffect(() => {
    getAllComments()
  }, [raga]);

  return (
    <Stack mt={16}>
      {showCommentForm ? <CommentForm toggleClose={handlers.close} ragaId={raga.id} /> :
        <Button leftIcon={<IconMessage2Plus />} variant="light" color="gray" radius="lg" onClick={handlers.open}>Join</Button>
      }
      {loading ? "loading comments" : comments}
    </Stack>
  )
}
