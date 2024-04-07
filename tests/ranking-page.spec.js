import React from 'react';
import { render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import RankingPage from '../pages/ranking-page';
import { API } from 'aws-amplify';

// API.graphqlの呼び出しをモック化
jest.mock('aws-amplify', () => ({
  API: {
    graphql: jest.fn()
  },
  graphqlOperation: jest.fn(),
}));

describe('ランキングページの確認', () => {
  describe('APIの確認', () =>{
      it('APIが呼び出されている', async () => {
      // モックの戻り値を設定
      API.graphql.mockResolvedValue({
        data: {
          listStocks: {
            items: [
              {
                createdAt: '2021-01-01',
                dividend: 5,
                id: '1',
                name: 'Test Stock',
                price: 100,
                updatedAt: '2021-01-02',
              },
              {
                createdAt: '2021-01-02',
                dividend: 10,
                id: '2',
                name: 'Test Stock',
                price: 200,
                updatedAt: '2021-01-02',
              },
              {
                createdAt: '2021-01-02',
                dividend: 15,
                id: '3',
                name: 'Test Stock',
                price: 300,
                updatedAt: '2021-01-03',
              },
            ],
          },
        },
      });

      // コンポーネントをレンダリング
      const { getByText } = render(<RankingPage />);

      // APIからのデータがレンダリングされるのを待つ
      await waitFor(() => {
        expect(getByText('Test Stock')).toBeInTheDocument();
      });

      // API.graphqlが呼び出されたことを確認
      expect(API.graphql).toHaveBeenCalled(); 
  });
    it('items配列の最初の要素中のキーの数が正しい', async () => {
      // このテストはAPIのモック応答に基づいています
      const response = await API.graphql();  
      // responseから必要なデータにアクセス
      const items = response.data.listStocks.items;  
      // itemsの内容を確認するテストロジック
      expect(Object.keys(items[0])).toHaveLength(6);
    })
  })
})