/* eslint-disable react-refresh/only-export-components */
import { createContext, useState } from 'react';

export const authContext = createContext();

export default function AuthContextProvider({ children }) {
    const [profileUserName, setprofileUserName] = useState(useState(function () {
       return localStorage.getItem("userName")
    }))
    const [userId, setuserId] = useState(useState(function () {
       return localStorage.getItem("userId")
    }))
    const [profileImg, setprofileImg] = useState(function () {
       return localStorage.getItem("userPhoto")
    })
    const [userToken, setuserToken] = useState( function(){
      return localStorage.getItem("token")
      
    })
    function authtken(tkn) {
      setuserToken(tkn)
    }
    function tokenClear() {
        setuserToken(null)
    }
    
  return (
    <authContext.Provider value={{userToken, authtken, tokenClear ,profileImg,profileUserName, setprofileUserName, setprofileImg ,userId ,setuserId }}>
      {children}
    </authContext.Provider>
  );
}