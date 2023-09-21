import { ReactElement, useEffect, useState } from 'react'
import { Container, Text } from '@mantine/core'
import { VirtuosoGrid, GridItemProps, GridListProps } from 'react-virtuoso'
import DashboardLayout from '../../../layouts/DashboardLayout'
import { initSupabase } from '../../../library/helpers/SupabaseHelpers'
import { databaseErrorNotification } from '../../../library/helpers/NotificationHelpers'
import { Raga } from '../../../library/helpers/RagaHelpers'
import { RagaCard } from '../../../library/components/raga_components/RagaCard/RagaCard'
import { generateItemContainer, ListContainer } from '../../../library/components/raga_components/RagaCard/VirtuosoContainers'

const Bookmarks = () => {
  const { supabase, user } = initSupabase()
  const [loading, setLoading] = useState(false)
  const [bookmarks, setBookmarks] = useState<Raga[]>([])
  const getBookmarks = async () => {
    try {
      setLoading(true)
      let { data, error } = await supabase
        .from('raga_bookmarks')
        .select(`raga_id`)
        .eq('user_id', user?.id)
      if (error) { databaseErrorNotification(error) }
      if (data) {
        const raga_ids = data.map(bookmark => bookmark.raga_id)
        let { data: ragaData, error: ragaError } = await supabase
          .from('ragas')
          .select('*')
          .in('id', raga_ids)
        if (ragaError) { databaseErrorNotification(ragaError) }
        if (ragaData) { setBookmarks(ragaData) }

      }
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    if(user) {
      getBookmarks();
    }
  }, [user])

  const ItemContainer = generateItemContainer("fw")

  return (
    <Container pb="lg" mx="auto" w="100%" fluid={true}>
      <VirtuosoGrid
        components={{
          Item: ItemContainer,
          List: ListContainer,
        }}
        style={{ height: '100vh' }}
        data={bookmarks}
        itemContent={(index, raga) => (
          <ItemContainer data-index={index}>
            <RagaCard raga={raga} key={raga.id} bookmarked={true} />
          </ItemContainer>)} />
    </Container>
  )
}

Bookmarks.getLayout = function getLayout(page: ReactElement) {
  return (
    <DashboardLayout>{page}</DashboardLayout>
  )
}
export default Bookmarks
