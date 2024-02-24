import os
import pandas as pd
from yahooquery import Ticker
from tqdm import tqdm

def main():
    # 東証上場銘柄一覧を読み込む
    if not os.path.isfile('./data_j.xls'):
        print('東証上場銘柄一覧を[data_j.xls]のファイル名で保存してください。')
        exit()
    
    print('東証上場銘柄一覧を読み込みます。')
    df_data_j = pd.read_excel('./data_j.xls', index_col=None)

    # 出力用のデータフレームを用意
    df_stock_info = pd.DataFrame()

    for ticker in tqdm(df_data_j['コード']):
        ticker_num = str(ticker) + '.T'
        ticker_data = Ticker(ticker_num)

        try:
            summary_detail = ticker_data.summary_detail[ticker_num]
            stock_info = {
                '証券コード': ticker,
                '株価': summary_detail.get('regularMarketPrice', None),
                '配当': summary_detail.get('dividendRate', None),
                '配当利回り': summary_detail.get('dividendYield', None) * 100  # パーセンテージ表示
            }
           print(stock_info)
           
        except Exception as e:
            print(f'証券コード {ticker} のデータ取得中にエラーが発生しました: {e}')
    

if __name__ == "__main__":
    main()