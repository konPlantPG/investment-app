# 変更する
import json
from hogeho import hogehoge

def handler(event, context):
  print('received event:')
  print(event)
  hogehoge.hogehote()   
  return {
      'statusCode': 200,
      'headers': {
          'Access-Control-Allow-Headers': '*',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
      },
      'body': json.dumps('Hello from your new Amplify Python lambda!')
  }