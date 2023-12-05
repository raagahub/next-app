import { createStyles, rem } from '@mantine/core';


export default createStyles((theme) => ({
    modal: {
        border: '2px solid black',
    },
    banner: {
        height: 'fit-content',
        width:'100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        backgroundPosition: 'center',
        backgroundSize: '260px',
        backgroundRepeat: 'repeat',
        backgroundBlendMode: 'color-burn',
        borderRadius: '0px',
        borderColor: 'rgba(0, 0, 0, 0.9)',
        boxShadow: '0px 0px 0px 0px rgba(0, 0, 0, 1)',
        overflow: 'clip',
        marginBottom: 16,
        borderBottom: '2px solid black',
    },
}));
