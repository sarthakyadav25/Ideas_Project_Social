import React from 'react';

type FeedType = 'Project' | 'Idea' | '';

interface FeedSelectorProps {
  selectedFeed: FeedType;
  onSelectFeed: (feedType: FeedType) => void;
}

const FeedSelector: React.FC<FeedSelectorProps> = ({ selectedFeed, onSelectFeed }) => {
  return (
    <div className="flex space-x-4">
      <button
        className={`px-4 py-2 rounded-md ${
          selectedFeed === 'Project' ? 'bg-black text-white' : 'bg-transparent border-2 border-black text-gray-800'
        }`}
        onClick={() => onSelectFeed(selectedFeed === 'Project' ? '' : 'Project')}
      >
        Projects
      </button>
      <button
        className={`px-4 py-2 rounded-md ${
          selectedFeed === 'Idea' ? 'bg-black text-white' : 'bg-transparent text-gray-800 border-2 border-black'
        }`}
        onClick={() => onSelectFeed(selectedFeed === 'Idea' ? '' : 'Idea')}
      >
        Ideas
      </button>
    </div>
  );
};
export default FeedSelector;