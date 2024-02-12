import React, { useState, useEffect } from 'react'
import RankingTemplate from "./components/RankingTemplate"
import { API, Auth } from "aws-amplify"
import { listPOSTS } from "@/src/graphql/queries"

Auth.currentAuthenticatedUser()
  .then(user => console.log(user))
  .catch(err => console.log('ユーザーはサインインしていません', err));

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