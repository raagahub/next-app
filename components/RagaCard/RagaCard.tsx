import {
    createStyles,
    Card,
    Image,
    ActionIcon,
    Group,
    Text,
    Avatar,
    Badge,
    rem,
    Box,
} from '@mantine/core';
import { IconHeart, IconBookmark, IconShare } from '@tabler/icons-react';

const useStyles = createStyles((theme) => ({
    card: {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    },

    // footer: {
    //     padding: `${theme.spacing.xs} ${theme.spacing.lg}`,
    // },
}));

interface RagaCardProps {
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

let swaraColorMap = new Map([
    ["SS", "dark.3"],
    ["S", "dark.3"],
    ["P", "pink.5"],
    ["R1", "pink.3"],
    ["R2", "grape.3"],
    ["R3", "violet.3"],
    ["G1", "indigo.3"],
    ["G2", "blue.3"],
    ["G3", "cyan.3"],
    ["M1", "cyan.4"],
    ["M2", "red.4"],
    ["D1", "teal.3"],
    ["D2", "green.3"],
    ["D3", "lime.3"],
    ["N1", "yellow.3"],
    ["N2", "orange.3"],
    ["N3", "orange.4"],
])

export function RagaCard({raga}: RagaCardProps) {
    const { classes, theme } = useStyles();
    const swaraList = (raga.arohanam + raga.avarohanam).split(' ')
    const swaraGradient = swaraList.map((swara) => (
        <Box bg={swaraColorMap.get(swara)} miw={4} h={5}/>
    ))
    console.log(swaraGradient)

    return (
        <Card withBorder padding="lg" radius="md" className={classes.card}>
            
            <Group position="apart">
                <Text fz="lg" fw={700}>
                    {raga.format_name}
                </Text>
                <Badge>{raga.is_janaka ? "MELAKARTA RAAGA" : "JANYA RAAGA"}</Badge>
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
                <Group grow spacing={0}>
                    {swaraGradient}
                </Group>
            </Card.Section>

            <Card.Section px="lg" pb="xs">
                <Group position="apart">
                    <Text fz="xs" c="dimmed">
                        See Details
                    </Text>
                    <Group spacing={0}>
                        <ActionIcon>
                            <IconHeart size="1.2rem" color={theme.colors.red[6]} stroke={1.5} />
                        </ActionIcon>
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
    );
}