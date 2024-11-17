import { useOptimizerContext } from '../provider/OptimizerContext'
import { Button, Flex, Modal, NumberInput } from '@mantine/core'
import { useFilterContext } from '../provider/FilterContext'
import useSearch from '@/hooks/useSearch'
import React from 'react'

function BatteryPopup() {
  const { isOptionOpened, setIsOptionOpened, options, setOptions } = useOptimizerContext()
  const { search } = useSearch()
  const onCalculate = () => {
    setIsOptionOpened(false)
    search('Custom')
    setOptions({ ...options, batteryType: 'Custom' })
  }
  return (
    <Modal
      opened={isOptionOpened}
      onClose={() => {
        setIsOptionOpened(false)
      }}
      title="Battery Customization"
    >
      <Flex direction={'column'} gap={10}>
        <NumberInput
          label={'Battery Hours (H)'}
          suffix="hr"
          onChange={(e) => {
            setOptions({ ...options, batteryDurationH: e as number })
          }}
          value={options.batteryDurationH}
        />
        <NumberInput
          label={'Battery Power (MW)'}
          suffix="MW"
          onChange={(e) => {
            setOptions({ ...options, batteryPowerMW: e as number })
          }}
          value={options.batteryPowerMW}
        />
        <NumberInput
          label={'Battery Install Cost Per MW'}
          onChange={(e) => {
            setOptions({ ...options, batteryInstallCostPerMW: e as number })
          }}
          suffix="$/MW"
          value={options.batteryInstallCostPerMW}
        />
        <NumberInput
          label={'Battery Fixed OM Cost Per MW'}
          onChange={(e) => {
            setOptions({ ...options, batterFixedOMCostPerMW: e as number })
          }}
          suffix="$/MW"
          value={options.batterFixedOMCostPerMW}
        />
        <NumberInput
          label={'Battery Life Cycle'}
          onChange={(e) => {
            setOptions({ ...options, batteryCycleLife: e as number })
          }}
          value={options.batteryCycleLife}
        />
        <Button variant="outline" color="green" className="mt-4" onClick={onCalculate}>
          Calculate
        </Button>
      </Flex>
    </Modal>
  )
}

export default BatteryPopup
