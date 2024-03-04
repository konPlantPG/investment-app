import os
import numpy as np
import pandas as pd
from yahooquery import Ticker
from tqdm import tqdm
import time
import requests
import json
import uuid

API_URL = os.getenv("API_INVESTMENTAPP_GRAPHQLAPIENDPOINTOUTPUT")
API_KEY = os.getenv("API_INVESTMENTAPP_GRAPHQLAPIKEYOUTPUT")

def collect():
    if not os.path.isfile('/var/task/stockData/data_j.xls'):
        print(os.getcwd())
        print('東証上場銘柄一覧を[data_j.xls]のファイル名で保存してください。')
        exit()
    
    print('東証上場銘柄一覧を読み込みます。')
    df_data_j = pd.read_excel('/var/task/stockData/data_j.xls', index_col=None)

    df_data_j = df_data_j[df_data_j['市場・商品区分'] != 'REIT・ベンチャーファンド・カントリーファンド・インフラファンド']
    df_data_j = df_data_j[df_data_j['市場・商品区分'] != 'ETF・ETN']
    df_data_j = df_data_j[df_data_j['コード'] != 25935]

    
    df_stock_info = pd.DataFrame()
    total_codes = len(df_data_j['コード'])
    start_index = 0
    end_index = int(np.ceil(total_codes * 0.01))

    for ticker in tqdm(df_data_j['コード'][start_index:end_index]):
        ticker_num = str(ticker) + '.T'
        ticker_data = Ticker(ticker_num)

        try:
            summary_detail = ticker_data.summary_detail[ticker_num]
            history = ticker_data.history(period='1d')
            if not history.empty:
                latest_date = history.index.get_level_values('date')[-1].isoformat()
            else:
                latest_date = None

           
            stock_name = df_data_j.loc[df_data_j['コード'] == ticker, '銘柄名'].values[0]

            stock_info = {
                '証券コード': ticker,
                '銘柄名': stock_name,
                '株価': summary_detail.get('regularMarketPreviousClose', None),
                '配当': summary_detail.get('dividendRate', None),
                '配当利回り': summary_detail.get('dividendYield', None) * 100 if summary_detail.get('dividendYield') is not None else None,
                '最新株価日付': latest_date
            }

            headers = {
            'Content-Type': 'application/json',
            'x-api-key': API_KEY
            }
            
            mutation = {
                'query': '''
                    mutation CreateStock($id: ID!, $name: String!, $price: Float, $dividend: Int, $createdAt: AWSDateTime!) {
                    createStock(input: {id: $id, name: $name, price: $price, dividend: $dividend, createdAt: $createdAt}) {
                        id
                        name
                        price
                        dividend
                        createdAt
                    }
                    }
                ''',
                'variables': {
                    'id': str(uuid.uuid1()),
                    'name': stock_info['銘柄名'],
                    'price': stock_info['株価'],
                    'dividend': stock_info['配当'],
                    'createdAt': stock_info['最新株価日付']
                }
            }

            response = requests.post(API_URL, headers=headers, data=json.dumps(mutation))
            print(response.json())

        except Exception as e:
            print(f'証券コード {ticker} のデータ取得中にエラーが発生しました: {e}')