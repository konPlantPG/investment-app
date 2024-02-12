import React, { useState, useEffect } from 'react'
import RankingTemplate from "./components/RankingTemplate"
import { API, Auth } from "aws-amplify"
import { listPOSTS } from "@/src/graphql/queries"

Auth.currentAuthenticatedUser()
  .then(user => console.log(user))
  .catch(err => console.log('ユーザーはサインインしていません', err))

const dummyDatas = 
  {
    "data": {
      "listPOSTS": {
        "items": [
          {
            "id": "31aeee20-3635-4f05-b4c9-74c0daaaef44",
            "name": "test1",
            "price": 150
          },
          {
            "id": "156c9104-50f7-4869-9844-55b55858ca5f",
            "name": "test4",
            "price": 250
          },
          {
            "id": "b3376332-3ccf-4741-995e-0b429ab17823",
            "name": "test2",
            "price": 300
          },
          {
            "id": "3c716a01-8ad5-4e53-b466-e55794aede3f",
            "name": "test3",
            "price": 150
          }
        ]
      }
    }
  }


const RankingPage= () => {
  const[ posts, setPosts ] = useState([])

  const fetchPosts = () => {
    
    API.graphql({
      query: listPOSTS
    })
      .then(postData => {
        const postsList = postData.data.listPOSTS.items
        setPosts(postsList)
      })
      .catch(error => {
        setPosts(dummyDatas.data.listPOSTS.items)
        console.error('エラー発生:', error)
      })
  }
  useEffect(() =>{
    fetchPosts()
  },[])



  return (
    <>
      <RankingTemplate
        posts = {posts}
      />
    </>
  )
}
export default RankingPage