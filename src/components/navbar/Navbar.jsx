import React, { useContext } from 'react'
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Button,
  ButtonGroup,
  DropdownSection,
  User,
} from "@heroui/react";
import { Home2, Profile, Message, HamburgerMenu } from "iconsax-reactjs";
import { Link, useNavigate } from 'react-router-dom';
import { authContext } from '../../context/AuthContext';

export default function Nav() {
  const { tokenClear, userToken, profileImg, profileUserName } = useContext(authContext)
  const router = useNavigate()
  function logOut() {
    tokenClear()
    localStorage.removeItem("token")
    router("/Login")
  }
  const isLoging = !!userToken
  return (
    <>
    <Navbar className='bg-blue-600/5 border-b-2 border-blue-200/20 shadow-2xs py-2'>
      <NavbarBrand className=''>
       {userToken && <div className='flex justify-between items-center gap-2'>
         {profileImg && <img src={profileImg} className='w-16 h-16 hidden md:block rounded-full' alt="Profile" />}  
          {profileUserName && <span className="hidden md:block">{profileUserName}</span>}
        
        </div>}
      </NavbarBrand>
      {!isLoging && 
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <ButtonGroup>
      <Button as={Link} to={"/Register"} className='bg-gradient-to-r from-blue-500 to-blue-700 text-white'>Register</Button>
      <Button as={Link} to={"/Login"} className='bg-gradient-to-l from-blue-800 to-blue-700 border-blue-400 text-white'>Login</Button>
    </ButtonGroup>
      </NavbarContent>}
      {isLoging &&  <div className="flex items-center gap-2 rounded-2xl bg-[#f8fafc] border-[#d9dbdd] px-3 py-2 shadow-sm/7 text-sm font-semibold">

      <Button
        as={Link}
        to={"/Home"}
        variant="light"
        className="flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold text-blue-600"
      >
        <Home2 size="20" variant="Bold" />
        <span className="hidden sm:inline">Home</span>
      </Button>

      <Button
        as={Link}
        to={"/Profile"}
        variant="light"
        className="flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold text-gray-600 hover:bg-white/70 hover:text-gray-900 transition"
      >
        <Profile size="20" variant="Linear" />
        <span className="hidden sm:inline">Profile</span>
      </Button>

      <Button
        as={Link}
        to={"/Notifications"}
        variant="light"
        className="flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold text-gray-600 hover:bg-white/70 hover:text-gray-900 transition"
      >
        <Message size="20" variant="Linear" />
        <span className="hidden sm:inline">Notifications</span>
      </Button>

    </div>}
      {isLoging  && 
        <NavbarContent as="div" justify="end">
 <Dropdown
      showArrow
      disableAnimation={true}
      classNames={{
        base: "before:bg-default-200",
        content: "p-0 border-small border-divider bg-background",
      }}
      radius="sm"
    >
      <DropdownTrigger>
        <Button disableRipple variant="ghost" className="h-12 w-2 md:w-20 rounded-[15px] md:rounded-[25px] p-0">
        <div className='flex justify-between items-center gap-2'>
        
          <HamburgerMenu size="20" variant="Linear" />
        </div>
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Custom item styles"
        className="p-3"
        disabledKeys={["profile"]}
        itemClasses={{
          base: [
            "rounded-md",
            "text-default-500",
            "transition-opacity",
            "data-[hover=true]:text-foreground",
            "data-[hover=true]:bg-default-100",
            "dark:data-[hover=true]:bg-default-50",
            "data-[selectable=true]:focus:bg-default-50",
            "data-[pressed=true]:opacity-70",
            "data-[focus-visible=true]:ring-default-500",
          ],
        }}
      >
        <DropdownSection showDivider >
        
         
          <DropdownItem as={Link} to={"/ChangePassword"} key="Change Password">Change Password</DropdownItem>
           
        </DropdownSection>

        

        <DropdownSection aria-label="Help & Feedback">
          <DropdownItem className="text-danger" onClick={logOut}>Log Out</DropdownItem>

        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  

    </NavbarContent>}
    </Navbar>


    </>
  )
}