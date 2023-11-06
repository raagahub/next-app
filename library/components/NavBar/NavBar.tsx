import {
    createStyles,
    Header,
    HoverCard,
    Group,
    Button,
    UnstyledButton,
    Image,
    Text,
    SimpleGrid,
    ThemeIcon,
    Anchor,
    Divider,
    Center,
    Box,
    Burger,
    Drawer,
    Collapse,
    ScrollArea,
    rem,
    Stack,
} from '@mantine/core';
import { useDisclosure, useWindowScroll } from '@mantine/hooks';
import {
    IconNotification,
    IconCode,
    IconBook,
    IconChartPie3,
    IconFingerprint,
    IconCoin,
    IconChevronDown,
    IconWaveSine,
    IconHighlight,
    IconHandThreeFingers,
} from '@tabler/icons-react';
import { ColorSchemeToggle } from '../ColorSchemeToggle/ColorSchemeToggle';
import { SignInModal } from './SignInModal/SignInModal'
import { UserMenu } from './UserMenu/UserMenu'
import { useUser } from '@supabase/auth-helpers-react'
import { useRouter } from 'next/router';
import { useStyles } from './NavBar.styles'
import Link from 'next/link';
import { useEffect, useState } from 'react';

const mockdata = [
    {
        icon: IconWaveSine,
        title: 'Raga Explore',
        description: 'Search, filter and discover the world of Carnatic Ragas.',
        path: '/raga/explore',
        active: true
    },
    {
        icon: IconHighlight,
        title: 'Composer Explore',
        description: "Learn about composers' music, lives and history.",
        path: '/composer/explore',
        active: false
    },
    {
        icon: IconBook,
        title: 'Kriti Explore',
        description: 'Search for the compositions written through the ages.',
        path: '/kriti/explore',
        active: false
    },
    {
        icon: IconHandThreeFingers,
        title: 'Tala Explore',
        description: 'Search and explore and discover Talas, in an interactive way.',
        path: '/tala/explore',
        active: false
    },
];

export function NavBar() {
    const showDarkModeToggle = false
    const [opened, { open, close }] = useDisclosure(false);
    const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
    const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);
    const { classes, theme } = useStyles();
    const [scroll, scrollTo] = useWindowScroll();
    const router = useRouter();

    const user = useUser()

    const [isNavTop, setNavTop] = useState(true)

    useEffect(() => {
        if(scroll.y > 10) {
            setNavTop(false)
        } else {
            setNavTop(true)
        }
      }, [scroll]);

    const links = mockdata.map((item) => (
        <UnstyledButton className={classes.subLink} key={item.title} onClick={() => router.push(item.path)} disabled={!item.active}>
            <Group noWrap align="flex-start">
                <ThemeIcon size={34} variant="default" radius="md">
                    <item.icon size={rem(22)} color={item.active ? theme.fn.primaryColor() : theme.colors.gray[3]} />
                </ThemeIcon>
                <div>
                    <Text size="sm" fw={500}>
                        {item.title}
                    </Text>
                    <Text size="xs" color="dimmed">
                        {item.description}
                    </Text>
                </div>
            </Group>
        </UnstyledButton>
    ));

    return (
        <Box pb={60}>
            <Header height={60} px="md" zIndex={199} fixed classNames={{ root: isNavTop ? classes.header : `${classes.header} scrolling` }}>
                <Group position="apart" sx={{ height: '100%' }}>
                    <Group>
                        <Image
                            src='/raagahub_logo_dark.png'
                            alt='raagahub_logo'
                            width={60}
                            height={60}
                        />
                        <Text fw={900} size={'xl'} color='dark.4' mt={-5}>Ragahub</Text>
                    </Group>

                    <Group sx={{ height: '100%' }} spacing={0} className={classes.hiddenMobile}>
                        <Link className={classes.link} href="/">
                            Home
                        </Link>
                        <Link className={classes.link} href="/about">
                            About
                        </Link>
                        <Link className={classes.link} href="/contribute">
                            Contribute
                        </Link>
                    </Group>

                    <Group className={classes.hiddenMobile}>
                        <SignInModal opened={opened} close={close} />
                        {showDarkModeToggle && <ColorSchemeToggle />}
                        {user ? <UserMenu user={user} /> :
                            <UnstyledButton className={classes.signupButton} onClick={open}>Sign Up</UnstyledButton>}
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
                        <UnstyledButton className={classes.signupButton} onClick={open}>Sign Up</UnstyledButton>
                    </Stack>
                </Box>
            </Drawer>
        </Box>
    );
}