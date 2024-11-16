import Resizer from '@/components/graph/d3/Resizer'
import UsMap from '@/components/graph/d3/UsMap'
import Layout from '@/components/Layout'
import { Filter } from '@/types/filter'
import { Flex } from '@mantine/core'
import { useState } from 'react'

interface IndexPageProps {}

const IndexPage: React.FC<IndexPageProps> = () => {
  const [filter, setFilter] = useState<Filter>({ state: null })
  return (
    <Layout>
      <Flex flex={1} h={500}>
        <Resizer>
          <UsMap setFilter={setFilter} filter={filter} width={800} height={600} />
        </Resizer>
      </Flex>
    </Layout>
  )
}

export default IndexPage
