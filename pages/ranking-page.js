import React, { useState, useEffect } from 'react'
import RankingTemplate from "./components/rankigPageComponents/RankingTemplate"
import { API, graphqlOperation, Auth, AuthModeStrategyType } from 'aws-amplify'
import { listStocks } from "../src/graphql/queries"
import Header from "./components/Header";


const RankingPage= () => {
  const[ stockDatas, setStockDatas ] = useState([])
  

  const fetchStocks = () => {
    API.graphql({
      query: listStocks
    })
      .then(result => {
        setStockDatas(result.data.listStocks.items)
      })
      .catch(error => {
        console.error('エラー発生:', error)
      })
  }

  useEffect(() =>{
    fetchStocks()
  }, [])



  return (
    <>
      <Header/>
      <RankingTemplate
        stockDatas = {stockDatas}
      />
    </>
  )
}
export default RankingPage