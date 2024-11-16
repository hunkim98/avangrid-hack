import Resizer from '@/components/graph/d3/Resizer'
import { Flex, Select, Title } from '@mantine/core'
import UsMap from '@/components/graph/d3/UsMap'
import { Batteries } from '@/data/battery'
import Layout from '@/components/Layout'
import { Filter } from '@/types/filter'
import { RTO_NAME } from '@/data/rto'
import { useState } from 'react'

interface IndexPageProps {}

const IndexPage: React.FC<IndexPageProps> = () => {
  const [filter, setFilter] = useState<Filter>({ state: null, rtoIndex: null })

  return (
    <Layout>
      <Flex direction={'column'} justify={'center'} gap={10}>
        <Flex flex={1} h={400}>
          <Flex direction={'column'} flex={1} h={400} maw={500}>
            <Resizer>
              <UsMap setFilter={setFilter} filter={filter} width={800} height={600} />
            </Resizer>
          </Flex>
          {filter.rtoIndex !== null && <Title>{RTO_NAME[filter.rtoIndex]}</Title>}
        </Flex>
        <Select
          label={'Industry Location'}
          data={Batteries.map((val) => val.name)}
          value={'None'}
        />
        <Select
          label={'Battery Storage Choice'}
          data={Batteries.map((val) => val.name)}
          value={Batteries[0].name}
        />
      </Flex>
    </Layout>
  )
}

export default IndexPage
