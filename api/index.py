from flask import Flask
import numpy as np
import pandas as pd
from pathlib import Path


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
