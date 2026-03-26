import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { authContext } from '../../context/AuthContext'
import CardPost from '../Cardpost/CardPost'
import Loding from '../Loding/Loding'
import Error from '../Error/Error'
export default function PostDetails() {
const {userToken} = useContext(authContext)
const { id } = useParams()
function getPostDetails() {
  return axios.get(`https://route-posts.routemisr.com/posts/${id}`, {
    headers: { token: userToken }
  })
}
const {isLoading , data , isError} = useQuery({
  queryKey: ['postDetails', id],
  queryFn: getPostDetails
})
function getAllComments() {
  return axios.get(`https://route-posts.routemisr.com/posts/${id}/comments?page=1&limit=10`, {
    headers: { token: userToken }
  })
}
const {isLoading : allCommentLoading, data : allCommentData, isError : allCommentError} = useQuery({
  queryKey: ['allComment', id],
  queryFn: getAllComments
})
console.log("123465",allCommentData?.data.data.comments);

if (isLoading || allCommentLoading) {
  return <Loding  />
}  
if (isError || allCommentError){
  return <Error />
} 
  return (
    <>
      <CardPost post={data?.data?.data.post}  isPostDetails allCmmData={allCommentData?.data.data.comments  } />
    </>
  )
}
