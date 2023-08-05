import { Box, Group } from '@mantine/core'
import { swaraColorMap } from '../SwaraMapping'

const SwaraGradient = (props) => {
    const swaraList = (props.raga.arohanam + props.raga.avarohanam).split(' ')
    const swaraGradient = swaraList.map((swara) => (
        <Box bg={swaraColorMap.get(swara) || "dark.3"} miw={4} h={5}/>
    ))
    return (
        <Group grow spacing={0}>
            {swaraGradient}
        </Group>
    )
}

export default SwaraGradient