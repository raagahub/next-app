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
import { selectableSwaras, swaraColorMap, SwaraSelectState, Swara } from '../../SwaraHelpers'
import { RagaTypeState, SwaraCountState, RagaSortOption } from '../../RagaHelpers'
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
            let swara1: Swara = swara.substring(0,2) as Swara;
            let swara2: Swara = swara.substring(2,4) as Swara;
            return (
                <Button.Group orientation="vertical" key={"swaraGroup_" + swara}>
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
                variant={selectedSwaras[swara as Swara] ? "filled" : "outline"} 
                color={selectedSwaras[swara as Swara] ? swaraColorMap.get(swara) : "dark.3"}
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
                    Raaga Swaras:
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
                        Raaga Type:
                    </Text>
                    <Group position="center" spacing="xs">
                        <Chip checked={ragaTypeState.melakarta} onChange={() => handleRagaTypeToggle("melakarta")} color="pink.5" variant="filled">Melakarta</Chip>
                        <Chip checked={ragaTypeState.janya} onChange={() => handleRagaTypeToggle("janya")} variant="filled">Janya</Chip>
                    </Group>
                </Box>
                <Box>
                    <Text fz="sm" fw={300} mr={16} mb='sm'>
                        Number of Swaras:
                    </Text>
                    <Group position="center" spacing="xs">
                        <Chip checked={swaraCountState.five} onChange={() => handleSwaraCountToggle("five")} variant="outline">5</Chip>
                        <Chip checked={swaraCountState.six} onChange={() => handleSwaraCountToggle("six")} variant="outline">6</Chip>
                        <Chip checked={swaraCountState.seven} onChange={() => handleSwaraCountToggle("seven")} variant="outline">7</Chip>
                        <Chip checked={swaraCountState.others} onChange={() => handleSwaraCountToggle("others")} variant="outline">Others</Chip>
                    </Group>
                </Box>
                <Box>
                    <Text fz="sm" fw={300} mr={16} mb={8}>
                        Sort By:
                    </Text>
                    <SegmentedControl
                    color="raga-red"
                    radius="lg"
                    value={sortByValue}
                    onChange={(v) => handleSortByChange(v)}
                    data={[
                        { label: 'Name', value: 'name' },
                        { label: 'Melakarta', value: 'melakarta' }
                    ]}
                    />
                </Box>
            </Group>
        </Box>

    )}