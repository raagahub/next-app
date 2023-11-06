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
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
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
    const router = useRouter();

    const user = useUser()

    const links = mockdata.map((item) => (
        <UnstyledButton className={classes.subLink} key={item.title}  onClick={() => router.push(item.path)} disabled={!item.active}>
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
            <Header height={60} px="md" zIndex={199} fixed className={classes.header}>
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
                        <a href="/" className={classes.link}>
                            Home
                        </a>
                        {/* <HoverCard width={600} position="bottom" radius="md" shadow="md" withinPortal>
                            <HoverCard.Target>
                                <a href="#" className={classes.link}>
                                    <Center inline>
                                        <Box component="span" mr={5}>
                                            Tools
                                        </Box>
                                        <IconChevronDown size={16} color={theme.fn.primaryColor()} />
                                    </Center>
                                </a>
                            </HoverCard.Target>

                            <HoverCard.Dropdown sx={{ overflow: 'hidden' }}>
                                <Group position="apart" px="md">
                                    <Text fw={500}>Tools</Text>
                                    <Anchor href="#" fz="xs">
                                        View all
                                    </Anchor>
                                </Group>

                                <Divider
                                    my="sm"
                                    mx="-md"
                                    color={theme.colorScheme === 'dark' ? 'dark.5' : 'gray.1'}
                                />

                                <SimpleGrid cols={2} spacing={0}>
                                    {links}
                                </SimpleGrid>

                                <div className={classes.dropdownFooter}>
                                    <Group position="apart">
                                        <div>
                                            <Text fw={500} fz="sm">
                                                Get started
                                            </Text>
                                            <Text size="xs" color="dimmed">
                                                Their food sources have decreased, and their numbers
                                            </Text>
                                        </div>
                                        <Button variant="default">Get started</Button>
                                    </Group>
                                </div>
                            </HoverCard.Dropdown>
                        </HoverCard> */}
                        <a href="/about" className={classes.link}>
                            About
                        </a>
                        <a href="#" className={classes.link}>
                            Contribute
                        </a>
                    </Group>

                    <Group className={classes.hiddenMobile}>
                        <SignInModal opened={opened} close={close}/>
                        { showDarkModeToggle && <ColorSchemeToggle /> }
                        { user ? <UserMenu user={user} /> : <Button radius={'xl'} variant='outline' onClick={open} style={{backgroundColor: 'white'}}>Sign Up</Button>}
                    </Group>

                    <Burger opened={drawerOpened} onClick={toggleDrawer} className={classes.hiddenDesktop} />
                </Group>
            </Header>

            <Drawer
                opened={drawerOpened}
                onClose={closeDrawer}
                size="100%"
                padding="md"
                title="Navigation"
                className={classes.hiddenDesktop}
                zIndex={1000000}
            >
                <ScrollArea h={`calc(100vh - ${rem(60)})`} mx="-md">
                    <Divider my="sm" color={theme.colorScheme === 'dark' ? 'dark.5' : 'gray.1'} />

                    <a href="/" className={classes.link}>
                        Home
                    </a>
                    <UnstyledButton className={classes.link} onClick={toggleLinks}>
                        <Center inline>
                            <Box component="span" mr={5}>
                                Features
                            </Box>
                            <IconChevronDown size={16} color={theme.fn.primaryColor()} />
                        </Center>
                    </UnstyledButton>
                    <Collapse in={linksOpened}>{links}</Collapse>
                    <a href="/about" className={classes.link}>
                        About
                    </a>
                    <a href="#" className={classes.link}>
                        Contribute
                    </a>

                    <Divider my="sm" color={theme.colorScheme === 'dark' ? 'dark.5' : 'gray.1'} />

                    <Group position="center" grow pb="xl" px="md">
                        <Button variant="light">Sign In</Button>
                        <ColorSchemeToggle />
                    </Group>
                </ScrollArea>
            </Drawer>
        </Box>
    );
}