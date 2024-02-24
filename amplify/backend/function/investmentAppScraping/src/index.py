# 変更する
import json
from stockData import collect_stock_datas


def handler(event, context):
  print('received event:')
  print(event)
  collect_stock_datas.test()   
  return {
      'statusCode': 200,
      'headers': {
          'Access-Control-Allow-Headers': '*',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
      },
      'body': json.dumps('Hello from your new Amplify Python lambda!')
  }