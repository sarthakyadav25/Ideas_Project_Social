import AddButton from '@/components/AddBtn'
import Navbar from '@/components/navbar'
import Search from './search'
import { useState } from 'react'

export default function Home() {
  const isUserLoggedIn = true;
  const [toggleDropdown, settoggleDropdown] = useState(false)
  return (
    <section className='w-full flex justify-center items-center flex-col'>
    <h1 className='mt-5 text-5xl font-extrabold leading-[1.15] text-black sm:text-6xl text-center'>
      Innovate & Share
      <br className='max-md:hidden' />
      <span className='text-6xl font-bold bg-gradient-to-r from-pink-600 via-purple-900 to-pink-600 bg-clip-text text-transparent text-center'>Projects and Ideas</span>
    </h1>
    <p className='mt-5 text-lg text-gray-600 sm:text-xl max-w-2xl text-center'>
      Think.Devs is a platform for world to discover, create and share creative and Innovative Ideas
    </p>

    <Search />
    {isUserLoggedIn ?(  <AddButton />):(<>{}</>)} 
  </section>
    )
}
