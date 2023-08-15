import { Avatar, Menu, Text } from '@mantine/core'
import { notifications } from '@mantine/notifications';
import { IconUser, IconBookmarks, IconDoorExit, IconCheck, IconAlertCircle } from '@tabler/icons-react'
import { User, useSupabaseClient } from '@supabase/auth-helpers-react'

export interface UserMenuProps {
    user: User
}

export const UserMenu = ({ user }: UserMenuProps) => {
    const supabase = useSupabaseClient()
    
    async function signOut() {
        try {
            const { error } = await supabase.auth.signOut()
            if (error) {
                notifications.show({
                    title: `Error - ${error.name}`,
                    message: error.message,
                    color: "red",
                    icon: <IconAlertCircle size="1.1rem" />
                  })
            } else {
                notifications.show({
                    title: 'Sign Out',
                    message: "You've been signed out successfully!",
                    color: "teal",
                    icon: <IconCheck size="1.1rem" />
                  })
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <Menu shadow="md" offset={10} width={200} trigger="hover" openDelay={100} closeDelay={150}>
                <Menu.Target>
                    <Avatar color='blue'>RK</Avatar>
                </Menu.Target>

                <Menu.Dropdown>
                    <Menu.Item><Text>{user.email}</Text></Menu.Item>
                    <Menu.Item icon={<IconUser size={14} />}>Account</Menu.Item>
                    <Menu.Item icon={<IconBookmarks size={14} />}>Bookmarks</Menu.Item>
                    <Menu.Divider />
                    <Menu.Item color="red" icon={<IconDoorExit size={14} />} onClick={() => signOut()}>Sign Out</Menu.Item>
                </Menu.Dropdown>
            </Menu>
        </>
    )
}
