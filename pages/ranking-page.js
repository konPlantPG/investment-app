import React, { useState, useEffect } from 'react'
import RankingTemplate from "./components/RankingTemplate"
import { API, graphqlOperation, Auth, AuthModeStrategyType } from 'aws-amplify'
import { listStocks } from "@/src/graphql/queries"


const RankingPage= () => {
  const[ stockDatas, setStockDatas ] = useState([])

  // const fetchPosts = () => {
  //   API.graphql(graphqlOperation(listPOSTS), AuthMode)
  //   .then(postData => {
  //     const postsList = postData.data.listPOSTS.items
  //     setPosts(postsList)
  //   })
  //   .catch(error => {
  //     setPosts(dummyDatas.data.listPOSTS.items)
  //     console.error('エラー発生:', error)
  //   })
  // }

  const fetchStocks = () => {
    API.graphql({
      query: listStocks
    })
      .then(postData => {
        const stockDataList = postData.data.listStocks.items
        setStockDatas(stockDataList)
      })
      .catch(error => {
        console.error('エラー発生:', error)
      })
  }

  useEffect(() =>{
    fetchStocks()
  },[])



  return (
    <>
      <RankingTemplate
        stockDatas = {stockDatas}
      />
    </>
  )
}
export default RankingPage