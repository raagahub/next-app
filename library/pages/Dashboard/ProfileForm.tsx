import { useState, useEffect } from 'react';
import { useSupabaseClient, useUser, useSession } from '@supabase/auth-helpers-react';
import { useForm, isEmail } from '@mantine/form';
import {
    Alert,
    Anchor,
    Button,
    Center,
    Container,
    Divider,
    Grid,
    Group,
    Image,
    PasswordInput,
    Stack,
    Text,
    TextInput,
    Title,
    useMantineColorScheme
} from '@mantine/core';
import { initSupabase } from '../../helpers/SupabaseHelpers'

export const ProfileForm = () => {
    const { colorScheme, toggleColorScheme } = useMantineColorScheme();
    const dark = colorScheme === 'dark';
    const { supabase, user } = initSupabase()

    const [loading, setLoading] = useState(true)
    const [avatar_url, setAvatarUrl] = useState<string | null>(null)

    const form = useForm({
        initialValues: {
            full_name: '',
            username: '',
            website: '',
        },

        validate: {
            username: (val: string) => (val.length <= 3 ? 'Username should include at least 3 characters' : null),
        },
    });

    const getProfile = async () => {
        try {
            setLoading(true)

            let { data, error } = await supabase
                .from('profiles')
                .select(`full_name, username, website, avatar_url`)
                .eq('id', user?.id)
                .single()

            if (error) {
                throw error
            }

            if (data) {
                form.setValues(
                    {
                        full_name: data.full_name,
                        username: data.username,
                        website: data.website,
                    }
                )
                setAvatarUrl(data.avatar_url)
            }
        } catch (error) {
            alert('Error loading user data!')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getProfile()
    }, [user])

    async function updateProfile() {
        try {
            setLoading(true)

            let { error } = await supabase.from('profiles').upsert({
                id: user?.id as string,
                avatar_url,
                updated_at: new Date().toISOString(),
                ...form.values
            })
            if (error) throw error
            alert('Profile updated!')
        } catch (error) {
            alert('Error updating the data!')
        } finally {
            setLoading(false)
        }
    }

    return (
        <Container>
            <Grid justify="center">
                <Grid.Col span={3}>
                    <Stack mt={16} spacing={4}>
                        <Image mx="auto" radius="md" src={avatar_url} alt="profile_image" />
                        <Button size="xs" variant={"default"}>Edit Image</Button>
                    </Stack>
                </Grid.Col>
                <Grid.Col span={9} pl={64}>
                    <form onSubmit={form.onSubmit(() => { updateProfile() })}>
                        <Stack>
                            <TextInput
                                required
                                label="Full Name"
                                placeholder="Abhishek Narayanan"
                                value={form.values.full_name}
                                onChange={(event) => form.setFieldValue('fullname', event.currentTarget.value)}
                                radius="md"
                            />

                            <TextInput
                                label="Username"
                                placeholder="@raagahub"
                                value={form.values.username}
                                onChange={(event) => form.setFieldValue('username', event.currentTarget.value)}
                                radius="md"
                            />

                            <TextInput
                                label="Website"
                                placeholder="https://mysite.com"
                                value={form.values.website}
                                onChange={(event) => form.setFieldValue('website', event.currentTarget.value)}
                                radius="md"
                            />

                            <Button type="submit" variant='outline'>
                                Save Changes
                            </Button>
                        </Stack>

                    </form>
                </Grid.Col>
            </Grid>

        </Container>
    )
}
