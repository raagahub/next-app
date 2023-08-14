import { ActionIcon, Autocomplete, Badge, Box, Button, Card, Collapse, Container, Divider, Flex, Grid, Group, Image, Text, useMantineColorScheme } from '@mantine/core';
import { IconSearch, IconAdjustments } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
import { useState, useEffect } from 'react';
import { Raga, RagaType, RagaTypeState, RagaSwaraCountVal, SwaraCountState, RagaSortOption } from '../RagaHelpers'
import { RagaCard} from '../RagaCard/RagaCard';
import { RagaFilter } from '../RagaFilter/RagaFilter'
import { swaraSelectStartState, SwaraSelectKey, SwaraSelectState } from '../SwaraHelpers'
import { VirtuosoGrid, GridItemProps, GridListProps } from 'react-virtuoso'
import styled from '@emotion/styled'

let data = require('./ragas.json');

const RagaExplore = () => {
    const [opened, { toggle }] = useDisclosure(false);
    const { colorScheme, toggleColorScheme } = useMantineColorScheme();
    const dark = colorScheme === 'dark';

    const [filteredData, filterData] = useState(data)

    const ragaNames = filteredData.map(
        (raga: Raga) => raga.format_name
    )

    const [query, setQuery] = useState("")

    const [swaraSelectState, updateSwaraSelect] = useState<SwaraSelectState>(swaraSelectStartState)
    function handleSwaraSelect(swara: SwaraSelectKey) {
        updateSwaraSelect({
            ...swaraSelectState,
            [swara]: !(swaraSelectState[swara])
        })
    }
    function getSwaraSelectList(): (keyof SwaraSelectState)[] {
        return Object.keys(swaraSelectState).filter(key => swaraSelectState[key as keyof SwaraSelectState]) as (keyof SwaraSelectState)[];
    }
    console.log(getSwaraSelectList())

    const [ragaTypeState, toggleRagaType] = useState<RagaTypeState>({melakarta: true, janya: true})
    function handleRagaTypeToggle(ragaType: RagaType) {
        toggleRagaType({...ragaTypeState, [ragaType]: !(ragaTypeState[ragaType])})
    }
    console.log("type:", ragaTypeState)

    const [swaraCountState, toggleSwaraCount] = useState<SwaraCountState>({five: true, six: true, seven: true, others: true})
    function handleSwaraCountToggle(countVal: RagaSwaraCountVal) {
        toggleSwaraCount({...swaraCountState, [countVal]: !(swaraCountState[countVal])})
    }
    console.log("swaraCount:", swaraCountState)

    const [sortByValue, updateSortBy] = useState<RagaSortOption>("name")
    function handleSortByChange(value: RagaSortOption) {
        updateSortBy(value)
    }


    useEffect(() => {
        filterData(data
            .filter((raga: Raga) =>
                (raga.format_name.toLowerCase().startsWith(query.toLowerCase()) || raga.aliases.toLowerCase().includes(query.toLowerCase())) && 
                (getSwaraSelectList().every(swara => raga.arohanam.includes(swara) || raga.avarohanam.includes(swara))) &&
                ((ragaTypeState.melakarta === raga.is_janaka) || (ragaTypeState.janya === raga.is_janya)) &&
                (((raga.arohanam.split(" ").length === 6) && (raga.avarohanam.split(" ").length === 6) && swaraCountState.five) ||
                ((raga.arohanam.split(" ").length === 7) && (raga.avarohanam.split(" ").length === 7) && swaraCountState.six) ||
                ((raga.arohanam.split(" ").length === 8) && (raga.avarohanam.split(" ").length === 8) && swaraCountState.seven) ||
                ((raga.arohanam.split(" ").length != raga.avarohanam.split(" ").length) && swaraCountState.others))
            )
            .sort((a: Raga, b: Raga) => {
                if (sortByValue == "name"){
                    return a.format_name < b.format_name ? -1 : 1
                } else if (sortByValue == "melakarta") {
                    if (a.is_janya && b.is_janya) {
                        if (a.melakarta == b.melakarta) {
                            return a.format_name < b.format_name ? -1 : 1
                        } else {
                            return a.melakarta < b.melakarta ? -1 : 1
                        }
                    } else if (a.is_janya && b.is_janaka) {
                        if (a.melakarta == b.id) {
                            return 1
                        } else {
                            return a.melakarta < b.id ? -1 : 1
                        }
                    } else if (a.is_janaka && b.is_janya) {
                        if (a.id == b.melakarta) {
                            return -1
                        } else {
                            return a.id < b.melakarta ? -1 : 1
                        }
                    } else {
                        return a.id < b.id ? -1 : 1
                    }
                }
            }))
      }, [query, swaraSelectState, ragaTypeState, swaraCountState, sortByValue]);

    const ItemContainer = styled.div<GridItemProps>`
      padding: 0.5rem;
      display: flex;
      width: 33%;
      flex: 1 1 auto;
      align-content: stretch;
      justify-content: center;
    
      @media (max-width: 1024px) {
        width: 50%;
      }

      @media (max-width: 512px) {
        width: 100%;
      }
    `
    
    const ListContainer = styled.div<GridListProps>`
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
    `

    return (
        <Flex
            mt="xl"
            mih={50}
            bg={dark ? 'dark.6' : 'indigo.0'}
            gap="md"
            justify="flex-start"
            align="center"
            direction="column"
            wrap="wrap"
        >
            <Container mt="lg" py="lg" mx="auto" w={{ base: 320, sm: 480, lg: 640 }}>
                <Autocomplete
                    placeholder="Type any Raaga name"
                    size="xl"
                    width={800}
                    icon={<IconSearch />}
                    data={ragaNames} 
                    dropdownPosition="top"
                    onChange={setQuery}
                    onItemSubmit={item => setQuery(item.value)}
                    />
            </Container>
            <Container pb="lg" mx="auto" w="100%">
                <Divider
                    my="xs"
                    labelPosition="center"
                    w="100%"
                    label={
                            <ActionIcon size="lg" onClick={toggle}>
                                <IconAdjustments size="1.625rem" />
                            </ActionIcon>
                    }
                />
                <Collapse in={opened}>
                    <RagaFilter 
                    selectedSwaras={swaraSelectState} 
                    handleSwaraSelect={handleSwaraSelect}
                    ragaTypeState={ragaTypeState}
                    handleRagaTypeToggle={handleRagaTypeToggle}
                    swaraCountState={swaraCountState}
                    handleSwaraCountToggle={handleSwaraCountToggle}
                    sortByValue={sortByValue}
                    handleSortByChange={handleSortByChange}
                    />
                </Collapse>
            </Container>
            <Container pb="lg" mx="auto" w="100%" fluid={true}>
                <VirtuosoGrid 
                components={{
                    Item: ItemContainer,
                    List: ListContainer,
                }}
                style={{ height: '60vh' }} 
                data={filteredData} 
                itemContent={(index, raga) => (
                <ItemContainer data-index={index}>
                    <RagaCard raga={raga} key={raga.id}/>
                </ItemContainer>)} />
            </Container>

        </Flex>
    )
}

export default RagaExplore