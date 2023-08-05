import {
    createStyles,
    Button,
    ActionIcon,
    Group,
    Box,
} from '@mantine/core';
import { selectableSwaras, swaraColorMap } from '../SwaraMapping'


const useStyles = createStyles((theme) => ({
    swaraSelect: {
        height: 72,
        width: 48,
        textAlign: "center",
        fontWeight: "bold",
        paddingLeft: 8,
        paddingRight: 8
    },
}));

export function RagaFilter({selectedSwaras, handleSwaraSelect}) {
    const { classes, theme } = useStyles();

    const swaraSelectButtons = selectableSwaras.map((swara) => (
        <Button
        key={"swaraSelect_" + swara}
        className={classes.swaraSelect} 
        variant={selectedSwaras[swara] ? "filled" : "outline"} 
        color={selectedSwaras[swara] ? swaraColorMap.get(swara) : "dark.3"}
        onClick={()=>{handleSwaraSelect(swara)}}
        >
            {swara}
        </Button>
    ))

    return (
        <Box mt={32}>
            <Group position="center" spacing="xs">
                <Button
                    key="swaraSelect_S"
                    className={classes.swaraSelect} 
                    variant="default"
                    color="dark.3">
                        S
                </Button>
                {swaraSelectButtons}
            </Group>
        </Box>

    )}