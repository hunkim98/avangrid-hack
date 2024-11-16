import Resizer from '@/components/graph/d3/Resizer'
import { Flex, Select, Title } from '@mantine/core'
import UsMap from '@/components/graph/d3/UsMap'
import { MISO_REGION } from '@/data/region'
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
        <Select label={'Industry Location'} data={MISO_REGION} value={'None'} />
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
