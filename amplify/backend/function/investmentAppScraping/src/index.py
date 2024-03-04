import os
import json
import requests
from stockData import collect_stock_datas

API_URL = os.getenv("APPSYNC_URL")
API_KEY = os.getenv("APPSYNC_API_KEY")

def handler(event, context):
    print('received event:')
    print(event)

    headers = {
    'Content-Type': 'application/json',
    'x-api-key': API_KEY
    }
    stock_info = collect_stock_datas.collect()