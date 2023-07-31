'use client'
import React, { useState } from 'react';

type FeedType = 'projects' | 'ideas'  ;

const FeedSelector: React.FC = () => {
  const [selectedFeed, setSelectedFeed] = useState<FeedType>();

  const handleFeedClick = (feedType: FeedType) => {
    setSelectedFeed(feedType);
  };

  return (
    <div className="flex space-x-4">
      <button
        className={`px-4 py-2 rounded-md ${selectedFeed === 'projects' ? 'bg-black text-white' : 'bg-transparent border-2 border-black text-gray-800'}`}
        onClick={() => handleFeedClick('projects')}
      >
        Projects
      </button>
      <button
        className={`px-4 py-2 rounded-md ${selectedFeed === 'ideas' ? 'bg-black text-white' : 'bg-transparent text-gray-800 border-2 border-black'}`}
        onClick={() => handleFeedClick('ideas')}
      >
        Ideas
      </button>
    </div>
  );
};



const Search = () => {
    const [searchText, setsearchText] = useState('')
    const handleSearchChange = (e: any) => {}
  return (
    <section className="mt-16 mx-auto w-full max-w-xl flex justify-center items-center flex-col gap-2">
        <FeedSelector />
        <h1 className="text-2xl font-bold text-center">Search for ideas</h1>
        <form className="relative w-full flex items-center justify-center">
            <input type='text'
                placeholder='Ex: React, Python etc.'
                value={searchText}
                onChange={handleSearchChange}
                required
                className=' block w-full rounded-md border border-gray-200 bg-white py-2.5 font-satoshi pl-5 pr-12 text-sm shadow-lg font-medium focus:border-black focus:outline-none focus:ring-0'
            />
        </form>

    </section>
  )
}

export default Search