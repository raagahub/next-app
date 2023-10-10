import Link from "next/link";
import { useEffect, useState } from "react";
import { createStyles, Card, Text, Image, Avatar, Button, Group, Grid, Stack, rem } from '@mantine/core';
import { useUnfurlUrl } from "../../../../helpers/UrlHelpers";

const useStyles = createStyles((theme) => ({
    card: {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,

        '&:hover': {
            borderColor: theme.colors.orange[6],
            cursor: 'pointer'
          },
    },

    title: {
        fontWeight: 700,
    },

    body: {
        padding: theme.spacing.md,
    },
}));



export const LinkPreview = ({ url }: { url: string }) => {
    const { classes } = useStyles();
    const { data, status } = useUnfurlUrl(url);

    if (status === "error") {
        return <Link href={url} />;
    }

    if (status === "success") {
        return (
            <Card withBorder radius="md" p={0} my={16} onClick={()=> window.open(url, "_blank")} className={classes.card}>
                <Group noWrap spacing={0}>
                    {data?.imageSrc && <Image src={data?.imageSrc} height={140} width={140} />}
                    <div className={classes.body}>
                        <Text className={classes.title} mb="xs">
                            {data?.title}
                        </Text>
                        <Text color="dimmed" size="xs" mb="md" lineClamp={3}>
                            {data?.description}
                        </Text>
                        <Group noWrap spacing="xs">
                            <Group spacing="xs" noWrap>
                                <Avatar size={20} src={data?.favicon} />
                                <Text size="xs">{url}</Text>
                            </Group>
                        </Group>
                    </div>
                </Group>
            </Card>
        )
    }
    return (
        <div>Loading Preview</div>
    )
}
