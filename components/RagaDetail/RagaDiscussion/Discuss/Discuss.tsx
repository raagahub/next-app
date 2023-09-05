import { createStyles, Button, Stack, rem } from '@mantine/core';
import { CommentItem, Comment } from './Comment';
import { IconMessage2Plus} from '@tabler/icons-react'

let data = require('./mockdata.json');

export const Discuss = () => {
  const comments = data.map((comment: Comment) => (
    <CommentItem comment={comment} />
  ))
  return (
    <Stack mt={16}>
      <Button leftIcon={<IconMessage2Plus />} variant="light" color="gray" radius="lg">Join</Button>
      {comments}
    </Stack>
  )
}
