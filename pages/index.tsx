import { useResultContext } from '@/components/provider/ResultContext'
import { Center, Flex, Select, Title } from '@mantine/core'
import ResultItem from '@/components/Result/ResultItem'
import Resizer from '@/components/graph/d3/Resizer'
import { HeaderHeight } from '@/components/config'
import UsMap from '@/components/graph/d3/UsMap'
import { MISO_REGION } from '@/data/region'
import { Batteries } from '@/data/battery'
import Layout from '@/components/Layout'
import { Filter } from '@/types/filter'
import { RTO_NAME } from '@/data/rto'
import { useState } from 'react'

interface IndexPageProps {}

const IndexPage: React.FC<IndexPageProps> = () => {
  const { results } = useResultContext()

  return (
    <Layout>
      <Flex direction={'column'} justify={'center'} gap={25}>
        {results.length === 0 && (
          <Center>
            <Title order={4} fw={300}>
              Please select a region and the battery type on the left to see its effect
            </Title>
          </Center>
        )}
        {results.map((result, index) => (
          <ResultItem
            key={result.createdAt}
            {...result}
            isLast={index === results.length - 1}
            index={index}
            lifeYear={result.lifeYear || 0}
          />
        ))}
      </Flex>
    </Layout>
  )
}

export default IndexPage
