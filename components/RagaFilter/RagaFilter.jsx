import {
    createStyles,
    ActionIcon,
    Box,
    Button,
    Divider,
    Group,
    Text
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
    swaraSelectSplit: {
        height: 36,
        width: 48,
        textAlign: "center",
        fontWeight: "bold",
        paddingLeft: 8,
        paddingRight: 8
    },
}));

export function RagaFilter({selectedSwaras, handleSwaraSelect}) {
    const { classes, theme } = useStyles();

    const swaraSelectButtons = selectableSwaras.map((swara) => {
        if (swara.length == 4) {
            let swara1 = swara.substring(0,2);
            let swara2 = swara.substring(2,4);
            return (
                <Button.Group orientation="vertical">
                    <Button
                    key={"swaraSelect_" + swara1}
                    className={classes.swaraSelectSplit} 
                    variant={selectedSwaras[swara1] ? "filled" : "outline"} 
                    color={selectedSwaras[swara1] ? swaraColorMap.get(swara1) : "dark.3"}
                    onClick={()=>{handleSwaraSelect(swara1)}}
                    >
                        {swara1}
                    </Button>
                    <Button
                    key={"swaraSelect_" + swara2}
                    className={classes.swaraSelectSplit} 
                    variant={selectedSwaras[swara2] ? "filled" : "outline"} 
                    color={selectedSwaras[swara2] ? swaraColorMap.get(swara2) : "dark.3"}
                    onClick={()=>{handleSwaraSelect(swara2)}}
                    >
                        {swara2}
                    </Button>
                </Button.Group>
            )


        } else {
            return (
                <Button
                key={"swaraSelect_" + swara}
                className={classes.swaraSelect} 
                variant={selectedSwaras[swara] ? "filled" : "outline"} 
                color={selectedSwaras[swara] ? swaraColorMap.get(swara) : "dark.3"}
                onClick={()=>{handleSwaraSelect(swara)}}
                >
                    {swara}
                </Button>
            )
        }

    })

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