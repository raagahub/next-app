import {
    createStyles,
    ActionIcon,
    Box,
    Button,
    Chip,
    Divider,
    Group,
    SegmentedControl,
    Text
} from '@mantine/core';
import { selectableSwaras, swaraColorMap, SwaraSelectState, SwaraSelectKey } from '../SwaraHelpers'
import { RagaTypeState, SwaraCountState, RagaSortOption } from '../RagaHelpers'
import { useState } from 'react';


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

export interface RagaFilterProps {
    selectedSwaras: SwaraSelectState;
    handleSwaraSelect: Function;
    ragaTypeState: RagaTypeState;
    handleRagaTypeToggle: Function;
    swaraCountState: SwaraCountState;
    handleSwaraCountToggle: Function;
    sortByValue: RagaSortOption;
    handleSortByChange: Function;
}


export function RagaFilter({
    selectedSwaras, handleSwaraSelect, 
    ragaTypeState, handleRagaTypeToggle, 
    swaraCountState, handleSwaraCountToggle, 
    sortByValue, handleSortByChange}: RagaFilterProps) {
    const { classes, theme } = useStyles();

    const swaraSelectButtons = selectableSwaras.map((swara) => {
        if (swara.length == 4) {
            let swara1: SwaraSelectKey = swara.substring(0,2) as SwaraSelectKey;
            let swara2: SwaraSelectKey = swara.substring(2,4) as SwaraSelectKey;
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
                variant={selectedSwaras[swara as SwaraSelectKey] ? "filled" : "outline"} 
                color={selectedSwaras[swara as SwaraSelectKey] ? swaraColorMap.get(swara) : "dark.3"}
                onClick={()=>{handleSwaraSelect(swara)}}
                >
                    {swara}
                </Button>
            )
        }

    })

    return (
        <Box m="0 auto" w="fit-content" py={16}>
            <Group position="apart" mb='sm'>
                <Text fz="sm" fw={300} mr={16}>
                    RAAGA SWARAS:
                </Text>
                <Button
                    variant="subtle"
                    size='xs'
                    color="dark.3"
                    compact uppercase>
                        RESET
                </Button>
                
            </Group>
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
            <Group mt='md' position="apart" spacing="lg">
                <Box>
                    <Text fz="sm" fw={300} mr={16} mb='sm'>
                        RAAGA TYPE:
                    </Text>
                    <Group position="center" spacing="xs">
                        <Chip checked={ragaTypeState.melakarta} onChange={() => handleRagaTypeToggle("melakarta")} color="pink.5" variant="filled">Melakarta</Chip>
                        <Chip checked={ragaTypeState.janya} onChange={() => handleRagaTypeToggle("janya")} color="blue.4" variant="filled">Janya</Chip>
                    </Group>
                </Box>
                <Box>
                    <Text fz="sm" fw={300} mr={16} mb='sm'>
                        NUMBER OF SWARAS:
                    </Text>
                    <Group position="center" spacing="xs">
                        <Chip checked={swaraCountState.five} onChange={() => handleSwaraCountToggle("five")} color="orange" variant="outline">5</Chip>
                        <Chip checked={swaraCountState.six} onChange={() => handleSwaraCountToggle("six")} color="orange" variant="outline">6</Chip>
                        <Chip checked={swaraCountState.seven} onChange={() => handleSwaraCountToggle("seven")} color="orange" variant="outline">7</Chip>
                        <Chip checked={swaraCountState.others} onChange={() => handleSwaraCountToggle("others")} color="orange" variant="outline">Others</Chip>
                    </Group>
                </Box>
                <Box>
                    <Text fz="sm" fw={300} mr={16}>
                        SORT BY:
                    </Text>
                    <SegmentedControl
                    value={sortByValue}
                    onChange={(v) => handleSortByChange(v)}
                    color='violet.4'
                    data={[
                        { label: 'Name', value: 'name' },
                        { label: 'Melakarta', value: 'melakarta' }
                    ]}
                    />
                </Box>
            </Group>
        </Box>

    )}