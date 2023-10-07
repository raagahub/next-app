import { ActionIcon, Autocomplete, Badge, Box, Button, Card, Collapse, Container, Divider, Flex, Grid, Group, Image, Text, useMantineColorScheme } from '@mantine/core';
import { IconSearch, IconAdjustments } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
import { useState, useEffect } from 'react';
import { Raga, RagaType, RagaTypeState, RagaSwaraCountVal, SwaraCountState, RagaSortOption } from '../../helpers/RagaHelpers'
import { RagaCard } from '../RagaCard/RagaCard';
import { RagaFilter } from './RagaFilter/RagaFilter'
import { swaraSelectStartState, Swara, SwaraSelectState } from '../../helpers/SwaraHelpers'
import { VirtuosoGrid } from 'react-virtuoso'
import { ItemContainer, ListContainer } from '../RagaCard/VirtuosoContainers'
import { initSupabase } from '../../helpers/SupabaseHelpers'
import { databaseErrorNotification } from '../../helpers/NotificationHelpers'
import useStyles from './RagaExplore.styles';

// let data = require('./ragas.json');

const RagaExplore = () => {
    const [opened, { toggle }] = useDisclosure(false);
    const { colorScheme, toggleColorScheme } = useMantineColorScheme();
    const dark = colorScheme === 'dark';
    const { classes } = useStyles();

    const { supabase, user } = initSupabase()

    const [loading, setLoading] = useState(false)
    const [data, setData] = useState<Raga[]>([])

    const getRagas = async () => {
        try {
            setLoading(true);
            let { data, error } = await supabase
                .from('ragas')
                .select('*, raga_comments (count), raga_videos (count)')
            if (error) { databaseErrorNotification(error) };
            if (data) { 
                console.log(data)
                setData(data.map((raga)=>({
                    ...raga,
                    raga_comments_cnt: raga.raga_comments[0].count,
                    raga_videos_cnt: raga.raga_videos[0].count
                }))) 
            };
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    const [bookmarks, setBookmarks] = useState<any[]>([])
    const getBookmarks = async () => {
        try {
            setLoading(true)
            let { data, error } = await supabase
                .from('raga_bookmarks')
                .select(`raga_id`)
                .eq('user_id', user?.id)
            if (error) { databaseErrorNotification(error) }
            if (data) { setBookmarks(data.map(bookmark => bookmark.raga_id)) }
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    const [filteredData, filterData] = useState<Raga[]>([])

    const ragaNames = filteredData.map(
        (raga: Raga) => raga.format_name
    )

    const [query, setQuery] = useState("")

    const [swaraSelectState, updateSwaraSelect] = useState<SwaraSelectState>(swaraSelectStartState)
    function handleSwaraSelect(swara: Swara) {
        updateSwaraSelect({
            ...swaraSelectState,
            [swara]: !(swaraSelectState[swara])
        })
    }
    function getSwaraSelectList(): (keyof SwaraSelectState)[] {
        return Object.keys(swaraSelectState).filter(key => swaraSelectState[key as keyof SwaraSelectState]) as (keyof SwaraSelectState)[];
    }
    console.log("swaraSelect:", getSwaraSelectList())

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
        getRagas();
    }, [])

    useEffect(() => {
        if (user) {
            getBookmarks();
        }
    }, [user])

    useEffect(() => {
        if (data.length === 0) return;

        const filteredRagas = data
            .filter((raga: Raga) =>
                (raga.format_name.toLowerCase().startsWith(query.toLowerCase()) || raga.aliases?.toLowerCase().includes(query.toLowerCase())) && 
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
                return 0
            })

        filterData(filteredRagas)
        
      }, [data, bookmarks, query, swaraSelectState, ragaTypeState, swaraCountState, sortByValue]);

    return (
        <Box className={classes.container} pt={32}>
            <Container mt="lg" py="lg" mx="auto" w={{ base: 320, sm: 480, lg: 640 }}>
                <Autocomplete
                    placeholder="Search for a Raga"
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
                <Text align='right' color="dark.3" weight={300} mb={16}>Showing {filteredData.length} Results</Text>
                <VirtuosoGrid 
                components={{
                    Item: ItemContainer,
                    List: ListContainer,
                }}
                style={{ height: '60vh' }} 
                data={filteredData} 
                itemContent={(index, raga) => (
                <ItemContainer data-index={index}>
                    <RagaCard raga={raga} key={raga.id} bookmarked={bookmarks.includes(raga.id)}/>
                </ItemContainer>)} />
            </Container>

        </Box>
    )
}

export default RagaExplore