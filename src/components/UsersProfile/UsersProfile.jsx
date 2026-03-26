import React from 'react'
import ProfileCard from '../ProfileCard/ProfileCard'
import { useParams } from 'react-router-dom';

export default function UsersProfile() {
  const {id} = useParams();
  return (
    <>
      <ProfileCard userId={id} />
    </>
  )
}
