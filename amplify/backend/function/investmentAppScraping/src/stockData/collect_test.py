import os
import numpy as np
import pandas as pd
import yfinance as yf
from tqdm import tqdm
import json
import time

def save_stock_info_to_json(stock_info, filename="stock_info.json"):
    # ファイルが存在しない場合、空の配列を作成
    if not os.path.isfile(filename):
        with open(filename, 'w', encoding='utf-8') as f:
            json.dump([], f, ensure_ascii=False, indent=4)
    
    # 既存のデータを読み込む
    with open(filename, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    # 新しい株式情報を追加
    data.append(stock_info)
    
    # 更新されたデータをファイルに書き戻す
    with open(filename, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=4)

def fetch_stocks_info(tickers, df_data_j):
    # Tickerオブジェクトを作成するための銘柄コードのリストを作成
    ticker_strs = " ".join([f"{ticker}.T" for ticker in tickers])
    # yfinanceで複数の銘柄のデータを一度に取得
    data = yf.download(ticker_strs, period="1d")

    stock_infos = []
    for ticker in tickers:
        ticker_str = f"{ticker}.T"
        try:
            # 各銘柄のデータを取得
            history = data['Close'][ticker_str]
            latest_date = history.index[-1].strftime('%Y-%m-%d') if not history.empty else None
            stock_name = df_data_j.loc[df_data_j['コード'] == ticker, '銘柄名'].values[0]
            stock_info = {
                '証券コード': ticker,
                '銘柄名': stock_name,
                '株価': history[-1] if not history.empty else None,
                '最新株価日付': latest_date
            }
            stock_infos.append(stock_info)
        except Exception as e:
            print(f'証券コード {ticker} のデータ取得中にエラーが発生しました: {e}')
    return stock_infos

def main():
    if not os.path.isfile('data_j.xls'):
        print(f"{os.getcwd()}\n東証上場銘柄一覧を[data_j.xls]のファイル名で保存してください。")
        exit()
        
    print('東証上場銘柄一覧を読み込みます。')
    df_data_j = pd.read_excel('data_j.xls', index_col=None)
    df_data_j = df_data_j[~df_data_j['市場・商品区分'].isin(['REIT・ベンチャーファンド・カントリーファンド・インフラファンド', 'ETF・ETN'])]
    df_data_j = df_data_j[df_data_j['コード'] != 25935]

    total_codes = len(df_data_j['コード'])
    tickers = df_data_j['コード'].tolist()

    # 一度にすべての銘柄の情報を取得
    stock_infos = fetch_stocks_info(tickers, df_data_j)
    for stock_info in stock_infos:
        print(stock_info)
        save_stock_info_to_json(stock_info)

if __name__ == "__main__":
    main()