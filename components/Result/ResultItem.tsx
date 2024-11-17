import { Badge, Box, Flex, Text } from '@mantine/core'
import LabelBarGraph from '../graph/d3/Histogram'
import Resizer from '../graph/d3/Resizer'
import React from 'react'

export interface ResultItemProps {
  title: string
  npv: number
  irr: number
  yearTotalRevenue: number
  data: Array<[string, number]>
  graphId: string
}

const ResultItem: React.FC<ResultItemProps> = ({
  title,
  npv,
  irr,
  yearTotalRevenue,
  data,
  graphId,
}) => {
  return (
    <Flex w="100%" h={200} className="relative">
      <Flex direction={'column'} miw={200}>
        <Box className="rounded-md outline-1">
          <Badge variant="outline" className="mb-2" color="dark">
            {title}
          </Badge>
          <Flex direction={'column'} gap={5}>
            <Text size={'xs'}>Net Present Value</Text>
            <Text fw={'bold'} size="xl" mt={-5}>
              ${npv.toLocaleString()}
            </Text>
          </Flex>
          <Flex direction={'column'}>
            <Text size={'xs'}>Internal Revenue Return</Text>
            <Text fw={'bold'} size="xl" mt={-5}>
              {irr}%
            </Text>
          </Flex>
          <Flex direction={'column'}>
            <Text size={'xs'}>Yearly Revenue</Text>
            <Text fw={'bold'} size="xl" mt={-5}>
              ${yearTotalRevenue.toLocaleString()}
            </Text>
          </Flex>
        </Box>
      </Flex>
      <Resizer width={'100%'}>
        <LabelBarGraph
          data={data}
          width={800}
          height={450}
          graphId={graphId}
          margin={{
            top: 20,
            right: 20,
            bottom: 40,
            left: 20,
          }}
        />
      </Resizer>
    </Flex>
  )
}

export default ResultItem
