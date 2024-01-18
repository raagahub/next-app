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

      previewContainer: {
        height: '100vh',
        padding: 16
      },

      playerWrapper: {
        position: 'relative',
        paddingTop: '56.25%', /* Player ratio: 100 / (1280 / 720) */
      },
      
      reactPlayer: {
        position: 'absolute',
        top: 0,
        left: 0
      }
}))