import Link from 'next/link';
import React, { useState } from 'react';

const AddButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
// TODO: adding addition butoon on just logged in users 
  return (
    
    <div className=" fixed bottom-10 right-10  shadow-lg z-10">
      <button
        className="px-4 py-2 text-white bg-black rounded-md font-bold"
        onClick={toggleDropdown}
      >
        +
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 mb-2 w-48  bg-red-200 rounded-md shadow-lg bottom-full overflow-hidden">
          <ul className="">
            <li>
              <Link href='/project'>
              
              <button className="block px-4 py-2 text-gray-800 hover:bg-black hover:text-white w-full text-left" 
              onClick={() => {setIsOpen(false)}}
              >
                Projects
              </button>
              </Link>
            </li>
            <li>
              <Link href='/ideas'>
              <button className="block px-4 py-2 text-gray-800 hover:bg-black hover:text-white w-full text-left"
              onClick={() => {setIsOpen(false)}}
              >
                Ideas
              </button>
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default AddButton;

