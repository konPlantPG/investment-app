import React from 'react';
import { render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import RankingPage from '../ranking-page';
import { API } from 'aws-amplify';

// API.graphqlの呼び出しをモック化
jest.mock('aws-amplify', () => ({
  API: {
    graphql: jest.fn()
  },
  graphqlOperation: jest.fn(),
}));

describe('ランキングページの確認', () => {
  it('stockDatas の最初のアイテムに必要なプロパティが含まれている', async () => {
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
});