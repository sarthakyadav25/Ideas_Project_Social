import React from 'react';

type FeedType = 'projects' | 'ideas';

interface FeedSelectorProps {
  selectedFeed: FeedType;
  onSelectFeed: (feedType: FeedType) => void;
}

const FeedSelector: React.FC<FeedSelectorProps> = ({ selectedFeed, onSelectFeed }) => {
  return (
    <div className="flex space-x-4">
      <button
        className={`px-4 py-2 rounded-md ${
          selectedFeed === 'projects' ? 'bg-black text-white' : 'bg-transparent border-2 border-black text-gray-800'
        }`}
        onClick={() => onSelectFeed('projects')}
      >
        Projects
      </button>
      <button
        className={`px-4 py-2 rounded-md ${
          selectedFeed === 'ideas' ? 'bg-black text-white' : 'bg-transparent text-gray-800 border-2 border-black'
        }`}
        onClick={() => onSelectFeed('ideas')}
      >
        Ideas
      </button>
    </div>
  );
};

export default FeedSelector;
