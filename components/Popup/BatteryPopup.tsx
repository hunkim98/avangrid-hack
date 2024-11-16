import { useOptimizerContext } from '../provider/OptimizerContext'
import { Flex, Modal, NumberInput } from '@mantine/core'
import React from 'react'

function BatteryPopup() {
  const { isOptionOpened, setIsOptionOpened, options, setOptions } = useOptimizerContext()
  return (
    <Modal
      opened={isOptionOpened}
      onClose={() => {
        setIsOptionOpened(false)
      }}
      title="Battery Customization"
    >
      <Flex direction={'column'}>
        <NumberInput
          label={'Battery Hour'}
          suffix="hr"
          onChange={(e) => {
            setOptions({ ...options, batteryHour: e as number })
          }}
        />
        <NumberInput
          label={'Battery MW'}
          suffix="MW"
          onChange={(e) => {
            setOptions({ ...options, batteryMW: e as number })
          }}
        />
        <NumberInput
          label={'Battery Install Cost Per MW'}
          onChange={(e) => {
            setOptions({ ...options, batteryInstallCostPerMW: e as number })
          }}
          suffix="$/MW"
        />
        <NumberInput
          label={'Battery Degradation'}
          onChange={(e) => {
            setOptions({ ...options, batteryDegradation: e as number })
          }}
          suffix="%"
        />
        <NumberInput
          label={'Battery Fixed OM Cost Per MW'}
          onChange={(e) => {
            setOptions({ ...options, batterFixedOMCostPerMW: e as number })
          }}
          suffix="$/MW"
        />
        <NumberInput
          label={'Battery Life Cycle'}
          onChange={(e) => {
            setOptions({ ...options, batteryLifeCycle: e as number })
          }}
        />
        <NumberInput
          label={'Battery Charge Threshold'}
          onChange={(e) => {
            setOptions({ ...options, batteryChargeThreshold: e as number })
          }}
          prefix="$/MW"
        />
        <NumberInput
          label={'Battery Discharge Threshold'}
          onChange={(e) => {
            setOptions({ ...options, batteryDischargeThreshold: e as number })
          }}
          prefix="$/MW"
        />
        <NumberInput
          label={'ITC'}
          onChange={(e) => {
            setOptions({ ...options, itc: e as number })
          }}
          suffix="%"
        />
        <NumberInput
          label={'PTC'}
          onChange={(e) => {
            setOptions({ ...options, ptc: e as number })
          }}
          suffix="%"
        />
      </Flex>
    </Modal>
  )
}

export default BatteryPopup
