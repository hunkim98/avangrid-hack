import battery_sim as sim
import battery_installation_costs as instal
import battery_om_costs as om
from datetime import datetime
import numpy as np

cur_year = datetime.now().year

import warnings
warnings.filterwarnings("ignore") 


def calc_fcf(site, battery_type, power_MW, dur_H, dis_price, c_price, start_year=cur_year, itc_rate=0.06, install_cost=None, fixed_om_cost=None):
    life_annual_revenue = sim.revenue_calc(site, battery_type, power_MW, dur_H, dis_price, c_price)
    if install_cost is None:
        install_cost = instal.predict_total_installed_cost(power_MW, dur_H, start_year)
    itc_value = install_cost * itc_rate
    fcf = []
    print(f'installation: ${install_cost:.2f}')
    for i in life_annual_revenue.keys():
        year_num = int(i.split('_')[1])
        year = start_year + year_num
        if fixed_om_cost is None:
            om_cost = om.predict_maintenance_cost(power_MW, dur_H, year)
        else:
            om_cost = fixed_om_cost
        revenue = life_annual_revenue[i] * (1.025**year_num)
        fcf.append(revenue - om_cost)

        print(f'{i}: revenue: ${revenue:.2f}, om cost: ${om_cost:.2f}')

    fcf[0] = fcf[0] - install_cost + itc_value
    return fcf

def calc_npv(discount_rate, site, battery_type, power_MW, dur_H, dis_price, c_price, start_year=cur_year, install_cost=None, fixed_om_cost=None):
    fcf = calc_fcf(site, battery_type, power_MW, dur_H, dis_price, c_price, start_year, install_cost, fixed_om_cost)
    npv = 0.0
    for t, cash_flow in enumerate(fcf):
        npv += cash_flow / ((1 + discount_rate) ** t)
    return npv


if __name__ == "__main__":
    npv = calc_npv(0.1, 'salmon_valley', 'lithium-ion', power_MW=1.81, dur_H=1, dis_price=50, c_price=20, start_year=2022)
    print(npv)