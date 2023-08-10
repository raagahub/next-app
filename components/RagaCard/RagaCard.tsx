import {
    createStyles,
    Card,
    Image,
    ActionIcon,
    Group,
    Modal,
    Text,
    Avatar,
    Stack,
    Badge,
    rem,
    Box,
} from '@mantine/core';
import { IconHeart, IconBookmark, IconShare } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
import SwaraGradient from '../SwaraGradient/SwaraGradient'
import { RagaModal } from '../RagaModal/RagaModal'
import { nth } from '../StringUtilities'


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
    raga: {
        id: number;
        name: string;
        format_name: string;
        arohanam: string;
        avarohanam: string;
        melakarta: number;
        is_janaka: boolean;
    };
}

export function RagaCard({raga}: RagaCardProps) {
    const { classes, theme } = useStyles();
    const [opened, { open, close }] = useDisclosure(false);

    function descriptor(raga: RagaCardProps["raga"]) {
        if(raga.is_janaka){
            return `${raga.id}${nth(raga.id)} Melakarta`
        } else {
            return `${raga.melakarta}${nth(raga.melakarta)} Melakarta Janya`
        }
    }

    return (
        <>
            <Modal opened={opened} onClose={close} withCloseButton={false} centered>
                <RagaModal raga={raga}/>
            </Modal>
            <Card withBorder padding="lg" radius="md" className={classes.card} onClick={open}>
                
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
                    <SwaraGradient raga={raga}/>
                </Card.Section>

                <Card.Section px="lg" pb="xs">
                    <Group position="apart">
                        <Text fz="xs" c="dimmed">
                            {descriptor(raga)}
                        </Text>
                        <Group spacing={0}>
                            <ActionIcon>
                                <IconBookmark size="1.2rem" color={theme.colors.yellow[6]} stroke={1.5} />
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