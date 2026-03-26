import { ArrowRight, AttachCircle, Calendar, Data, DirectInbox, Eye, EyeSlash, Lock, Lock1, People, Profile2User, Sms, User, UserOctagon, UserTag } from 'iconsax-reactjs'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import img1 from '../../../public/images/bg2.jpg'
import Error from '../message-error/Error'
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import MessageResponse from '../message-error/ErrorResponse'
import DoneResponse from '../message-error/DoneResponse'
import { Spinner } from '@heroui/react'


export default function Register() {
  const [isShow, setisShow] = useState(false)
  function showPass(){
    setisShow(!isShow)
  }
  const [errorRespons, seterrorRespons] = useState(null)
  const [messageRespons, setmessageRespons] = useState(null)
  const router = useNavigate()
const schema = z.object({
  name: z.string()
    .min(2, "Name must be at least 2 characters")
    .max(13, "Name must not exceed 13 characters"),
  username: z.string()
    .min(2, "Name must be at least 2 characters")
    .max(16, "Name must not exceed 16 characters").optional(),

  email: z.string()
    .email("Invalid email address"),

  password: z.string().regex(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
      "Password must include uppercase, lowercase, number and special character (#?!@$%^&*-)"
    ),

  rePassword: z.string(),
  dateOfBirth:z.string(),
  gender:z.enum(["male","female"])

})
.refine(
  (values) => {
    return values.password === values.rePassword;
  },
  {
    message: "Passwords do not match",
    path: ["rePassword"],
  }
)
  const { register, handleSubmit, formState: { errors ,isSubmitting } } = useForm({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: {
      name: "",
      username:"",
      email: "",
      password: "",
      rePassword: "",
      dateOfBirth: "",
      gender: "",
    },
  })
const onSubmit = async (dataSchema) => {
  try {
    const { data } = await axios(
      "https://route-posts.routemisr.com/users/signup",{
        method: "post",
        data : dataSchema
      }
    );
     
    const dOfMessage =data.message
    setmessageRespons(dOfMessage)
    setTimeout(() => {
    router("/Login")
     
    }, 1500);
  } catch (error) {
    
    const errorMessage = error?.response?.data?.message
      seterrorRespons(errorMessage)
  }
};


  return (
    <>
    <div>
       <div id='LoginRCard' className=' w-full bg-[url("../../../public/images/bg2.jpg")] bg-fixed bg-cover bg-center flex justify-center items-center p-10'>
               <div className='CardRS '> 
                <h3 className='text-center pb-8 font-bold text-2xl'>Create account</h3>
                <form onSubmit={handleSubmit(onSubmit)}  className='flex flex-col gap-9'>
                  <div className=' relative w-full'>
                  <input {...register("name")} className='inputS' type='text'   id='' placeholder='Enter yoru Name' />
                  <User className='icon-S ' size="18"/>
                  {errors.name && <Error eOfMessage={errors.name.message} />}
                 </div>
                  <div className=' relative w-full'>
                  <input {...register("username")} className='inputS' type='text'   id='' placeholder='User Name' />
                  <AttachCircle  className='icon-S ' size="18"/>
                  {errors.name && <Error eOfMessage={errors.name.message} />}
                 </div>

                  <div className=' relative w-full'>
                  <input {...register("email")} className='inputS' type='email'   id='' placeholder='Name@gmail.com' />
                  <Sms className='icon-S ' size="18"/>
                  {errors.email && <Error eOfMessage={errors.email.message} />}
                 </div>

                  <div className=' relative w-full'>
                  <input {...register("password")} className='inputS' type={ isShow ? 'text':'password'}  id='' placeholder='Enter your password' />
                  <Lock className='icon-S ' size="18"/>
                  {isShow ? <Eye onClick={showPass} className=' absolute z-10 top-[50%] -translate-y-[50%] right-2 font-medium text-gray-900/85'/>:
                  <EyeSlash onClick={showPass} className=' absolute top-[50%] -translate-y-[50%] right-2 font-medium text-gray-900/70 '/>
                  }
                  {errors.password && <Error eOfMessage={errors.password.message} />}
                 </div>

                  <div className=' relative w-full'>
                  <input {...register("rePassword")} className='inputS' type="password"  id='' placeholder='Confirm your password' />
                  <Lock className='icon-S'size="20"/>
                  {errors.rePassword && <Error eOfMessage={errors.rePassword.message} />}
                 </div>

                  <div className='flex lg:flex-row flex-col gap-5'>
                 <div className=' relative w-full'>
                  <input {...register("dateOfBirth")} className='inputS' type='date'  placeholder='mm/dd/yyyy' />
                  <Calendar className='icon-S'size="20"/>
                  {errors.dateOfBirth && <Error eOfMessage={errors.dateOfBirth.message} />}</div>
                  <div className=' relative w-full'>
                <select {...register("gender")} className='inputS' id="" >
                  <option  disabled selected>Select your gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  </select>
                  <Profile2User  className='icon-S'size="20"/>
                  {errors.gender && <Error eOfMessage={errors.gender.message} />}
                  </div>
                </div>
                      <div className=' relative p-0 m-0'>            
                     {errorRespons && <MessageResponse messageOfResponse={errorRespons}/>}
                     {messageRespons && <DoneResponse dResponse={messageRespons}/>}

                  <button className='btnR-S group' >
                  <span className='btnArrow'><ArrowRight/></span>Create account  {isSubmitting && <Spinner className=' ms-1 ' classNames={{label: "text-foreground "}} color='default' variant="wave" />}</button>
                      </div>
                </form>
                
              <span className='text-[19px] font-bold '>Already have an account? <Link to={"/Login"}> <span className='text-blue-600 font-bold text-[20px]'>Sign in</span></Link></span>
                
           </div>
           </div>
    </div>
      
    </>
  )

}