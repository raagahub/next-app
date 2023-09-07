import { Button, Group, Stack, Textarea } from '@mantine/core'
import { notifications } from '@mantine/notifications';
import { useForm, isEmail } from '@mantine/form';
import { useState } from 'react';
import { initSupabase } from '../../../../helpers/SupabaseHelpers';
import { Raga } from '../../../../helpers/RagaHelpers';
import { databaseErrorNotification } from '../../../../helpers/NotificationHelpers';

export interface CommentFormProps {
    toggleClose: () => void;
    ragaId: number;
    parentCommentId?: string | null;
    addNewComment: Function;
}

export const CommentForm = ({ toggleClose, ragaId, addNewComment, parentCommentId = null }: CommentFormProps) => {
    const [commentVal, setComment] = useState('')
    const [loading, setLoading] = useState(false)
    const { supabase, user } = initSupabase()

    async function submitComment() {
        setLoading(true)
        const { data, status, error } = await supabase
            .from('raga_comments')
            .insert([
                {   user_id: user?.id, 
                    raga_id: ragaId, 
                    content: commentVal,
                    parent_comment_id: parentCommentId
                },
            ])
            .select('*, profiles (full_name, username, avatar_url)')
            .single()
        
        if (status == 201 && data) {
            console.log("addNewComment", data)
            addNewComment(data as Comment[])
            setLoading(false)
            toggleClose()
        }

        if (error) {
            setLoading(false)
            databaseErrorNotification(error)
        }
    }

    return (
        <div>
            <Textarea
                placeholder="Share your thoughts, opinions and relevant links"
                autosize
                minRows={3}
                value={commentVal}
                onChange={(event) => setComment(event.currentTarget.value)}
                
            />
            <Group position='right' mt={16}>
                <Button variant='filled' loading={loading} onClick={() => submitComment()}>Add to Discussion</Button>
                <Button variant='default' onClick={toggleClose}>Cancel</Button>
            </Group>
        </div>
    )
}
