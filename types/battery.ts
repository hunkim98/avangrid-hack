export interface Battery {
  name: string
  powerMW: number
  durationH: number
  dischargePrice: number
  chargePrice: number
  cycleLife: number
  batteryInstallCostPerMW?: number
  batterFixedOMCostPerMW?: number
}
