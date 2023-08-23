import { Avatar, Menu, Text } from '@mantine/core'
import { notifications } from '@mantine/notifications';
import { IconUser, IconBookmarks, IconDoorExit, IconCheck, IconAlertCircle } from '@tabler/icons-react'
import { User, useSupabaseClient } from '@supabase/auth-helpers-react'
import { useRouter } from 'next/router'
import { dashboardElements } from '../../Dashboard/DashboardHelper'

export interface UserMenuProps {
    user: User
}

export const UserMenu = ({ user }: UserMenuProps) => {
    const router = useRouter()
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

    const menuItems = dashboardElements.map((item, index) => (
        <Menu.Item icon={<item.icon size={14}/>} onClick={() => router.push(`/dashboard/${item.path}`)}>{item.label}</Menu.Item>
    ))

    return (
        <>
            <Menu shadow="md" offset={10} width={200} trigger="hover" openDelay={100} closeDelay={150}>
                <Menu.Target>
                    <Avatar color='blue'>RK</Avatar>
                </Menu.Target>

                <Menu.Dropdown>
                    {menuItems}
                    <Menu.Divider />
                    <Menu.Item color="red" icon={<IconDoorExit size={14} />} onClick={() => signOut()}>Sign Out</Menu.Item>
                </Menu.Dropdown>
            </Menu>
        </>
    )
}
