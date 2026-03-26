import React, { useContext, useRef, useState } from 'react'
import { Card, CardBody, Button, Divider, Dropdown, DropdownTrigger, DropdownMenu ,DropdownItem, Modal, ModalContent, ModalHeader, ModalBody, useDisclosure } from "@heroui/react";
import axios from 'axios';
import { useMutation, useQuery } from '@tanstack/react-query';
import { authContext } from '../../context/AuthContext';
import CardPost from '../Cardpost/CardPost';
import {GalleryAdd, More, User} from  "iconsax-reactjs";
import { toast } from 'react-toastify';
export default function ProfileCard({dataProfileP}) {
  const {isOpen, onOpen, onOpenChange} = useDisclosure(); 
 const [isImg, setisImg] = useState(null)
   
 const  {userToken ,setprofileImg}=useContext(authContext)
    function getPosts() {

     return axios.get(`https://route-posts.routemisr.com/users/${dataProfileP._id}/posts`, {
          headers: { token: userToken }
  
        })
       
    }
     function clearImage(){
    setisImg(null)
    userImgInput.current.value = null
  }
    const { data,refetch} = useQuery({
    queryKey: ['postsProfileQuery' , dataProfileP?._id ] ,
    queryFn: getPosts,
  
    staleTime: 1000 * 60 * 3 ,
  }) 
  const allPosts= data?.data?.data?.posts
  const handelRefetch = function() {

  refetch()
}
const userImgInput = useRef(null)
function handelinputImg(e){
   const file = e.target.files[0]; 
    setisImg(URL.createObjectURL(file));    
}
function handelUserImg(){
  const formData = new FormData();    
  if (userImgInput.current?.files?.[0]) {
    formData.append('photo', userImgInput.current.files[0]);
  }
  return axios.put("https://route-posts.routemisr.com/users/upload-photo",formData,{
    headers: {token :userToken }
  })
}
 const {mutate   }= useMutation({
    mutationFn: handelUserImg,
    onSuccess : ()=>{
      toast.success("your photo updated", {autoClose:2000 ,closeOnClick:true })
     onOpenChange(false)
    setprofileImg(dataProfileP?.photo)
    handelRefetch()

     
     
    },
    onError : (e)=>{
      toast.warning("try agine later", {autoClose:1800 ,closeOnClick:true })
      console.log("erorrrrrr img", e);
      
    }
 })
  return (
    <>
    <div className="w-full mx-auto px-4 sm:px-6 py-6 mb-9">
      <Card className="w-full bg--[#d9dbdd] text-gray-800 shadow-md border border-gray-200">
        <CardBody className="p-6 sm:p-8 ">

            <div className='relative w-full bg-cyan-700 rounded-2xl h-72 mb-6'>
            <div className='absolute top-5 right-5'><Dropdown   >
              <DropdownTrigger  className='rounded-[12px] bg-[#9e9eb8]  border-[#d9dbdd] shadow-sm'>
                <Button isIconOnly className=' '  variant="light" aria-label="More options">
                  <More size={40} className='text-[#e8e9e9] hover:text-[#c5c5c5]  '  variant="Bold" />
                </Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="Static Actions">

              <DropdownItem  color="default">
               
                  <Button  onPress={onOpen} >
                    
                    UPDATE YOUR IMAGE
                    </Button>  
                           
                  </DropdownItem>
              {/* <DropdownItem  color="default">
                 <Button className='dis' >

                <label  className="cursor-pointer  flex  gap-2 justify-center items-center text-black">
                               <GalleryAdd className="" size={22} /> UPDATE YOUR COVER
                               <input  type="file" className="hidden" />
                             </label>
                 </Button>

                  </DropdownItem> */}

              </DropdownMenu>
              </Dropdown>
              </div>
           {dataProfileP?.cover && 
             <div >
              <img
                src={dataProfileP?.cover}
                alt={`${dataProfileP?.name}`}
                className="w-full h-full object-cover rounded-t-2xl"
              />
            </div>}
          
          <div className="flex absolute -bottom-[60px] left-6 items-center gap-4 ">
           <div className="w-44 h-44 rounded-full overflow-hidden border-4 p-1 border-gray-400 shadow-sm ">
               <img className='w-full h-full rounded-full  bg-amber-400   object-cover' src={dataProfileP?.photo} alt={dataProfileP?.name} />
              </div>
            <div>
              <h2 className="text-xl font-bold">{dataProfileP?.name}</h2>
              <p className="text-black text-sm">{dataProfileP?.username}</p>
            </div>
          </div>
            </div>
              <p className='text-right'>📌 {new Date(dataProfileP?.createdAt).toLocaleDateString("en-US",{
                day: "numeric",
                month: "short",
                year: "numeric",
              
              })}</p>
          <Divider className="mt-11" />
          <div className="mb-6 mt-8">
            <h3 className="text-lg font-semibold mb-3">About</h3>
            <div className="space-y-2 text-gray-600">
              <p>📧{dataProfileP?.email}</p>
              <p>📌 {new Date(dataProfileP?.dateOfBirth).toLocaleDateString("en-US",{
                day: "numeric",
                month: "short",
                year: "numeric",
              
              })}</p>
              <p>📌 {dataProfileP?.gender}</p>
            </div>
          </div>


          


        </CardBody>
      </Card>

      <div className="flex flex-col gap-6 my-5 items-center justify-center min-h-screen  mx-auto px-4">
       {allPosts ? (
               allPosts.slice(0,20).map((post) => (<CardPost key={post._id} post={post} handelRefetch={handelRefetch}/>))
             ) : (
               <p className="text-center text-gray-500 py-4"> You have not posted yet. </p>
             )}
      </div>
    </div>



    <Modal 
  isOpen={isOpen} 
  onOpenChange={onOpenChange  }
  placement="center"
  scrollBehavior="inside"
  
  classNames={{
    base: "my-8",
    wrapper: "items-center",
  }}
>
  <ModalContent className="max-h-[90vh] overflow-hidden rounded-2xl">
    
      <>
        <ModalHeader className="flex flex-col text-center gap-1 py-5">
          UPDATE YOUR IMAGE
        </ModalHeader>

        <ModalBody className="overflow-y-auto px-6 py-4 scrollbar-thin">
          <div className="w-full space-y-6">
            

            {isImg && (
              <div className="relative w-full h-80 md:h-96 rounded-xl overflow-hidden border border-gray-200 bg-gray-50">
                <img
                  src={isImg}
                  alt="preview"
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={clearImage}
                  className="absolute top-3 right-3 bg-black/60 hover:bg-black/80 text-white rounded-full w-8 h-8 transition"
                  type="button"
                >X
                </button>
              </div>
            )}

            <div className="flex justify-between items-center gap-4 pt-3">
              <label className="cursor-pointer flex  gap-2 justify-center items-center text-black">
                               <User className="" size={22} /> UPDATE YOUR IMAGE
                               <input ref={userImgInput} onChange={handelinputImg} type="file" className="hidden" />
                             </label>

              <button
                type="button"
                onClick={ () => mutate()}
                
                className="px-8 py-2.5 bg-sky-500 hover:bg-sky-600 text-white font-semibold rounded-full text-base transition disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
              >
                UPDATE
              </button>
            </div>
          </div>
        </ModalBody>

        
      </>
    
  </ModalContent>
</Modal>
    </>
  );
}