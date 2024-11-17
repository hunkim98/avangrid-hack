import battery_sim as sim
import battery_installation_costs as instal
import battery_om_costs as om
from datetime import datetime

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


if __name__ == "__main__":
    fcf = calc_fcf('Mantero', 'lithium-ion', 10, 5, 50, 15, 2024)
    print(fcf)