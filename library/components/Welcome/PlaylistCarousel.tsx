import { Carousel } from '@mantine/carousel'
import { Box, Button, Text, Title } from '@mantine/core';
import { Paper, createStyles, rem } from '@mantine/core';

const useStyles = createStyles((theme) => ({
    card: {
        height: rem(190),
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'repeat',
        backgroundBlendMode: 'color-burn',
        borderRadius: '16px',
        borderColor: 'rgba(0, 0, 0, 0.9)',
        borderWidth: '2px',
        borderStyle: 'solid',
        boxShadow: '0px 0px 0px 0px rgba(0, 0, 0, 1)',
        overflow: 'clip',
        // filter: 'brightness(90%)'
    },

    mandala: {
        height: 'auto',
        width: '100%',
        padding: '16px 32px',
      },

    title: {
        fontWeight: 900,
        color: 'white',
        lineHeight: 1.2,
        fontSize: rem(32),
        marginTop: theme.spacing.xs,
    },

    category: {
        color: theme.white,
        opacity: 0.7,
        fontWeight: 700,
        textTransform: 'uppercase',
        marginTop: theme.spacing.xs,
    },
}));

interface CardProps {
    image: string;
    color: string;
    title: string;
    category: string;
}

function Card({ image, color, title, category }: CardProps) {
    const { classes, theme } = useStyles();

    return (
        <Paper
            shadow="md"
            p="0"
            radius="md"
            sx={{ backgroundImage: `url('${image}')`, backgroundColor: theme.colors[color][3] }}
            className={classes.card}
        >
            <Box className={classes.mandala} sx={{ backgroundColor: theme.colors[color][3] }}>
                <Title order={3} className={classes.title}>
                    {title}
                </Title>
                <Text className={classes.category} size="md">
                    {category}
                </Text>
            </Box>
        </Paper>
    );
}

const data = [
    {
        image:'/geometric-patterns/6323198.jpg',
        color: 'raga-green',
        title: 'Dikshitar’s Devotion',
        category: 'Divine Compositions of Dikshitar',
    },
    {
        image:'/geometric-patterns/6323198.jpg',
        color: 'raga-orange',
        title: "Mayamalavagowla",
        category: 'Graceful Melodic Grandeur',
    },
    {
        image:'/geometric-patterns/6323198.jpg',
        color: 'grape',
        title: 'Tyagaraja’s Triumphs',
        category: 'Profound Works of Sri Tyagaraja',
    },
    
    {
        image:'/geometric-patterns/6323198.jpg',
        color: 'raga-red',
        title: 'Serene Sahana',
        category: 'A Meditative Raga Journey',
    },
    {
        image:'/geometric-patterns/6323198.jpg',
        color: 'indigo',
        title: 'Thillana Thrills',
        category: 'Energetic Dance-Driven Melodies',
    },
];

export const PlaylistCarousel = () => {
    const slides = data.map((item) => (
        <Carousel.Slide key={item.title} >
            <Card {...item} />
        </Carousel.Slide>
    ));
    return (
        <Box>
            <Carousel slideSize="70%" height={200} align="start" slideGap="sm" controlsOffset="xs" controlSize={30} loop>
                {slides}
            </Carousel>
        </Box>
    )
}
