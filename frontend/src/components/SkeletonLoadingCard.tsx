import React from 'react';
import { FaUser, FaGithub, FaLink } from 'react-icons/fa';

const SkeletonLoadingCard: React.FC = () => {
  return (
    <div className={`bg-gradient-to-br h-[300px] p-3 from-[#ffffff35] via-[#ffffff20] to-[#ffffff48] shadow-md rounded-md overflow-hidden md:w-[550px]`}>
      <div className="animate-pulse">
        <div className="h-[20px] bg-gray-300 rounded-md mb-3" />
        <div className="h-[300px] bg-gray-300 rounded-md mb-3" />
      </div>
      <div className="p-3 bg-transparent cursor-pointer">
        <div className="flex items-center justify-between space-x-2">
          <div className="flex items-center justify-center flex-row space-x-2">
            <FaUser className="w-6 h-6 text-gray" />
            <span className="bg-gray-300 h-6 w-10 rounded-md" />
          </div>
        
        </div>
      </div>
      <div className="p-4">
        <div className="bg-gray-300 h-8 rounded-md mb-2" />
        <div className="bg-gray-300 h-16 rounded-md mb-2" />
        <div className="flex justify-start items-center gap-5 mt-2">
          <div className="flex items-center space-x-1">
            <FaGithub className="text-gray-600" />
            <div className="bg-gray-300 h-4 w-16 rounded-md" />
          </div>
          <div className="flex items-center space-x-1">
            <FaLink className="text-gray-600" />
            <div className="bg-gray-300 h-4 w-12 rounded-md" />
          </div>
        </div>
        <div className="flex flex-wrap gap-1 mt-2">
          <div className="bg-gray-300 h-4 w-16 rounded-full text-xs" />
          <div className="bg-gray-300 h-4 w-20 rounded-full text-xs" />
          <div className="bg-gray-300 h-4 w-24 rounded-full text-xs" />
        </div>
        <div className="bg-gray-300 h-6 w-1/3 mt-3 rounded-md" />
        <div className="bg-gray-300 h-16 w-4/5 mt-1 rounded-md" />
        <button className={`mt-2 bg-gray-300 hover:bg-gray-400 rounded-md`}>
          Loading...
        </button>
      </div>
    </div>
  );
};

export default SkeletonLoadingCard;
