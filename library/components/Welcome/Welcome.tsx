import { Title, Text, Anchor, Box, BackgroundImage } from '@mantine/core';
import useStyles from './Welcome.styles';

export function Welcome() {
  const { classes } = useStyles();

  return (
    <div className={classes.container}>
      <Box px="md" pt={32} pb={48} className={classes.box}>
          <Title className={classes.title} align="center">
            Rediscover{' '}
            <Text inherit variant="gradient" gradient={{ from: 'raga-red.6', to: 'raga-orange.4', deg: 45 }} component="span">
              Ragas
            </Text>
          </Title>
          <Text color="dimmed" align="center" size="lg" sx={{ maxWidth: 580 }} mx="auto" mt="xl">
            <Text span fw={700} inherit>Ragahub</Text> is a vibrant online platform designed to help you discover, learn, and explore the captivating realm of{' '}
            <Anchor href="https://en.wikipedia.org/wiki/Carnatic_music" size="lg">
              Carnatic Music
            </Anchor>
            . Immerse yourself in the rich heritage and intricate melodies as you embark on a journey of musical exploration like never before.
          </Text>
      </Box>
    </div>
  );
}
