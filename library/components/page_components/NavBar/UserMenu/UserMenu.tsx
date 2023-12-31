import { Avatar, Menu, Text, Tooltip } from '@mantine/core'
import { IconDoorExit } from '@tabler/icons-react'
import { User } from '@supabase/auth-helpers-react'
import { useRouter } from 'next/router'
import { dashboardElements } from '../../../../pages/Dashboard/DashboardHelper'
import { initSupabase } from '../../../../helpers/SupabaseHelpers'
import { authErrorNotification, signOutSuccessNotification } from '../../../../helpers/NotificationHelpers'
import { useStyles } from './UserMenu.styles'
import { useDisclosure } from '@mantine/hooks'
import { SignOutModal } from '../SignOutModal/SignOutModal'

export interface UserMenuProps {
    user: User
}

export const UserMenu = ({ user }: UserMenuProps) => {
    const router = useRouter()
    const { supabase } = initSupabase()

    const { classes, theme } = useStyles();
    const [opened, { open, close }] = useDisclosure(false);
    
    async function signOut() {
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
    }

    const menuItems = dashboardElements.map((item, index) => (
        <Menu.Item key={"menu-item-" + index} icon={<item.icon size={14}/>} onClick={() => router.push(`/dashboard/${item.path}`)}>{item.label}</Menu.Item>
    ))

    const getInitials = (): string => {
        if (user.user_metadata.full_name) {
            const name_split = user.user_metadata.full_name.split(' ')
            if (name_split.length > 1) {
                return name_split[0][0] + name_split[1][0]
            } else {
                return name_split[0].substring(0,2)
            }
        } else if (user.email) {
            return user.email?.substring(0,2)
        } else {
            return "RH"
        }
    }

    // return (
    //     <>
    //         <Menu shadow="md" offset={10} width={200} trigger="hover" openDelay={100} closeDelay={150}>
    //             <Menu.Target>
    //                 <Avatar color='raga-red.6' variant='filled' radius={'xl'} classNames={{placeholder: classes.avatar}}>{getInitials().toUpperCase()}</Avatar>
    //             </Menu.Target>

    //             <Menu.Dropdown>
    //                 <Menu.Label><Text fw={700} fz="xl">{user.user_metadata.full_name}</Text></Menu.Label>
    //                 <Menu.Label>{user.email}</Menu.Label>
    //                 {/* {menuItems} */}
    //                 <Menu.Divider />
    //                 <Menu.Item color="red" icon={<IconDoorExit size={14} />} onClick={() => signOut()}>Sign Out</Menu.Item>
    //             </Menu.Dropdown>
    //         </Menu>
    //     </>
    // )

    return (
        <>
        <SignOutModal opened={opened} close={close}/>
        <Tooltip 
        label='Click to logout'
        color="raga-red.6"
        position="left"
        withArrow>
            <Avatar 
            color='raga-red.6' 
            variant='filled' 
            radius={'xl'} 
            onClick={open}
            classNames={{placeholder: classes.avatar}}
            >{getInitials().toUpperCase()}</Avatar>
        </Tooltip>
        </>
    )
}
