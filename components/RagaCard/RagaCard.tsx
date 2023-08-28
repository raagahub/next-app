import {
    createStyles,
    Card,
    ActionIcon,
    Group,
    Modal,
    Text,
    Badge,
} from '@mantine/core';
import { IconAlertCircle, IconBookmark, IconBookmarkFilled,  IconShare } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { useState, useTransition } from 'react';
import { SwaraGradient } from '../SwaraGradient/SwaraGradient'
import { RagaModal } from '../RagaModal/RagaModal'
import { Raga } from '../RagaHelpers'
import { nth } from '../StringUtilities'
import { initSupabase } from '../SupabaseHelpers'


const useStyles = createStyles((theme) => ({
    card: {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
        transition: 'transform 150ms ease, box-shadow 150ms ease',
        minWidth: '100%',

        '&:hover': {
          transform: 'scale(1.05)',
          boxShadow: theme.shadows.md,
        },

        [theme.fn.smallerThan('md')]: {
            width: '100%'
          },
    },
}));

export interface RagaCardProps {
    raga: Raga;
    bookmarked: boolean;
}

export function RagaCard({raga, bookmarked}: RagaCardProps) {
    const { classes, theme } = useStyles();
    const [opened, { open, close }] = useDisclosure(false);
    const { supabase, user } = initSupabase()

    function descriptor(raga: RagaCardProps["raga"]) {
        if(raga.is_janaka){
            return `${raga.id}${nth(raga.id)} Melakarta`
        } else {
            return `${raga.melakarta}${nth(raga.melakarta)} Melakarta Janya`
        }
    }

    const [bookmark, setBookmark] = useState(bookmarked || false)
    const [bookmarking, startTransition] = useTransition()

    async function toggleBookmarkRaga() {
        if (bookmark) {
            setBookmark(false)
            const { status, error } = await supabase
                .from('raga_bookmarks')
                .delete()
                .eq('user_id', user?.id)
                .eq('raga_id', raga.id)
            
            if (status == 204) {
                notifications.show({
                    title: `Removed from Bookmarks`,
                    message: `${raga.format_name} was removed from your bookmarks.`,
                    color: "yellow",
                    icon: <IconBookmarkFilled size="1.1rem" />
                  })
            }
    
            if (error) {
                notifications.show({
                    title: `Error - ${error.code}`,
                    message: error.message,
                    color: "red",
                    icon: <IconAlertCircle size="1.1rem" />
                  })
                setBookmark(true)
            }
        } else {
            setBookmark(true)
            const { status, error } = await supabase
                .from('raga_bookmarks')
                .insert([
                    { user_id: user?.id, raga_id: raga.id },
                ])
            
            if (status == 201) {
                notifications.show({
                    title: `Added to Bookmarks`,
                    message: `${raga.format_name} was added to your bookmarks.`,
                    color: "yellow",
                    icon: <IconBookmarkFilled size="1.1rem" />
                  })
            }
    
            if (error) {
                notifications.show({
                    title: `Error - ${error.code}`,
                    message: error.message,
                    color: "red",
                    icon: <IconAlertCircle size="1.1rem" />
                  })
                setBookmark(false)
            }
        }
    }

    return (
        <>
            <Modal opened={opened} onClose={close} withCloseButton={false} centered>
                <RagaModal raga={raga} bookmarked={bookmark}/>
            </Modal>
            <Card withBorder padding="lg" radius="md" className={classes.card}>
                
                <Group position="apart">
                    <Text fz="lg" fw={700} mr={16}>
                        {raga.format_name}
                    </Text>
                    {raga.is_janaka ? 
                    <Badge variant="gradient" gradient={{ from: '#ed6ea0', to: '#ec8c69', deg: 35 }}>MELAKARTA RAAGA</Badge> : 
                    <Badge>JANYA RAAGA</Badge>}
                    
                </Group>


                <Group mt="lg" spacing="lg">
                    <div>
                        <Text fz="xs" c="dimmed">
                            Arohanam:
                        </Text>
                        <Text fw={500}>{raga.arohanam}</Text>
                    </div>
                    <div>
                        <Text fz="xs" c="dimmed">
                            Avarohanam:
                        </Text>
                        <Text fw={500}>{raga.avarohanam}</Text>
                    </div>
                </Group>

                <Card.Section mt="md" mb="sm">
                    <SwaraGradient raga={raga} height={4}/>
                </Card.Section>

                <Card.Section px="lg" pb="xs">
                    <Group position="apart">
                        <Text fz="xs" c="dimmed">
                            {descriptor(raga)}
                        </Text>
                        <Group spacing={0}>
                            <ActionIcon color="yellow" variant="transparent" onClick={() => {startTransition(() => {toggleBookmarkRaga()})}}>
                                {bookmark ? <IconBookmarkFilled size="1.2rem" stroke={1.5} /> : 
                                <IconBookmark size="1.2rem" stroke={1.5} />}
                            </ActionIcon>
                            <ActionIcon>
                                <IconShare size="1.2rem" color={theme.colors.blue[6]} stroke={1.5} />
                            </ActionIcon>
                        </Group>
                    </Group>
                </Card.Section>
            </Card>
        </>
    );
}