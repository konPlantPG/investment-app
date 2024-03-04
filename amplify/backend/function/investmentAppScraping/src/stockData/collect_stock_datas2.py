import os
import numpy as np
import pandas as pd
from yahooquery import Ticker
from tqdm import tqdm
import time

def test():
    # 東証上場銘柄一覧を読み込む
    if not os.path.isfile('/var/task/stockData/data_j.xls'):
        print(os.getcwd())
        print('東証上場銘柄一覧を[data_j.xls]のファイル名で保存してください。')
        exit()
    
    print('東証上場銘柄一覧を読み込みます。')
    df_data_j = pd.read_excel('/var/task/stockData/data_j.xls', index_col=None)

    # 特定の条件に一致する行を除外
    df_data_j = df_data_j[df_data_j['市場・商品区分'] != 'REIT・ベンチャーファンド・カントリーファンド・インフラファンド']
    df_data_j = df_data_j[df_data_j['市場・商品区分'] != 'ETF・ETN']
    df_data_j = df_data_j[df_data_j['コード'] != 25935]

    # 出力用のデータフレームを用意
    df_stock_info = pd.DataFrame()

    # コードリストの長さを取得
    total_codes = len(df_data_j['コード'])

    # 処理する範囲を計算（ここでは0~10%）
    start_index = int(np.ceil(total_codes * 0.1))
    end_index = int(np.ceil(total_codes * 0.2))

    # tqdmを使用して進捗を表示しながら、指定された範囲のコードを処理
    for ticker in tqdm(df_data_j['コード'][start_index:end_index]):
        ticker_num = str(ticker) + '.T'
        ticker_data = Ticker(ticker_num)

        try:
            summary_detail = ticker_data.summary_detail[ticker_num]
            # 最新の株価データを取得
            history = ticker_data.history(period='1d')
            if not history.empty:
                latest_date = history.index.get_level_values('date')[-1].strftime('%Y-%m-%d')
            else:
                latest_date = None

            # 銘柄名を取得
            stock_name = df_data_j.loc[df_data_j['コード'] == ticker, '銘柄名'].values[0]

            stock_info = {
                '証券コード': ticker,
                '銘柄名': stock_name,  # 銘柄名を追加
                '株価': summary_detail.get('regularMarketPreviousClose', None),
                '配当': summary_detail.get('dividendRate', None),
                '配当利回り': summary_detail.get('dividendYield', None) * 100 if summary_detail.get('dividendYield') is not None else None,
                '最新株価日付': latest_date
            }
            print(stock_info)

        except Exception as e:
            print(f'証券コード {ticker} のデータ取得中にエラーが発生しました: {e}')