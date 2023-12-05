import { Button, Group, Text } from "@mantine/core";
import { Modal } from "@mantine/core";
import { authErrorNotification, signOutSuccessNotification } from "../../../../helpers/NotificationHelpers";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useState } from "react";

export interface SignOutModalProps {
    opened: boolean;
    close: () => void;
}

export const SignOutModal = ({ opened, close }: SignOutModalProps) => {
    const supabase = useSupabaseClient()
    const [loading, setLoading] = useState(false)
    async function signOut() {
        setLoading(true)
        try {
            const { error } = await supabase.auth.signOut()
            if (error) {
                authErrorNotification(error)
            } else {
                signOutSuccessNotification()
            }
        } catch (error) {
            console.log(error)
        }
        setLoading(false)
    }
    return (
        <Modal
            size="sm"
            padding="lg"
            opened={opened}
            onClose={close}
            withCloseButton={false}
        >
            <Text fw={500}>
                Are you sure you want to sign out?
            </Text>
            <Text size={'sm'} fw={300}>
                Login with the same credentials when you return
            </Text>
            <Group position="right" mt={24}>

                <Button
                    color="raga-red"
                    variant="outline"
                    onClick={close}
                >
                    Cancel
                </Button>

                <Button
                    color="raga-red"
                    onClick={() => signOut()}
                    loading={loading}
                >
                    Sign Out
                </Button>
            </Group>
        </Modal>
    )
}



