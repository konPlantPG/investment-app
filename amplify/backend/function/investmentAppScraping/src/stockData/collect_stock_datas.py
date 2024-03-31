import os
import numpy as np
import pandas as pd
import yfinance as yf
from tqdm import tqdm
import requests
import json
import uuid

API_URL = os.getenv("API_INVESTMENTAPP_GRAPHQLAPIENDPOINTOUTPUT")
API_KEY = os.getenv("API_INVESTMENTAPP_GRAPHQLAPIKEYOUTPUT")

def collect(start_rate, end_rate):
    if not os.path.isfile('/var/task/stockData/data_j.xls'):
        print(os.getcwd())
        print('東証上場銘柄一覧を[data_j.xls]のファイル名で保存してください。')
        exit()
    
    print('東証上場銘柄一覧を読み込みます。')
    df_data_j = pd.read_excel('/var/task/stockData/data_j.xls', index_col=None)

    df_data_j = df_data_j[df_data_j['市場・商品区分'] != 'REIT・ベンチャーファンド・カントリーファンド・インフラファンド']
    df_data_j = df_data_j[df_data_j['市場・商品区分'] != 'ETF・ETN']
    df_data_j = df_data_j[df_data_j['コード'] != 25935]

    total_codes = len(df_data_j['コード'])
    start_index = int(np.ceil(total_codes * start_rate))
    end_index = int(np.ceil(total_codes * end_rate))

    for ticker in tqdm(df_data_j['コード'][start_index:end_index]):
        ticker_str = str(ticker) + '.T'
        ticker_data = yf.Ticker(ticker_str)  # yfinanceを使用してTickerオブジェクトを取得

        try:
            hist = ticker_data.history(period="1d")
            if not hist.empty:
                latest_date = hist.index[-1].isoformat()
                close_price = hist['Close'].iloc[-1]
                dividend = ticker_data.info['dividendRate'] if 'dividendRate' in ticker_data.info else None
                dividend_yield = ticker_data.info['dividendYield'] * 100 if 'dividendYield' in ticker_data.info else None
            else:
                latest_date = None
                close_price = None
                dividend = None
                dividend_yield = None

            stock_name = df_data_j.loc[df_data_j['コード'] == ticker, '銘柄名'].values[0]

            stock_info = {
                '証券コード': ticker,
                '銘柄名': stock_name,
                '株価': close_price,
                '配当': dividend,
                '配当利回り': dividend_yield,
                '最新株価日付': latest_date
            }

            headers = {
                'Content-Type': 'application/json',
                'x-api-key': API_KEY
            }
            
            mutation = {
                'query': '''
                    mutation CreateStock($id: ID!, $name: String!, $price: Float, $dividend: Float, $createdAt: AWSDateTime!) {
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
                    'dividend': stock_info['配当'],
                    'createdAt': stock_info['最新株価日付']
                }
            }

            response = requests.post(API_URL, headers=headers, data=json.dumps(mutation))
            print(response.json())

        except Exception as e:
            print(f'証券コード {ticker} のデータ取得中にエラーが発生しました: {e}')
