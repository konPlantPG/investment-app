import os
import json
import requests
from stockData import collect_stock_datas

API_URL = os.getenv("APPSYNC_URL")
API_KEY = os.getenv("APPSYNC_API_KEY")

def handler(event, context):
    start_rate = event.get('start_rate')
    end_rate = event.get('end_rate')
    stock_info = collect_stock_datas.collect(start_rate, end_rate)