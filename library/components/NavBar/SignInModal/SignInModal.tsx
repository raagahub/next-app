import { useDisclosure, useToggle, upperFirst } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { useForm, isEmail } from '@mantine/form';
import {
    Alert,
    Anchor,
    Button,
    ButtonProps,
    Checkbox,
    Divider,
    Group,
    LoadingOverlay,
    Modal,
    PasswordInput,
    Stack,
    Text,
    TextInput,
} from '@mantine/core';
import { useState } from 'react';
import { GoogleIcon } from './GoogleIcon'
import { FacebookIcon } from './FacebookIcon'
import { IconAlertCircle, IconCheck } from '@tabler/icons-react';
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { registrationSuccessNotification } from '../../../helpers/NotificationHelpers'

export interface SignInModalProps {
    opened: boolean;
    close: () => void;
}

export function SignInModal({ opened, close }: SignInModalProps) {
    const supabase = useSupabaseClient()
    const [loading, setLoading] = useState(false)
    const [authError, updateAuthError] = useState({title: "", message: ""})

    const [type, toggle] = useToggle(['login', 'register']);
    const form = useForm({
        validateInputOnBlur: true,

        initialValues: {
            name: { first: '', last: '' },
            email: '',
            password: '',
            terms: false,
        },

        validate: {
            email: isEmail('Invalid email'),
            password: (val: string) => (val.length <= 6 ? 'Password should include at least 6 characters' : null),
        },
    });

    async function handleGoogleAuth() {
        try {
            setLoading(true)
            const { data, error } = await supabase.auth.signInWithOAuth({
                provider: 'google',
              })
            console.log(data)
        } catch (error) {
            console.log(error)
        }
    }

    async function handleFacebookAuth() {
        try {
            setLoading(true)
            const { data, error } = await supabase.auth.signInWithOAuth({
                provider: 'facebook',
              })
            console.log(data)
        } catch (error) {
            console.log(error)
        }
    }

    async function handleSubmit() {
        if (type === 'register') {
            try {
                setLoading(true)
                const { data, error } = await supabase.auth.signUp({
                    email: form.values.email,
                    password: form.values.password,
                    options: {
                        data: {
                            full_name: form.values.name.first + " " + form.values.name.last
                        }
                    }
                })
                console.log(data)
                console.log("supabase error", error)
                if (error) {
                    setLoading(false)
                    updateAuthError({title: error.name, message: error.message})
                } else {
                    setLoading(false)
                    close()
                    updateAuthError({title: "", message: ""})
                    registrationSuccessNotification()
                }
            } catch (error) {
                console.log(error)
            }

        } else if (type === 'login') {
            try {
                setLoading(true)
                const { data, error } = await supabase.auth.signInWithPassword({
                    email: form.values.email,
                    password: form.values.password,
                })
                console.log(data)
                console.log("supabase error", error)
                if (error) {
                    setLoading(false)
                    updateAuthError({title: error.name, message: error.message})
                } else {
                    setLoading(false)
                    close()
                    updateAuthError({title: "", message: ""})
                    notifications.show({
                        title: 'Sign In Successful',
                        message: `Welcome Back, ${"arma"}`,
                        color: "teal",
                        icon: <IconCheck size="1.1rem" />
                    })
                }
            } catch (error) {
                console.log(error)
            }
        }
    }

    return (
        <>
            <Modal opened={opened} onClose={close} withCloseButton={false} size={"md"} padding={"xl"} radius={"md"} centered>
                <LoadingOverlay visible={loading} overlayBlur={2} />
                <Text size="xl" weight={500}>
                    Welcome to <Text weight={700} variant="gradient" component="span">RaagaHub</Text>, {type} with
                </Text>

                <Group grow mb="md" mt="md">
                    <Button 
                    leftIcon={<GoogleIcon />} 
                    variant="default" 
                    color="gray" 
                    radius={"md"} 
                    onClick={() => handleGoogleAuth()}
                    >Google</Button>
                    <Button
                        leftIcon={<FacebookIcon />}
                        sx={(theme) => ({
                            backgroundColor: '#4267B2',
                            color: '#fff',
                            '&:not([data-disabled]):hover': {
                                backgroundColor: theme.fn.darken('#4267B2', 0.1),
                            },
                        })}
                        radius={"md"}
                        onClick={() => handleFacebookAuth()}
                    >Facebook</Button>
                </Group>

                <Divider label="Or continue with email" labelPosition="center" my="lg" />

                <form onSubmit={form.onSubmit(() => { handleSubmit() })}>
                    <Stack>
                        {type === 'register' && (
                            <Group grow>
                                <TextInput
                                    required
                                    label="First Name"
                                    placeholder="Abhishek"
                                    value={form.values.name.first}
                                    onChange={(event) => form.setFieldValue('name.first', event.currentTarget.value)}
                                    radius="md"
                                />
                                <TextInput
                                    label="Last Name"
                                    placeholder="Narayanan"
                                    value={form.values.name.last}
                                    onChange={(event) => form.setFieldValue('name.last', event.currentTarget.value)}
                                    radius="md"
                                />

                            </Group>
                        )}

                        <TextInput
                            required
                            label="Email"
                            placeholder="hello@email.com"
                            value={form.values.email}
                            onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
                            onBlur={() => form.validateField('email')}
                            error={form.errors.email && 'Invalid email'}
                            radius="md"
                        />

                        <PasswordInput
                            required
                            label="Password"
                            placeholder="At least 6 characters"
                            value={form.values.password}
                            onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
                            onBlur={() => form.validateField('password')}
                            error={form.errors.password && 'Password should include at least 6 characters'}
                            radius="md"
                        />

                        {type === 'register' && false && (
                            <Checkbox
                                label="I accept terms and conditions"
                                checked={form.values.terms}
                                onChange={(event) => form.setFieldValue('terms', event.currentTarget.checked)}
                            />
                        )}
                    </Stack>

                    {authError.title && 
                        <Alert icon={<IconAlertCircle size="1rem"/>} title={`Error - ${authError.title}`} color="red" mt={20}>
                            {authError.message}
                        </Alert>
                    }

                    <Group position="apart" mt="xl">
                        <Anchor
                            component="button"
                            type="button"
                            color="dimmed"
                            onClick={() => toggle()}
                            size="xs"
                        >
                            {type === 'register'
                                ? 'Already have an account? Login'
                                : "Don't have an account? Register"}
                        </Anchor>
                        <Button type="submit">
                            {upperFirst(type)}
                        </Button>
                    </Group>
                </form>
            </Modal>
        </>
    );
}