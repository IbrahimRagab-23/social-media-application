import React, { useContext, useRef, useState } from 'react'
import { GalleryAdd } from 'iconsax-reactjs'
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  
} from "@heroui/react";
import { authContext } from '../../context/AuthContext';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'react-toastify';
import EditPostCreat from '../EditPostOrCreat/EditPostCreat';

export default function CreatPost({handelRefetch}) {
  const { userToken ,profileImg,profileUserName } = useContext(authContext)
  const {isOpen, onOpen, onOpenChange} = useDisclosure()
  const [isImg, setisImg] = useState(null)
  const inputImgRef = useRef(null)
  const inputCaption = useRef(null)
  
  function handleImg(e){
    const file = e.target.files[0];
    setisImg(URL.createObjectURL(file));
  }
  function clearImage(){
    setisImg(null)
    inputImgRef.current.value = null
  }
  function handelCreatPost(){
    const formDataPost = new FormData( );
    console.log("creat", formDataPost);
    
    if(inputCaption.current.value) {
       formDataPost.append('body',inputCaption.current.value )
    }
    if(inputImgRef.current?.files?.[0]) {
      formDataPost.append('image', inputImgRef.current.files[0] )
    }
    return axios.post("https://route-posts.routemisr.com/posts",formDataPost,{
    headers: { token: userToken } 
    }
    )
  } 
  const { mutate , } = useMutation({
    mutationFn : handelCreatPost ,
    onSuccess: function() {
      clearImage()
       onOpenChange(false)
       handelRefetch()
      toast.success("Post created successfully", {autoClose: 1800  ,closeOnClick: true})

    },
    onError: (e) =>{console.log("error", e);
     },
  })
  return (
    <>
   <div className="flex justify-between flex-col w-full rounded-2xl  bg-white gap-2.5 px-3 py-2 shadow-sm  text-sm font-semibold">
            <div className='w-full flex items-center gap-4'>
                <img className="w-10 h-10 rounded-full object-cover" src={profileImg}  />
                <span className="text-sm text-gray-400 font-medium">{profileUserName}</span>
            </div>
            <div className="w-full">
                <textarea onClick={onOpen}
                    className="w-full h-28 px-3 py-2 text-sm text-gray-700 bg-gray-100   rounded-lg focus:outline-none focus:border-none "
                    placeholder="What's on your mind?"
                ></textarea>
                
            </div>

       
     </div>
  
    <>

<EditPostCreat mutate={mutate} inputCaption={inputCaption} inputImgRef={inputImgRef}  handleImg={handleImg}  isOpen={isOpen} isImg={isImg} clearImage={clearImage} onOpen={onOpen} onOpenChange={onOpenChange} />
    </>
    </>
  )
}
