import { createStyles, MantineNumberSize } from '@mantine/core';

export interface SwaraGradientStylesParams {
  height?: MantineNumberSize;
}

export default createStyles((theme, { height }: SwaraGradientStylesParams) => ({
  root: { height: theme.fn.radius(height) }
}));