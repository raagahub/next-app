import { useDisclosure, useToggle, upperFirst } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { useForm, isEmail } from '@mantine/form';
import {
    Alert,
    Anchor,
    Button,
    Checkbox,
    Divider,
    Group,
    LoadingOverlay,
    Modal,
    Paper,
    PasswordInput,
    Stack,
    Text,
    TextInput,
} from '@mantine/core';
import { useEffect, useState } from 'react';
import { GoogleIcon } from './GoogleIcon'
import { FacebookIcon } from './FacebookIcon'
import { IconAlertCircle, IconCheck } from '@tabler/icons-react';
import { useSessionContext, useSupabaseClient } from '@supabase/auth-helpers-react'
import { registrationSuccessNotification } from '../../../helpers/NotificationHelpers'
import useAuthModal from '../../../hooks/useAuthModal';
import { useRouter } from 'next/navigation';
import { Lora, Spectral } from 'next/font/google';
import useStyles from './AuthModal.styles';

export const brandFont = Lora({
    weight: ['400', '500', '600', '700'],
    style: ['normal', 'italic'],
    subsets: ['latin', 'latin-ext'],
    display: 'swap',
})

const spectralFont = Spectral({
    weight: ['200', '300', '400', '500', '600', '700', '800'],
    style: ['normal', 'italic'],
    subsets: ['latin', 'latin-ext'],
    display: 'swap',
  })

export function AuthModal() {
    const { session } = useSessionContext();
    const router = useRouter();
    const supabase = useSupabaseClient()
    const { onClose, isOpen } = useAuthModal();

    const { classes, theme } = useStyles()

    const [loading, setLoading] = useState(false)
    const [authError, updateAuthError] = useState({ title: "", message: "" })

    // useEffect(() => {
    //     if (session) {
    //         router.refresh();
    //         onClose();
    //     }
    // }, [session, router, onClose]);

    const [type, toggle] = useToggle(['register', 'login']);
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
                    updateAuthError({ title: error.name, message: error.message })
                } else {
                    setLoading(false)
                    onClose()
                    updateAuthError({ title: "", message: "" })
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
                    updateAuthError({ title: error.name, message: error.message })
                } else {
                    setLoading(false)
                    onClose()
                    updateAuthError({ title: "", message: "" })
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
            <Modal opened={isOpen} onClose={onClose} withCloseButton={false} classNames={{content: classes.modal}} size={"md"} radius={"md"} padding={0} centered>
                <LoadingOverlay visible={loading} overlayBlur={2} />
                <Modal.Header p={0}>
                    <Paper
                    shadow="md"
                    p={"xl"}
                    radius="md"
                    sx={{ backgroundImage: `url('/geometric-patterns/6323198.jpg')`, backgroundColor: theme.colors['yellow'][3] }}
                    className={classes.banner}
                >
                    <Text size="26px" weight={700} style={{fontFamily: spectralFont.style.fontFamily}}>
                        To get early access to <Text inherit component="span" style={{fontFamily: brandFont.style.fontFamily, fontWeight: 700}}>Ragahub</Text>,
                        <Text inherit>you can {type} with</Text>
                    </Text>

                </Paper>

                </Modal.Header>
                <Modal.Body p={"xl"}>

                    
                

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
                            <Alert icon={<IconAlertCircle size="1rem" />} title={`Error - ${authError.title}`} color="red" mt={20}>
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
                </Modal.Body>
            </Modal>
        </>
    );
}