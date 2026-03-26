import React, { useContext, useState } from 'react'

import { Command, GalleryAdd, Like1, Message, More, More2, Share } from "iconsax-reactjs";
import Comment from "../comment/Comment";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Card, CardHeader, CardBody, CardFooter, Avatar, Button,
  Dropdown,
  DropdownTrigger,
  DropdownItem,  DropdownMenu, 
  Textarea,
  
} from "@heroui/react";
import CreatComment from '../creatComment/CreatComment';
import { authContext } from '../../context/AuthContext';
import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { useRef } from 'react';
export default function CardPost({post , isPostDetails ,allCmmData , handelRefetch}) {
  const { userId , userToken } = useContext(authContext)
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [isEditPost, setisEditPost] = useState(false)
      const [isImg, setisImg] = useState(post.image)
    const close = () => onOpenChange(false)
// console.log(post._id) 
const inputCaption = useRef(null)
const inputEditImg = useRef(null)
  function handleImg(e){
    const file = e.target.files[0];
    setisImg(URL.createObjectURL(file));
  }
  function clearImage(){
    setisImg(null)
    inputEditImg.current.value = null
    
  }
  function handelCancel (){
     setisImg(post.image)
     setisEditPost(false)
  }
function handelDleete() { 

  return axios.delete(`https://route-posts.routemisr.com/posts/${post._id}`, {
    headers: { token:userToken} 
  })}
  function handelLike(){
  return axios.put(`https://route-posts.routemisr.com/posts/${post._id}/like` ,{},{
    headers: { token :userToken} 
  })}
   const {mutate:mutateLike,}=  useMutation({
        mutationFn : handelLike ,
        
        onSuccess: () =>{ 
          toast.success(" Like successfully", {autoClose: 1800  ,closeOnClick: true})
          setisEditPost(false)
          
          handelRefetch()
        },
        onError: (e) =>{console.log("error edit", e);
         },

  })
  const {mutate,}=  useMutation({
        mutationFn : handelDleete ,
        onSuccess: () =>{ 
            toast.success("Post deleted successfully", {autoClose: 1800  ,closeOnClick: true})
            handelRefetch()
        },
        onError: (e) =>{console.log("Error Like", e);
         },

  })
function handelEditPost() { 
  const formDataEditPost = new FormData( );
  if(inputCaption.current.value) {
       formDataEditPost.append('body',inputCaption.current.value )
    }
  return axios.put(`https://route-posts.routemisr.com/posts/${post._id}`, formDataEditPost ,{
    headers: { token: userToken} 
  })}
  const {mutate:editPost,}=  useMutation({
        mutationFn : handelEditPost ,
        
        onSuccess: () =>{ 
          toast.success("Post edited successfully", {autoClose: 1800  ,closeOnClick: true})
          setisEditPost(false)
          
          handelRefetch()
        },
        onError: (e) =>{console.log("error edit", e);
         },

  })
  
return (
    <Card className={!isPostDetails ?`w-full h-auto  `: `w-1/2 h-auto mx-auto mt-6`} >
      
      <CardHeader className="justify-between">
        <div className="flex gap-5">
          <Avatar
            isBordered
            radius="full"
            size="md"
            className='cursor-pointer'
            src={post?.user?.photo}
          />
          <div className="flex flex-col gap-1 items-start justify-center">
            <h4 className="text-small font-semibold leading-none text-default-600">{post?.user?.name}</h4>
            <h5 className="text-small tracking-tight text-default-400"> { new Date(post?.createdAt).toLocaleDateString("en-US",{
                day: "numeric",
                month: "short",
                year: "numeric",
              
              })}</h5>
          </div>
        </div>

       { userId[0] === post?.user?._id && 
        <>
      


<Dropdown   >
  <DropdownTrigger  className='rounded-[12px] bg-[#9e9eb8] border-[#d9dbdd] shadow-sm'>
    <Button isIconOnly className=' '  variant="light" aria-label="More options">
      <More size={40} className='text-[#e8e9e9] hover:text-[#c5c5c5]  '  variant="Bold" />
    </Button>
  </DropdownTrigger>
  <DropdownMenu aria-label="Static Actions">
    <DropdownItem onClick={() => setisEditPost(true)} key="edit">Edit</DropdownItem>
    <DropdownItem onClick={mutate} key="delete" color="danger">Delete</DropdownItem>
    <DropdownItem key="copy">Copy link</DropdownItem>
  </DropdownMenu>
</Dropdown></>
        
        }

      </CardHeader>
      <CardBody className="h-auto w-full">
        {isEditPost &&  
        <form action="">
          <div className='flex flex-col gap-2'>

                    <Textarea ref={inputCaption} placeholder="Edit your post..." defaultValue={post?.body} />
                    {isEditPost &&   <> { isImg &&
                     <div className="relative w-full h-80 md:h-96 rounded-xl overflow-hidden border border-gray-200 bg-gray-50">

                    <img src={isImg} alt="Post Image" className="w-full  h-full  object-cover rounded-lg mt-4" />
                    <button
                    onClick={clearImage}
                    className="absolute top-3 right-3 bg-black/60 hover:bg-black/80 text-white rounded-full w-8 h-8  transition"
                    type="button">
                      X
                   </button>
                     </div>}
                    </>}                                   
            </div>
       
         <div className="flex justify-between w-full  items-center gap-4 pt-3">
          <div className=''>

            <label className="cursor-pointer ">
              <GalleryAdd className="text-gray-600 hover:text-sky-600" size={28} />
              <input ref={inputEditImg}  onChange={handleImg} type="file" className="hidden" />
            </label>
          </div>
                <div className='flex gap-5'>

             <Button onPress={handelCancel} className="mt-2 bg-gray-500 hover:bg-gray-600 text-white font-semibold rounded-full text-base transition disabled:opacity-50  shadow-md">Cancel</Button>  
          <Button onPress={() => editPost()} className="mt-2 bg-sky-500 hover:bg-sky-600 text-white font-semibold rounded-full text-base transition disabled:opacity-50  shadow-sm">Save</Button>  
                </div>
       
        </div>
        </form>
        }
     {!isEditPost &&  <> {post?.body && <p className="text-zinc-900 text-medium">
          {post?.body}
        </p>}</>}

      {!isEditPost &&  <> {post?.image && <img src={post.image} alt="Post Image" className="w-full  h-full  object-cover rounded-lg mt-4" />}</>}
      </CardBody>
      <CardFooter className="flex flex-col w-full my-2">
        <div className="flex justify-between w-full rounded-2xl bg-[#f8fafc] border-[#d9dbdd] px-3 py-2 shadow-sm  text-sm font-semibold">
        <Button onPress={mutateLike} className="flex gap-1 bg-transparent hover:bg-white/70 transition">
          <Like1 className="text-default-500" size="18" />
          <span className="text-default-500 text-small">{post?.likesCount || 0}</span>
        </Button>
        <Button onPress={onOpen} className="flex gap-1 bg-transparent hover:bg-white/90 transition">
            <Message className="text-default-500" size="18" />
          <span  className="text-default-500 text-small">{post?.commentsCount || 0} Comments</span>
        </Button>
        
        <Button className="flex gap-1 bg-transparent hover:bg-white/90 transition">
            <Share className="text-default-500" size="18" />
          <span className="text-default-500 text-small">{post?.sharesCount || 0}</span>
        </Button>
        </div>
        
          <Comment post={post} isPostDetails={isPostDetails} allCmmData={allCmmData} />
      </CardFooter>
      <>
       <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
        
            <>
              <ModalHeader className="flex flex-col gap-1 text-center">Creat Comment</ModalHeader>
              <CreatComment post={post} handelRefetch={handelRefetch} close={close}/>
             
            </>
       
        </ModalContent>
      </Modal>
      </>
    </Card>
  );
}

