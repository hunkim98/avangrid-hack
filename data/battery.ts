import { Battery } from '@/types/battery'

export const Batteries: Array<Battery> = [
  {
    name: 'Lithium-Ion',
    capitalCostMin: 139,
    capitalCostMax: 139,
    annualOMCostMin: 5,
    annualOMCostMax: 15,
    annualDegradationMin: 0.5,
    annualDegradationMax: 1,
    cycleLifeMin: 2000,
    cycleLifeMax: 5000,
    twentyYearLifeCycleCostMin: 200,
    twentyYearLifeCycleCostMax: 400,
  },
  {
    name: 'LDES (Solid-State)',
    capitalCostMin: 232,
    capitalCostMax: 232,
    annualOMCostMin: 8,
    annualOMCostMax: 20,
    annualDegradationMin: 0.2,
    annualDegradationMax: 0.5,
    cycleLifeMin: 5000,
    cycleLifeMax: 10000,
    twentyYearLifeCycleCostMin: 400,
    twentyYearLifeCycleCostMax: 600,
  },
  {
    name: 'Sodium-Ion',
    capitalCostMin: 87,
    capitalCostMax: 87,
    annualOMCostMin: 3,
    annualOMCostMax: 10,
    annualDegradationMin: 0.5,
    annualDegradationMax: 1,
    cycleLifeMin: 1500,
    cycleLifeMax: 3500,
    twentyYearLifeCycleCostMin: 200,
    twentyYearLifeCycleCostMax: 350,
  },
  {
    name: 'Vanadium Flow (VRFB)',
    capitalCostMin: 125,
    capitalCostMax: 125,
    annualOMCostMin: 10,
    annualOMCostMax: 20,
    annualDegradationMin: 0.1,
    annualDegradationMax: 0.3,
    cycleLifeMin: 10000,
    cycleLifeMax: 20000,
    twentyYearLifeCycleCostMin: 450,
    twentyYearLifeCycleCostMax: 750,
  },
  {
    name: 'Lead-Acid (VRLA)',
    capitalCostMin: 50,
    capitalCostMax: 150,
    annualOMCostMin: 3,
    annualOMCostMax: 10,
    annualDegradationMin: 1,
    annualDegradationMax: 2,
    cycleLifeMin: 500,
    cycleLifeMax: 1000,
    twentyYearLifeCycleCostMin: 150,
    twentyYearLifeCycleCostMax: 300,
  },
]