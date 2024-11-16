import Resizer from '@/components/graph/d3/Resizer'
import UsMap from '@/components/graph/d3/UsMap'
import { Flex, Title } from '@mantine/core'
import Layout from '@/components/Layout'
import { Filter } from '@/types/filter'
import { RTO_NAME } from '@/data/rto'
import { useState } from 'react'

interface IndexPageProps {}

const IndexPage: React.FC<IndexPageProps> = () => {
  const [filter, setFilter] = useState<Filter>({ state: null, rtoIndex: null })
  return (
    <Layout>
      <Flex flex={1} h={400}>
        <Flex direction={'column'} flex={1} h={400} maw={500}>
          <Resizer>
            <UsMap setFilter={setFilter} filter={filter} width={800} height={600} />
          </Resizer>
        </Flex>
        {filter.rtoIndex !== null && <Title>{RTO_NAME[filter.rtoIndex]}</Title>}
      </Flex>
    </Layout>
  )
}

export default IndexPage
