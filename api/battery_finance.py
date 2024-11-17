import battery_sim as sim
import battery_installation_costs as instal
import battery_om_costs as om
from datetime import datetime
import numpy as np

cur_year = datetime.now().year


def calc_fcf(site, battery_type, power_MW, dur_H, dis_price, c_price, start_year=cur_year):
    life_annual_revenue = sim.revenue_calc(site, battery_type, power_MW, dur_H, dis_price, c_price)
    install_cost = instal.predict_total_installed_cost(power_MW, dur_H, start_year)
    fcf = []
    for i in life_annual_revenue.keys():
        year_num = int(i.split('_')[1])
        year = start_year + year_num
        om_cost = om.predict_maintenance_cost(power_MW, dur_H, year)
        fcf.append(life_annual_revenue[i] - om_cost)

    fcf[0] - install_cost
    return fcf

def calc_npv(discount_rate, site, battery_type, power_MW, dur_H, dis_price, c_price, start_year=cur_year):
    fcf = calc_fcf(site, battery_type, power_MW, dur_H, dis_price, c_price, start_year)
    npv = 0.0
    for t, cash_flow in enumerate(fcf):
        npv += cash_flow / ((1 + discount_rate) ** t)
    return npv


if __name__ == "__main__":
    npv = calc_npv(0.2, 'howling_gale', 'lithium-ion', 1, 10, 50, 25, 2030)
    print(npv)