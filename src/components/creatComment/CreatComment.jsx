import React, { useContext, useRef } from 'react'
import { authContext } from '../../context/AuthContext'
import axios from 'axios'
import {
  ModalBody,
} from "@heroui/react";
import {  useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
export default function CreatComment({post , close , handelRefetch}) {
    const { userToken  } = useContext(authContext)
    const inputCaption = useRef(null)
     const postId =post?.id 
    
    function handelCreatComment(){
      const formDataComment = new  FormData
      if(inputCaption?.current?.value) {
       formDataComment.append('content', inputCaption?.current?.value )
    }
   
   
    return axios.post(`https://route-posts.routemisr.com/posts/${postId}/comments`,formDataComment,{
        headers: { token: userToken } 
        })
    }
    const {mutate,}=  useMutation({
      mutationFn : handelCreatComment ,
      onSuccess: () =>{ 
          close()
          toast.success("Comment created successfully", {autoClose: 2000  ,closeOnClick: true})
          handelRefetch()
      },
      onError: (e) =>{console.log("error", e);
       },
      onSettled: () =>{}
    })
  return (
    < >
       
      <ModalBody className="overflow-y-auto px-6 py-4 scrollbar-thin">
                <div className="w-full space-y-6">
                  <textarea ref={inputCaption}
                    className="w-full h-32 px-4 py-3 text-sm text-gray-700 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-400 resize-none"
                    placeholder="What's on your mind?"
                  />
      
      
                  <div className="flex justify-end items-center gap-4 pt-3 ">
                    
                    <button
                      type="button"
                      onClick={() => mutate()}
                      
                      className="px-8 py-2.5 bg-sky-500 hover:bg-sky-600 text-white font-semibold rounded-full text-base transition disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
                    >
                      Post
                    </button>
                  </div>
                </div>
              </ModalBody>

    </ >
  )
}
