import { useOptimizerContext } from '@/components/provider/OptimizerContext'
import { useFilterContext } from '@/components/provider/FilterContext'
import { useResultContext } from '@/components/provider/ResultContext'
import axios from 'axios'
import React from 'react'

function useSearch() {
  const { setResults, isLoading, setIsLoading } = useResultContext()
  const { filter, setFilter } = useFilterContext()
  const { options } = useOptimizerContext()
  const search = (batteryType: string) => {
    if (options.batteryType === 'Custom') {
      if (
        options.batteryPowerMW === 0 ||
        options.batteryDurationH === 0 ||
        options.chargePrice === 0 ||
        options.dischargePrice === 0 ||
        options.batteryCycleLife === 0 ||
        options.discountRate === 0
      ) {
        alert('Please fill out all the fields')
        return
      }
    }
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
      type: batteryType || '',
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
    setIsLoading(true)
    axios
      .get('/model/api/calculate', {
        params: {
          ...params,
        },
      })
      .then((res) => {
        const data = res.data as {
          npv: number
          fcf: Array<number>
          rvn: Object
        }
        setResults((prev) => {
          return [
            ...prev,
            {
              npv: data.npv,
              lifeYear: Object.keys(data.rvn).length,
              // data: Object.entries(data.rvn).map((v, i) => [(2023 + i + 1).toString(), v]),
              data: Object.entries(data.rvn).map((v, i) => [(2023 + i + 1).toString(), v[1]]),
              type: batteryType,
            },
          ]
        })
        setIsLoading(false)
      })
      .catch((e) => {
        console.log(e)
        setIsLoading(false)
      })
  }

  return { search }
}

export default useSearch
