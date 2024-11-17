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
  Badge,
} from '@mantine/core'
import { ERCOT_REGION, MISO_REGION, PJM_REGION, RTO_GRID } from '@/data/region'
import { useOptimizerContext } from './provider/OptimizerContext'
import { useFilterContext } from './provider/FilterContext'
import React, { useCallback, useMemo } from 'react'
import BatteryPopup from './Popup/BatteryPopup'
import { useDisclosure } from '@mantine/hooks'
import { IconX } from '@tabler/icons-react'
import { Batteries } from '@/data/battery'
import { RTO, RTO_NAME } from '@/data/rto'
import Resizer from './graph/d3/Resizer'
import { Filter } from '@/types/filter'
import { useRouter } from 'next/router'
import { HeaderHeight } from './config'
import UsMap from './graph/d3/UsMap'
import Link from 'next/link'
import axios from 'axios'
import * as d3 from 'd3'

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
  const onCalculate = useCallback(
    (e: React.MouseEvent) => {
      console.log('calculate')
      const params: {
        type: string
        battery_power_MW: number
        battery_duration_H: number
        charge_price: number
        discharge_price: number
        cycle_life: number
        cycle_age: number
        discount_rate: number
        site: string
        battery_install_cost_per_MW?: number
        batter_fixed_OM_cost_per_MW?: number
      } = {
        type: options.batteryType || '',
        battery_power_MW: options.batteryPowerMW,
        battery_duration_H: options.batteryDurationH,
        charge_price: options.chargePrice,
        discharge_price: options.dischargePrice,
        cycle_life: options.batteryCycleLife,
        cycle_age: 0,
        discount_rate: options.discountRate,
        site: filter.gridName || '',
        batter_fixed_OM_cost_per_MW: options.batterFixedOMCostPerMW,
        battery_install_cost_per_MW: options.batteryInstallCostPerMW,
      }
      console.log('params', params)
      axios
        .get('/model/api/calculate', {
          // .get('https://avangrid-model.vercel.app/api/calculate', {
          // .get('https://avangrid-model.vercel.app/api/calculate', {
          params: {
            ...params,
          },
        })
        .then((res) => {
          console.log(res)
        })
      e.preventDefault()
    },
    [filter, options]
  )

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
          <Flex gap={10}>
            <Text size="sm" fw={500}>
              Select RTO
            </Text>
            {filter.rtoIndex !== null && (
              <Badge
                style={{
                  backgroundColor: d3
                    .scaleOrdinal()
                    .domain(RTO.map((_, i) => i.toString()))
                    .range(d3.schemeGreens[RTO.length > 9 ? 9 : RTO.length])(
                    filter.rtoIndex.toString()
                  ) as string,
                }}
              >
                <Flex
                  align={'center'}
                  gap={10}
                  style={{
                    color: 'black',
                  }}
                >
                  {RTO_NAME[filter.rtoIndex]}{' '}
                  <IconX
                    size={10}
                    onClick={() =>
                      setFilter({
                        ...filter,
                        rtoIndex: null,
                        state: null,
                      })
                    }
                  />
                </Flex>
              </Badge>
            )}
          </Flex>

          <Flex h={200}>
            <Resizer>
              <UsMap setFilter={setFilter} filter={filter} width={800} height={600} />
            </Resizer>
          </Flex>
        </AppShell.Section>
        <AppShell.Section w="100%">
          <Flex direction={'column'} gap={10}>
            <Select
              label={'Select Grid'}
              data={gridData}
              onChange={(e) => {
                if (!e) {
                  setFilter({ ...filter, gridName: null })
                }
                console.log(e)
                setFilter({ ...filter, gridName: e as string })
              }}
            />
            <Flex direction={'column'}>
              <Flex justify={'space-between'} align={'center'}>
                <Text size="sm">Battery Type</Text>
                <Flex onClick={onClickMoreOptions} className="cursor-pointer">
                  <Badge size="sm" className="cursor-pointer" color="green">
                    Customize
                  </Badge>
                </Flex>
              </Flex>
              <Select
                data={Batteries.map((battery) => ({
                  value: battery.name,
                  label: battery.name,
                }))}
                onChange={(e) => {
                  if (!e) {
                    return
                  }
                  const batterInfo = Batteries.find((b) => b.name === e)
                  // we set the saved battery info to the options
                  setOptions({
                    ...options,
                    batteryDurationH: batterInfo?.durationH || 0,
                    batteryPowerMW: batterInfo?.powerMW || 0,
                    batteryInstallCostPerMW: batterInfo?.batteryInstallCostPerMW || 0,
                    batterFixedOMCostPerMW: batterInfo?.batterFixedOMCostPerMW || 0,
                    batteryCycleLife: batterInfo?.cycleLife || 0,
                    chargePrice: batterInfo?.chargePrice || 0,
                    dischargePrice: batterInfo?.dischargePrice || 0,
                  })
                }}
              />
            </Flex>
            <NumberInput
              label={'Discount Rate'}
              labelProps={{ color: 'white' }}
              onChange={(e) => {
                setOptions({ ...options, discountRate: e as number })
              }}
              value={options.discountRate}
              suffix="%"
            />
            <NumberInput
              label={'Battery Charge Threshold Price ($/MWh)'}
              onChange={(e) => {
                setOptions({ ...options, chargePrice: e as number })
              }}
              suffix="$/MWh"
              value={options.chargePrice}
            />
            <NumberInput
              label={'Battery Discharge Threshold Price ($/Mwh)'}
              onChange={(e) => {
                setOptions({ ...options, dischargePrice: e as number })
              }}
              suffix="$/MWh"
              value={options.dischargePrice}
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
            <Button variant="outline" className="mt-4 mb-10" onClick={onCalculate} color="green">
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
