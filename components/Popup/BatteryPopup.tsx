import { useOptimizerContext } from '../provider/OptimizerContext'
import { Button, Flex, Modal, NumberInput } from '@mantine/core'
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
      <Flex direction={'column'} gap={10}>
        <NumberInput
          label={'Battery Hour'}
          suffix="hr"
          onChange={(e) => {
            setOptions({ ...options, batteryHour: e as number })
          }}
          value={options.batteryHour}
        />
        <NumberInput
          label={'Battery MW'}
          suffix="MW"
          onChange={(e) => {
            setOptions({ ...options, batteryMW: e as number })
          }}
          value={options.batteryMW}
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
          label={'Battery Degradation'}
          onChange={(e) => {
            setOptions({ ...options, batteryDegradation: e as number })
          }}
          suffix="%"
          value={options.batteryDegradation}
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
            setOptions({ ...options, batteryLifeCycle: e as number })
          }}
          value={options.batteryLifeCycle}
        />
        <NumberInput
          label={'Battery Charge Threshold'}
          onChange={(e) => {
            setOptions({ ...options, batteryChargeThreshold: e as number })
          }}
          prefix="$/MW"
          value={options.batteryChargeThreshold}
        />
        <NumberInput
          label={'Battery Discharge Threshold'}
          onChange={(e) => {
            setOptions({ ...options, batteryDischargeThreshold: e as number })
          }}
          prefix="$/MW"
          value={options.batteryDischargeThreshold}
        />
        <Button variant="outline" className="mt-4" onClick={() => setIsOptionOpened(false)}>
          Calculate
        </Button>
      </Flex>
    </Modal>
  )
}

export default BatteryPopup
