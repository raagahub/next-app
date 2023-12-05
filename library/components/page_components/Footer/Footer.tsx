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
          <Anchor size={'xs'}>Privacy Policy</Anchor>
          {/* <Divider size={'xs'} color={'raga-red'} orientation={'vertical'}/> */}
          <Anchor size={'xs'}>Terms & Conditions</Anchor>
        </Group>
      </Group>
    </Box>
  )
}
