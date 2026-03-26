import { ArrowRight, Calendar, Data, DirectInbox, Eye, EyeSlash, Lock, Lock1, Sms, User } from 'iconsax-reactjs'
import React, { useContext, useState } from 'react'
import {Link, useNavigate} from "react-router-dom"
import img from "../../../public/images/bg-back.jpg"
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import MessageResponse from '../message-error/ErrorResponse'
import DoneResponse from '../message-error/DoneResponse'
import { Spinner } from '@heroui/react';
import Error from "../message-error/Error"
import { authContext } from '../../context/AuthContext';

export default function Login() {
  const [isShow, setisShow] = useState(false)
  const [isLoding, setisLoding] = useState(false)
    function showPass(){
    setisShow(!isShow)
    }
     const [errorRespons, seterrorRespons] = useState(null)
      const [messageRespons, setmessageRespons] = useState(null)
      const router = useNavigate()
      const { authtken } = useContext(authContext)
const schema = z.object({
  
  email: z.string()
    .email("Invalid email address"),

  password: z.string().regex(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
      "Password must include uppercase, lowercase, number and special character (#?!@$%^&*-)"
    ),

})
 

  const{ register, handleSubmit, formState: { errors } }= useForm({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
     
    },
  })
const onSubmit = async (dataSchema) => {
  setisLoding(true)
  try {
    const { data } = await axios(
      "https://route-posts.routemisr.com/users/signin",{
        method: "post",
        data : dataSchema
      }
      
    );
    const dOfMessage =data?.message
    setmessageRespons(dOfMessage)    
    authtken(data.data.token)
    console.log("login", data?.data?.user);
    
    localStorage.setItem("token", data.data.token )
    localStorage.setItem("userPhoto", data?.data?.user?.photo)
    localStorage.setItem("userName", data?.data?.user?.name )
    localStorage.setItem("userId", data?.data?.user?._id )
   
    
    setisLoding(false)
    setTimeout(() => {
      
      
      router("/Home")
      
    }, 650);
    
  } catch (error) {
    const errorMessage = error?.response?.data?.message
    setisLoding(false)
    seterrorRespons(errorMessage)
   
  }
};
  return (
    <>
    <div className=''>

    <div className="flex h-screen ">
        <div className=' w-1/3 bg-[url("../../../public/images/bg-back.jpg")] bg-no-repeat bg-cover bg-center'>
        
          <div className=' flex justify-center items-center w-full h-screen'><h2 className=' font-extrabold text-[33px] inline-block text-center'><span className='mb-1 text-[40px] text-blue-600'>Connect <br /> with
                </span>  <span className='text-black/80'> people. <br /><span className='text-blue-600'>Share</span> your moments. </span></h2></div>
        </div>
        <div id='LoginRCard' className='bg-white  w-full  flex justify-center items-center '>
         <div className='CardLS'> 
          <h3 className='text-center pb-8 font-bold text-[40px] text-blue-600'>Login</h3>
          <form onSubmit={handleSubmit(onSubmit)}  className='flex flex-col gap-7 '>
           <label id='Email-Address' className='min-w-11/12 relative flex flex-col'>Email Address
                               <div className=' relative w-full'>
                                <input {...register("email")} className='inputS' type='email'   id='' placeholder='Name@gmail.com' />
                                <Sms className='icon-S ' size="18"/>
                                {errors.email && <Error eOfMessage={errors.email.message} />}
                                </div>
                              </label>
           
                             <label id='Password' className='min-w-11/12 relative mb-2 flex flex-col'>Password
                              <div className=' relative w-full'>
                              <input {...register("password")} className='inputS' type={ isShow ? 'text':'password'}  id='' placeholder='Enter your password' />
                              <Lock className='icon-S ' size="18"/>
                              {isShow ? <Eye onClick={showPass} className=' absolute z-10 top-[50%] -translate-y-[50%] right-2 font-medium text-gray-900/85'/>:
                              <EyeSlash onClick={showPass} className=' absolute top-[50%] -translate-y-[50%] right-2 font-medium text-gray-900/70 '/>
                              }
                              {errors.password && <Error eOfMessage={errors.password.message} />}
                            </div>
                             </label>
                              <div className=' relative'>  
                                {errorRespons && <MessageResponse messageOfResponse={errorRespons}/>}
                                {messageRespons && <DoneResponse dResponse={messageRespons}/>}            
                              <button className='btnL-S group ' >
                              <span className='btnArrow '><ArrowRight/></span> sign in{ isLoding && <Spinner className=' ms-1 ' classNames={{label: "text-foreground "}} color='default' variant="wave" />}</button>
                              </div>
                            </form>
            <span className='text-sm'>Don't have an account? <Link to={"/Register"}> <span className='text-blue-600'>Sign up</span></Link></span>
         </div>
        </div>
    </div> 
    </div>
    </>
  )
}
