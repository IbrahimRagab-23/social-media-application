import React, { useContext } from 'react'
import CardPost from '../../src/components/Cardpost/CardPost'
import axios from 'axios'
import { authContext } from '../../src/context/AuthContext'
import { useQuery } from '@tanstack/react-query'
import Loding from '../../src/components/Loding/Loding'
import Error from '../../src/components/Error/Error'
import CreatPost from '../../src/components/creatPost/CreatPost'

export default function Home() {
  const { userToken } = useContext(authContext)

  function getPosts() {
   return axios.get("https://route-posts.routemisr.com/posts", {
        headers: { token: userToken }

      })
     
  }
  const { data, isLoading, isError ,refetch} = useQuery({
  queryKey: ['postsQuery'],
  queryFn: getPosts,

  staleTime: 1000 * 60 * 3 ,
}) 
const allPosts= data?.data?.data.posts
console.log(isLoading);
const handelRefetch = function() {
  refetch()
}

if (isLoading) {
  return <Loding  />
}  
if (isError){
  return <Error />
}
  return (
    <>

    <div className="flex flex-col gap-6 my-5 items-center justify-center min-h-screen lg:w-1/2  mx-auto px-4">
    <CreatPost  handelRefetch={handelRefetch}/>
    {allPosts && (
        allPosts.slice(0,20).map((post) => (<CardPost key={post._id} post={post} handelRefetch={handelRefetch} />)) )}
    </div>
    </>
  )
}
