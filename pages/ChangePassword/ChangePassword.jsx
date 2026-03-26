import { ArrowRight, Eye, EyeSlash, Lock, Sms } from 'iconsax-reactjs';
import React, { useContext, useState } from 'react';
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Spinner } from '@heroui/react';
import MessageResponse from '../../src/components/message-error/ErrorResponse';
import DoneResponse from '../../src/components/message-error/DoneResponse';
import Error from '../../src/components/Error/Error';
import { authContext } from '../../src/context/AuthContext';

export default function ChangePassword() {
    const [isShow, setisShow] = useState(false);
    const [isLoding, setisLoding] = useState(false);
    
    const [errorRespons, seterrorRespons] = useState(null);
    const [messageRespons, setmessageRespons] = useState(null);

    const { userToken } = useContext(authContext);

    const schema = z.object({
        password: z.string().regex(
            /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
            "Password must include uppercase, lowercase, number and special character (#?!@$%^&*-)"
        ),
        newPassword: z.string().regex(
            /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
            "Password must include uppercase, lowercase, number and special character (#?!@$%^&*-)"
        ),
    });

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(schema),
        mode: "onChange",
        defaultValues: {
            password: "",
            newPassword: "",
        },
    });

    const showPass = () => {
        setisShow(!isShow);
    };

    const onSubmit = async (dataSchema) => {
        setisLoding(true);
        seterrorRespons(null);
        setmessageRespons(null);

        try {
            const { data } = await axios.patch(
                "https://route-posts.routemisr.com/users/change-password",
                dataSchema,
                {
                    headers: { token: userToken }
                }
            );

            setmessageRespons(data?.message || "Password changed successfully");
            
            console.log("dtaaaaaaaaaaaaaa",data);
        } catch (error) {
            console.log("errrrrrrrrrrrrrrr",error);
            const errorMsg = error.response?.data?.message || "Something went wrong, please try again";
            seterrorRespons(errorMsg);

        } finally {
            setisLoding(false);
        }
    };

    return (
        <>
          
                  <div id='LoginRCard' className='bg-white  w-full  flex justify-center items-center '>
                     <div className='CardLS'>
                    <h3 className='text-center pb-8 font-bold text-[40px] text-blue-600'>
                        Change Password
                    </h3>

                    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-7'>
                        {/* Old Password */}
                        <label className='min-w-11/12 relative flex flex-col'>
                            Password
                            <div className='relative w-full'>
                                <input
                                    {...register("password")}
                                    className='inputS'
                                    type={isShow ? 'text' : 'password'}
                                    placeholder='Enter your password'
                                />
                                <Lock className='icon-S' size="18" />
                                {isShow ? (
                                    <Eye
                                        onClick={showPass}
                                        className='absolute z-10 top-[50%] -translate-y-[50%] right-2 font-medium text-gray-900/85 cursor-pointer'
                                    />
                                ) : (
                                    <EyeSlash
                                        onClick={showPass}
                                        className='absolute top-[50%] -translate-y-[50%] right-2 font-medium text-gray-900/70 cursor-pointer'
                                    />
                                )}
                                {errors.password && <Error eOfMessage={errors.password.message} />}
                            </div>
                        </label>

                        {/* New Password */}
                        <label className='min-w-11/12 relative mb-2 flex flex-col'>
                            New Password
                            <div className='relative w-full'>
                                <input
                                    {...register("newPassword")}
                                    className='inputS'
                                    type={isShow ? 'text' : 'password'}
                                    placeholder='Enter your New password'
                                />
                                <Lock className='icon-S' size="18" />
                                {isShow ? (
                                    <Eye
                                        onClick={showPass}
                                        className='absolute z-10 top-[50%] -translate-y-[50%] right-2 font-medium text-gray-900/85 cursor-pointer'
                                    />
                                ) : (
                                    <EyeSlash
                                        onClick={showPass}
                                        className='absolute top-[50%] -translate-y-[50%] right-2 font-medium text-gray-900/70 cursor-pointer'
                                    />
                                )}
                                {errors.newPassword && <Error eOfMessage={errors.newPassword.message} />}
                            </div>
                        </label>

                        <div className='relative'>
                            {errorRespons && <MessageResponse messageOfResponse={errorRespons} />}
                            {messageRespons && <DoneResponse dResponse={messageRespons} />}

                            <button 
                                type="submit" 
                                className='btnL-S group' 
                                disabled={isLoding}
                            >
                                <span className='btnArrow'><ArrowRight /></span>
                                Change Password
                                {isLoding && <Spinner className='ms-1' classNames={{ label: "text-foreground" }} color='default' variant="wave" />}
                            </button>
                        </div>
                    </form>
                  </div>
                  </div>
        </>
    );
} 