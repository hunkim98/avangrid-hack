import LabelBarGraph from '../graph/d3/Histogram'
import { Box, Flex, Text } from '@mantine/core'
import Resizer from '../graph/d3/Resizer'
import React from 'react'

export interface ResultItemProps {
  title: string
  npv: number
  irr: number
  yearTotalRevenue: number
  data: Array<[string, number]>
}

const ResultItem: React.FC<ResultItemProps> = ({ title, npv, irr, yearTotalRevenue, data }) => {
  return (
    <Flex w="100%" h={200}>
      <Flex direction={'column'} miw={200}>
        <Box className="rounded-md outline-1">
          <Text>{title}</Text>
          <Text>NPV: ${npv}</Text>
          <Text>IRR: {irr}%</Text>
          <Text>Yearly Revenue: ${yearTotalRevenue}</Text>
        </Box>
      </Flex>
      <Resizer width={'100%'} height={200}>
        <LabelBarGraph
          data={data}
          width={800}
          height={450}
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
