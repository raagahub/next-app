import styled from '@emotion/styled'
import { GridItemProps, GridListProps } from 'react-virtuoso'

export const generateItemContainer = (size: string) => {
    if (size == "fw") {
        return styled.div<GridItemProps>`
        padding: 0.5rem;
        display: flex;
        width: 100%;
        flex: 1 1 auto;
        align-content: stretch;
        justify-content: center;
      `
    } else {
        return styled.div<GridItemProps>`
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
    }

}

export const ItemContainer = styled.div<GridItemProps>`
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

export const ListContainer = styled.div<GridListProps>`
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
    `