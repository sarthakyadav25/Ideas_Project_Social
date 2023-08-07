import Link from 'next/link';
import React, { useState } from 'react';
import AddButton from '@/components/AddBtn'
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router';
import { useAuth } from '@/components/authContext';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Navbar: React.FC = () => {
  const { isLoggedIn, setIsLoggedIn } = useAuth();
  const [toggleDropdown, setToggleDropdown] = useState(false);
  const router = useRouter();

  // TODO: Implement the useEffect to check the user's login status
  


  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/logout', {
        method: 'GET',
        credentials: 'include',
      });

      if (response.ok) {
        setIsLoggedIn(false);
        toast.success('Logged Out!', {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 3000,
        });
        setTimeout(() => {
          router.push('/');
        }, 1000);
        
        
      } else {
        console.error('Failed to sign out.');
      }
    } catch (error) {
      console.error('An error occurred while signing out.', error);
    }
  };

  
  var menu ,menuSm;
  if(isLoggedIn) {
    menu = (
      
      <div className='flex gap-3 md:gap-5'>
            <Link
              href='/Saved'
              className='rounded-full relative inline-flex items-center justify-center px-5 py-2.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white'
            >
              Saved
            </Link>
            <button
              className='rounded-full relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white'
              onClick={() => handleLogout()}
            >
              <span className='relative px-5 py-2.5 transition-all ease-in duration-75 bg-white text-black rounded-full group-hover:bg-opacity-0 group-hover:text-white'>
                Sign Out
              </span>
            </button>
                
            <Link href='/profile' className='flex justify-center items-center w-[45px] h-[45px] rounded-full border-solid border-2 border-black'>
              <img
                src='next.svg'
                width={37}
                height={37}
                alt='Profile Image'
                className='rounded-full cursor-pointer  flex justify-center items-center'
              />
            </Link>
           <AddButton />
          </div>

        );
    menuSm = (
      <div className='flex justify-center items-center w-[30px] h-[30px] rounded-full border-solid border-2 border-black'>
      <img
        src='next.svg'
        width={37}
        height={37}
        className='rounded-full cursor-pointer '
        alt='Profile Image'
        onClick={() => setToggleDropdown((prev) => !prev)}
      />
          <AddButton />
      
      {toggleDropdown && (
        <div className='absolute right-0 top-full mt-3 w-full p-5 rounded-lg bg-white min-w-[210px] flex flex-col gap-2 justify-end items-end'>
          <Link
            href='/profile'
            className='text-sm font-inter text-gray-700 hover:text-gray-500 font-medium'
          >
            My Profile
          </Link>
          <Link
            href='/Saved'
            className='text-sm font-inter text-gray-700 hover:text-gray-500 font-medium'
          >
            Saved
          </Link>
          <button
            type='button'
            onClick={() => {
              setToggleDropdown(false);
              handleLogout();
            }}
            className='rounded-full border border-black bg-transparent py-1.5 px-5 text-black transition-all hover:bg-black hover:text-white text-center text-sm font-inter flex items-center justify-center mt-5 w-full'
          >
            Sign Out
          </button>

        </div>
      )}
    </div>
    )
  }
    else {
      menu = (
        <>
            <Link
              href='/login'
              className='rounded-full relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white'
            >
              <span className='relative px-5 py-2.5 transition-all ease-in duration-75 bg-white text-black rounded-full group-hover:bg-opacity-0 group-hover:text-white'>
                Sign In
              </span>
            </Link>
          </>
      );
      menuSm = (
        <>
            <Link
              href='/login'
              className='rounded-full relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white'
            >
              <span className='relative px-5 py-2.5 transition-all ease-in duration-75 bg-white text-black rounded-full group-hover:bg-opacity-0 group-hover:text-white'>
                Sign In
              </span>
            </Link>
          </>
      )
    }
  return (
    <nav className='flex justify-between items-start w-full mb-5 pt-3'>
      <Link href='/' className='flex gap-2 flex-center'>
        <span className='text-2xl font-bold'>
          Think.<span className='text-[#d61e92]'>Devs</span>
        </span>
      </Link>

      {/* Desktop navigation */}
      <div className='sm:flex hidden'>
           {menu}
      </div>
      {/* Mobile Navigation */}
      <div className='sm:hidden flex relative'>
           {menuSm}

      </div>
    </nav>


  );
};

export default Navbar;
