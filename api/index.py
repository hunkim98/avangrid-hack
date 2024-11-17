from flask import Flask, request
import numpy as np
import pandas as pd
from pathlib import Path
from battery_sim import revenue_calc
from battery_finance import calc_npv
from pydantic import BaseModel


app = Flask(__name__)


@app.route("/api/python")
def hello_world():
    return "<p>Hello, World!</p>"


@app.route("/api/mock")
def mock_bar():
    # save file
    file_path = Path(__file__).parent / "valentino.csv"
    print(file_path)
    df = pd.read_csv(file_path)
    # print(df)
    return {
        "data": df.to_dict(orient="records"),
        "columns": [{"field": col} for col in df.columns],
    }


class CalculateBody(BaseModel):
    type: str
    battery_power_MW: float
    battery_duration_H: float
    charge_price: float
    discharge_price: float
    cycle_life: int
    cycle_age: int
    discount_rate: float
    site: str
    batteryInstallCostPerMW: float = -1
    batteryOMCostPerMW: float = -1


@app.route("/api/calculate")
def calculate_test():
    # Flas query
    item = CalculateBody(**request.args)
    npv = calc_npv(
        discount_rate=item.discount_rate,
        site=item.site,
        battery_type=item.type,
        power_MW=item.battery_power_MW,
        dur_H=item.battery_duration_H,
        dis_price=item.discharge_price,
        c_price=item.charge_price,
        start_year=2023,
    )
    fcf = revenue_calc(
        site=item.site,
        battery_type=type,
        battery_power_MW=item.battery_power_MW,
        battery_duration_H=item.battery_duration_H,
        discharge_price=item.discharge_price,
        charge_price=item.charge_price,
        cycle_life=item.cycle_life,
    )
    # npv = []
    # fcf = []
    return {
        "npv": npv,
        "fcf": fcf,
    }
    # query
