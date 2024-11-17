import { Badge, Blockquote, Box, Divider, Flex, Text, Title } from '@mantine/core'
import { IconX, IconXboxA, IconXboxX, IconXxx } from '@tabler/icons-react'
import { useResultContext } from '../provider/ResultContext'
import LabelBarGraph from '../graph/d3/Histogram'
import Resizer from '../graph/d3/Resizer'
import React from 'react'

export interface ResultItemProps {
  npv: number
  lifeYear: number
  data: Array<[string, number]>
  isLast: boolean
  index: number
  type: null | string
  batteryHour: number
  batteryMW: number
  lifeCycle: number
  createdAt: string
}

const ResultItem: React.FC<ResultItemProps> = ({
  npv,
  // irr,
  lifeYear,
  data,
  index,
  type,
  batteryHour,
  batteryMW,
  lifeCycle,
  isLast = false,
  createdAt,
}) => {
  const { removeResult } = useResultContext()
  return (
    <Flex w="100%" className="relative">
      <Flex direction={'column'} miw={200}>
        <Flex className="rounded-md" direction={'column'}>
          <Flex wrap={'wrap'}>
            {type && (
              <Badge variant="outline" className="mb-2" color="dark">
                {type.split('(')[0]}
              </Badge>
            )}
          </Flex>
          <Blockquote color="green" p={5} mb={10}>
            <Flex direction={'column'}>
              <Text size={'sx'}>Battery Hour: {batteryHour} Hr</Text>
              <Divider />
              <Text size={'sx'}>Batter Power: {batteryMW} MW</Text>
              <Divider />
              <Text size={'sx'}>Battery Cycle: {lifeCycle}</Text>
            </Flex>
          </Blockquote>
          <Flex direction={'column'} gap={5}>
            <Flex direction={'column'}>
              <Text size={'xs'}>Net Present Value</Text>
              <Text fw={'bold'} size="xl" mt={-5}>
                ${npv.toLocaleString()}
              </Text>
            </Flex>
            {/* <Flex direction={'column'}>
            <Text size={'xs'}>Internal Revenue Return</Text>
            <Text fw={'bold'} size="xl" mt={-5}>
              {irr}%
            </Text>
          </Flex> */}
            <Flex direction={'column'}>
              <Text size={'xs'}>Maximum Use Year</Text>
              <Text fw={'bold'} size="xl" mt={-5}>
                {lifeYear.toLocaleString()} years
              </Text>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
      <Box pos="absolute" right={0} top={0} className="border border-1 z-50">
        <IconX
          className="cursor-pointer z-50"
          onClick={() => {
            removeResult(index)
          }}
        ></IconX>
      </Box>

      <Flex flex={1} direction={'column'}>
        <Text size={'xs'}>Future Revenues</Text>
        <Resizer width={'100%'}>
          <LabelBarGraph
            data={data}
            width={800}
            height={0}
            graphId={
              'graph' + createdAt
                ? createdAt
                    .replaceAll(':', '')
                    .replaceAll(' ', '')
                    .replaceAll('-', '')
                    .replaceAll('.', '')
                : ''
            }
            margin={{
              top: 20,
              right: 20,
              bottom: 20,
              left: 20,
            }}
          />
        </Resizer>
      </Flex>
    </Flex>
  )
}

export default ResultItem
