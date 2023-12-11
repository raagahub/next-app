import { Text } from "@mantine/core";
import { Anchor, Box, Group, createStyles } from "@mantine/core"

const useStyles =  createStyles((theme) => ({
  footer: {
      height: '40px',
      width: '100%',
      position: 'absolute',
      bottom: '0',
      backgroundColor: theme.colors['dark'][8],
      padding: `${theme.spacing.xs} ${theme.spacing.md}`
    },
}))

export const Footer = () => {
  const { classes } = useStyles();
  return (
    <Box className={classes.footer}>
      <Group position={'apart'}>
          <Text size={'xs'} color='white'>© Ragahub 2023-2024</Text>
        <Group> 
          <Anchor size={'xs'} href='/privacy-policy.html' target='_blank'>Privacy Policy</Anchor>
          <Anchor size={'xs'} href='/terms-of-service.html' target='_blank'>Terms of Service</Anchor>
        </Group>
      </Group>
    </Box>
  )
}
