import {
    createStyles,
    Card,
    ActionIcon,
    Group,
    Title,
    Text,
    Badge,
    Divider,
} from '@mantine/core';
import { IconAlertCircle, IconBookmark, IconBookmarkFilled,  IconShare } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { useState, useTransition } from 'react';
import { SwaraGradient } from '../SwaraGradient/SwaraGradient'
import { Raga } from '../../helpers/RagaHelpers'
import { nth } from '../../helpers/StringUtilities'
import { initSupabase } from '../../helpers/SupabaseHelpers'
import { useRouter } from 'next/router';
import Link from 'next/link';
import { VakraTag } from '../RagaDetail/RagaTags/VakraTag';
import { BashangaTag } from '../RagaDetail/RagaTags/BashangaTag';
import { UpangaTag } from '../RagaDetail/RagaTags/UpangaTag';
import { AddMoodButton, getMoodTags } from '../RagaDetail/MoodTags/MoodTags';
import { bookmarkAddedNotification, bookmarkRemovedNotification, databaseErrorNotification } from '../../helpers/NotificationHelpers';


const useStyles = createStyles((theme) => ({
    card: {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
        transition: 'transform 150ms ease, box-shadow 150ms ease',
        minWidth: '100%',

        '&:hover': {
          transform: 'scale(1.05)',
          boxShadow: theme.shadows.md,
        //   cursor: 'pointer'
        },

        [theme.fn.smallerThan('md')]: {
            width: '100%'
          },
    },
    header: {
        minWidth: '100%',
    }
}));

export interface RagaCardProps {
    raga: Raga;
    bookmarked: boolean;
    variant?: 'card' | 'header';
}

export function RagaCard({raga, bookmarked, variant='card'}: RagaCardProps) {
    const { classes, theme } = useStyles();
    const [opened, { open, close }] = useDisclosure(false);
    const { supabase, user } = initSupabase()
    const router = useRouter()

    const isHeader = variant == 'header'

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
                bookmarkRemovedNotification(raga)
            }
    
            if (error) {
                databaseErrorNotification(error)
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
                bookmarkAddedNotification(raga)
            }
    
            if (error) {
                databaseErrorNotification(error)
                setBookmark(false)
            }
        }
    } 

    
    const generateTags = (raga: Raga) => {
        let tags = []
        if (raga.is_vakra) {
            tags.push(<VakraTag key={`vakra_${raga.id}`}/>)
        }
        if (raga.is_bashanga) {
            tags.push(<BashangaTag key={`bashanga_${raga.id}`}/>)
        }
        if (raga.is_upanga) {
            tags.push(<UpangaTag key={`upanga_${raga.id}`}/>)
        }
        return tags
    }
    const ragaTags = generateTags(raga)
    const moodTags = getMoodTags()

    return (
        <>
            <Card withBorder padding={isHeader ? 36 : "lg"} radius="md" className={isHeader ? classes.header : classes.card}>
                
                <Group position="apart">
                    {isHeader &&
                    <Text fz="xs" c="dimmed">
                        {descriptor(raga)}
                    </Text>}
                    {!isHeader &&
                    <Link href={"/raga/" + raga.id}>
                        <Text fz="lg" fw={700} mr={16}>{raga.format_name}</Text>
                    </Link>}
                    {raga.is_janaka ? 
                    <Badge size="lg" variant="gradient" gradient={{ from: '#ed6ea0', to: '#ec8c69', deg: 35 }}>MELAKARTA RAAGA</Badge> : 
                    <Badge size="lg" variant='filled'>JANYA RAAGA</Badge>}
                </Group>

                {isHeader &&
                    <Title order={1} fw={700} size={48}>{raga.format_name}</Title>}


                <Group mt="lg" spacing={36}>
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
                    <SwaraGradient raga={raga} height={isHeader ? 8 : 4}/>
                </Card.Section>

                {!isHeader &&
                <Card.Section px="lg" pb={'xs'}>
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
                </Card.Section>}

                {isHeader &&
                <Card.Section px={36} pb={'sm'}>
                    <Group position='apart'>
                        <Group py={'sm'} spacing={8}>
                            <Group spacing={4}>
                                {ragaTags}
                            </Group>
                            <Divider orientation="vertical"/>
                            <Group spacing={4}>
                                {moodTags}
                                <AddMoodButton />
                            </Group>
                            
                        </Group>
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
                </Card.Section>}
            </Card>
        </>
    );
}