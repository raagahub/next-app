import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    container: {
        height: '100vh',
        backgroundColor: theme.white,
        borderRight: `2px solid ${theme.colors.dark[8]}`,
        paddingTop: 16,
        paddingLeft: 32,
        paddingRight: 32,
        paddingBottom: 16,
        overflow: 'scroll'
      },
}))