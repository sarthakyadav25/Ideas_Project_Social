'use client'
import { getProviders, signOut, signIn, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link'
import React from 'react'
import { useState, useEffect} from 'react'

const Navbar = () => {
  const isUserLoggedIn = false;
  const [toggleDropdown, settoggleDropdown] = useState(false)
  const [message, setMessage] = useState('');
  useEffect(() => {
    (
      async () => {
        const response = await fetch('http://localhost:8000/api/user');
      }
    )
  });

  return (
    <nav className=' flex justify-between items-start w-full mb-5 pt-3'>
        <Link href="/" className='flex gap-2 flex-center'>
          <span className=' text-2xl font-bold'>Think.<span className='text-[#d61e92]'>Devs</span></span>
        </Link>

        {/* Desktop navigation */}
        <div className='sm:flex hidden'>
        
          {isUserLoggedIn ? (
            <div className='flex gap-3 md:gap-5'>
              <Link href="/Saved" className="rounded-full relative inline-flex items-center justify-center px-5 py-2.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900  group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white ">
                  Saved
              </Link>
              <button className="rounded-full relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900  group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white " 
              onClick={() => {signOut()}}
              >
              <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white text-black rounded-full group-hover:bg-opacity-0 group-hover:text-white">
                Sign Out
              </span>
              </button>
              <Link href="/profile">
                <img src='favicon.ico'
                width={37} height={37} className='rounded-full '
                alt="Profile Image"/>
              </Link>
            </div> ) :
            (
              <>
                {
                  (
                    <Link href="/login">
                      <button className="rounded-full relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900  group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white " >
                      <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white text-black rounded-full group-hover:bg-opacity-0 group-hover:text-white">
                        Sign In
                      </span>
                      </button>
                    </Link>
                  )
                }
              </>
            )
        }
        </div>
        {/* Mobile Navigation */}
        <div className='sm:hidden flex relative'>
          { isUserLoggedIn ? 
          (
            <div className='flex'>
              <img src='next.svg'
                width={37} height={37} className='rounded-full cursor-pointer'
                alt="Profile Image"
                onClick={() => settoggleDropdown((prev) => !prev)}
                />

                {toggleDropdown && (
                  <div className='absolute right-0 top-full mt-3 w-full p-5 rounded-lg bg-white min-w-[210px] flex flex-col gap-2 justify-end items-end'>
                    <Link href="/profile"
                      className="text-sm font-inter text-gray-700 hover:text-gray-500 font-medium"
                    >My  Profile</Link>
                    <Link href="/Saved"
                      className="text-sm font-inter text-gray-700 hover:text-gray-500 font-medium">Saved</Link>
                    <button type='button' 
                      onClick={() => {
                        settoggleDropdown(false)
                        signOut()}}
                      className=' rounded-full border border-black bg-transparent py-1.5 px-5 text-black transition-all hover:bg-black hover:text-white text-center text-sm font-inter flex items-center justify-center mt-5 w-full'
                    >
                      Sign Out
                    </button>
                  </div>
                )}
            </div>
          )  :
          (
            <>
              {/* TODO:
                  Adding SignIN Logic and Providers
                */}
            </>
          )
        }
        </div>
    </nav>
  )
}

export default Navbar