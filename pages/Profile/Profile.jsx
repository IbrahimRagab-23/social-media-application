import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React, { useContext } from 'react'
import { authContext } from '../../src/context/AuthContext'
import ProfileCard from '../../src/components/ProfileCard/ProfileCard';

export default function Profile() {
 const {userToken ,userId}= useContext(authContext)
 function getProfilePage() {
   return axios.get(`https://route-posts.routemisr.com/users/profile-data`, {
    headers: {
      token: userToken,   
    },
  });
}
 const { data,  } = useQuery({
  queryKey: ['profileQuery', userId],
  queryFn: getProfilePage,

  })
  
  return (
    <>
    <ProfileCard dataProfileP={data?.data?.data.user} />
    </>
  )
}
