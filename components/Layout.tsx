import {
  AppShell,
  Burger,
  Button,
  Flex,
  Title,
  ScrollArea,
  Text,
  Select,
  NumberInput,
} from '@mantine/core'
import { ERCOT_REGION, MISO_REGION, PJM_REGION } from '@/data/region'
import { useOptimizerContext } from './provider/OptimizerContext'
import { useFilterContext } from './provider/FilterContext'
import React, { useCallback, useMemo } from 'react'
import BatteryPopup from './Popup/BatteryPopup'
import { useDisclosure } from '@mantine/hooks'
import Resizer from './graph/d3/Resizer'
import { useRouter } from 'next/router'
import { HeaderHeight } from './config'
import UsMap from './graph/d3/UsMap'
import Link from 'next/link'
import axios from 'axios'

interface LayoutProps {
  children: React.ReactNode
  bodyBg?: string
  navbarBg?: string
}

const Layout: React.FC<LayoutProps> = ({ children, bodyBg, navbarBg }) => {
  const [opened, { toggle }] = useDisclosure()
  const router = useRouter()
  const { filter, setFilter } = useFilterContext()
  const { setIsOptionOpened, setOptions, options } = useOptimizerContext()
  const onClickMoreOptions = useCallback(() => {
    setIsOptionOpened(true)
  }, [])
  const gridData = useMemo(() => {
    if (filter.rtoIndex === null) {
      return [...MISO_REGION, ...ERCOT_REGION, ...PJM_REGION]
    } else {
      if (filter.rtoIndex === 0) {
        return MISO_REGION
      } else if (filter.rtoIndex === 1) {
        return ERCOT_REGION
      }
      return PJM_REGION
    }
  }, [filter])
  const onCalculate = useCallback(() => {
    console.log('calculate')
    axios
      .get('/api/optimize', {
        params: {
          filter,
          options,
        },
      })
      .then((res) => {
        console.log(res)
      })
  }, [])

  return (
    <AppShell
      header={{ height: HeaderHeight }}
      navbar={{
        width: 300,
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <BatteryPopup />
      <AppShell.Header>
        <Flex h={'100%'} align={'center'} direction="row" px={10}>
          <Burger
            opened={opened}
            onClick={toggle}
            hiddenFrom="sm"
            size="sm"
            pos="absolute"
          ></Burger>

          <Flex
            flex={1}
            align={'center'}
            gap={10}
            justify={{
              base: 'center',
              sm: 'flex-start',
            }}
          >
            <Title
              order={3}
              visibleFrom="sm"
              style={{ cursor: 'pointer' }}
              onClick={() => {
                router.push('/')
              }}
            >
              Avangrid Optimizer
            </Title>
          </Flex>
        </Flex>
      </AppShell.Header>
      <AppShell.Navbar p="sm" bg={navbarBg} className="overflow-auto">
        <AppShell.Section w="100%">
          <Text>Select RTO</Text>
          <Flex h={200}>
            <Resizer>
              <UsMap setFilter={setFilter} filter={filter} width={800} height={600} />
            </Resizer>
          </Flex>
        </AppShell.Section>
        <AppShell.Section w="100%">
          <Flex direction={'column'} gap={10}>
            <Select label={'Select Grid'} data={gridData} />
            <Flex direction={'column'}>
              <Flex justify={'space-between'}>
                <Text size="sm">Select Battery</Text>
                <Flex onClick={onClickMoreOptions} className="cursor-pointer">
                  <Text size="sm">More Options</Text>
                </Flex>
              </Flex>
              <Select />
            </Flex>
            <NumberInput
              label={'Discount Rate'}
              onChange={(e) => {
                setOptions({ ...options, discountRate: e as number })
              }}
              value={options.discountRate}
              suffix="%"
            />
            <NumberInput
              label={'ITC'}
              onChange={(e) => {
                setOptions({ ...options, itc: e as number })
              }}
              value={options.itc}
              suffix="%"
            />
            <NumberInput
              label={'PTC'}
              onChange={(e) => {
                setOptions({ ...options, ptc: e as number })
              }}
              value={options.ptc}
              suffix="%"
            />
            <Button variant="outline" className="mt-4 mb-10" onClick={onCalculate}>
              Calculate
            </Button>
          </Flex>
        </AppShell.Section>
        <AppShell.Section grow component={ScrollArea}></AppShell.Section>
        {/* <AppShell.Section>
          <Button variant="subtle" w="100%" justify="flex-start" color="gray"></Button>
        </AppShell.Section> */}
      </AppShell.Navbar>
      <AppShell.Main bg={bodyBg}>{children}</AppShell.Main>
    </AppShell>
  )
}

export default Layout
