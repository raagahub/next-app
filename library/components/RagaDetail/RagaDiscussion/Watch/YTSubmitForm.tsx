import { useState } from "react";
import { initSupabase } from "../../../../helpers/SupabaseHelpers";
import { databaseErrorNotification } from "../../../../helpers/NotificationHelpers";
import { Button, Group, TextInput, Textarea } from "@mantine/core";
import { useForm } from '@mantine/form';
import { youtubeIdRegExp, youtubeRegExp } from "../../../../helpers/UrlHelpers";

export interface YTSubmitFormProps {
    toggleClose: () => void;
    ragaId: number;
    addVideo: Function;
}

export const YTSubmitForm = ({ toggleClose, ragaId, addVideo }: YTSubmitFormProps) => {
    const [loading, setLoading] = useState(false)
    const { supabase, user } = initSupabase()

    const form = useForm({
        initialValues: {
            youtubeLink: ''
        },

        validate: {
            youtubeLink: (value) => (youtubeRegExp.test(value) ? null : 'Invalid Youtube Link'),
        },
    });

    function getVideoId(url: string) {
        const match = url.match(youtubeIdRegExp);
        console.log("getIdregex", match)
        return (match && match[7].length === 11)
            ? match[7]
            : null;
    }

    async function submitYTLink() {
        setLoading(true)
        const { data, status, error } = await supabase
            .from('raga_videos')
            .insert([
                {
                    user_id: user?.id,
                    raga_id: ragaId,
                    video_url: form.values.youtubeLink,
                    youtube_video_id: getVideoId(form.values.youtubeLink)
                },
            ])
            .select('*, profiles (full_name, username, avatar_url)')
            .single()

        if (status == 201 && data) {
            console.log("addYTLink", data)
            addVideo(data as Comment[])
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
            <form onSubmit={form.onSubmit((values) => submitYTLink())}>
                <TextInput
                    placeholder="Share a Youtube link"
                    {...form.getInputProps('youtubeLink')}
                />
                <Group position='right' mt={16}>
                    <Button variant='filled' loading={loading} type="submit">Add to Playlist</Button>
                    <Button variant='default' onClick={toggleClose}>Cancel</Button>
                </Group>
            </form>
        </div>
    )
}
