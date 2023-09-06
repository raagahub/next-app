import { DefaultProps, Selectors, MantineNumberSize, Box } from '@mantine/core';
import useStyles, { SwaraGradientStylesParams } from './SwaraGradient.styles';
import styled from '@emotion/styled';
import { swaraHexColorMap } from '../../helpers/SwaraHelpers'

type SwaraGradientStylesNames = Selectors<typeof useStyles>;

interface SwaraGradientProps extends DefaultProps<SwaraGradientStylesNames, SwaraGradientStylesParams> {
    height?: MantineNumberSize;
    raga: {
        id: number;
        name: string;
        format_name: string;
        arohanam: string;
        avarohanam: string;
        melakarta: number;
        is_janaka: boolean;
    };
}

export const SwaraGradient = ({
    classNames,
    styles,
    unstyled,
    height,
    raga,
    className,
    ...others
  }: SwaraGradientProps) => {
    const { classes, cx } = useStyles(
    // First argument of useStyles is styles params
    { height },
    // Second argument is responsible for styles api integration
    { name: 'SwaraGradient', classNames, styles, unstyled }
    );

    const swaraList = (raga.arohanam + raga.avarohanam).split(' ')
    const swaraColors: string[] = []
    
    swaraList.forEach(swara => {
        let color = swaraHexColorMap.get(swara)
        if (color) {swaraColors.push(color)}
    })

    const SwaraGradientComponent = styled.div`
        background-image: linear-gradient(to right, ${swaraColors.join()});
    `;

    return (
        <SwaraGradientComponent className={cx(classes.root, className)} {...others}/>
    )
}