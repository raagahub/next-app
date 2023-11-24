import {
    Header,
    Group,
    UnstyledButton,
    Image,
    Text,
    Box,
    Burger,
    Drawer,
    rem,
    Stack,
} from '@mantine/core';
import { useDisclosure, useWindowScroll } from '@mantine/hooks';
import { SignInModal } from './SignOutModal/SignInModal'
import { UserMenu } from './UserMenu/UserMenu'
import { useRouter } from 'next/router';
import { useStyles } from './NavBar.styles'
import Link from 'next/link';
import { useEffect, useState } from 'react';
import useAuthModal from '../../../hooks/useAuthModal';
import { useUser } from '../../../hooks/useUser';
import { Lora } from 'next/font/google';

export const brandFont = Lora({
    weight: ['400', '500', '600', '700'],
    style: ['normal', 'italic'],
    subsets: ['latin', 'latin-ext'],
    display: 'swap',
})

export function NavBar() {
    const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
    const { classes, theme } = useStyles();
    const [scroll, scrollTo] = useWindowScroll();
    const authModal = useAuthModal();

    const router = useRouter();
    const { user } = useUser()

    const [isNavTop, setNavTop] = useState(true)
    const [isHome, setHome] = useState(false)

    useEffect(() => {
        if (scroll.y > 10) {
            setNavTop(false)
        } else {
            setNavTop(true)
        }
    }, [scroll]);

    const [activeRoute, setActiveRoute] = useState(router.pathname);

    useEffect(() => {
        setActiveRoute(router.pathname);
        closeDrawer();
        if (router.pathname == '/') {
            setHome(true)
        } else {
            setHome(false)
        }
    }, [router.pathname]);


    return (
        <Box pb={60}>
            <Header height={60} px="md" zIndex={199} fixed classNames={{ root: isNavTop && isHome ? classes.header : `${classes.header} scrolling` }}>
                <Group position="apart" sx={{ height: '100%' }}>
                    <Group>
                        <Image
                            src='/raagahub_logo_dark.png'
                            alt='raagahub_logo'
                            width={60}
                            height={60}
                        />
                        <Text color='dark.4' mt={-5} style={{fontFamily: brandFont.style.fontFamily, fontWeight: 700, fontSize: 24}}>Ragahub</Text>
                    </Group>

                    <Group sx={{ height: '100%' }} spacing={0} className={classes.hiddenMobile}>
                        <Link className={`${classes.link} ${activeRoute === '/' ? 'active' : ''}`} href="/">
                            Home
                        </Link>
                        <Link className={`${classes.link} ${activeRoute === '/about' ? 'active' : ''}`} href="/about">
                            About
                        </Link>
                        <Link className={`${classes.link} ${activeRoute === '/contribute' ? 'active' : ''}`} href="/contribute">
                            Contribute
                        </Link>
                    </Group>

                    <Group className={classes.hiddenMobile}>
                        {user ? <UserMenu user={user}/> :
                        <UnstyledButton className={classes.signupButton} onClick={authModal.onOpen}>Sign Up</UnstyledButton>}
                    </Group>

                    <Burger size={'md'} opened={drawerOpened} onClick={toggleDrawer} className={classes.hiddenDesktop} />
                </Group>
            </Header>

            <Drawer
                opened={drawerOpened}
                onClose={closeDrawer}
                size="75%"
                padding="md"
                className={classes.hiddenDesktop}
                zIndex={1000000}
                withCloseButton={false}
            >
                <Box h={`calc(100vh - ${rem(60)})`}>
                    <Stack align='left' spacing={0} mb={32}>
                        <Link className={classes.linkMobile} href="/">
                            Home
                        </Link>
                        <Link className={classes.linkMobile} href="/about">
                            About
                        </Link>
                        <Link className={classes.linkMobile} href="/contribute">
                            Contribute
                        </Link>
                    </Stack>
                    <Stack align="stretch" px="md">
                        <UnstyledButton className={classes.signupButton} onClick={() => {
                            closeDrawer()
                            authModal.onOpen()
                        }}>Sign Up</UnstyledButton>
                    </Stack>
                </Box>
            </Drawer>
        </Box>
    );
}