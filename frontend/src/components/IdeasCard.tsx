import React from 'react';

interface IdeaCardProps {
  title: string;
  description: string;
  problemStatement: string;
  postPic: string | null;
  likesCount: number;
  savedCount: number;
}

const IdeaCard: React.FC<IdeaCardProps> = ({
  title,
  description,
  problemStatement,
  postPic,
  likesCount,
  savedCount,
}) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 h-full m-4">
      <h2 className="text-center text-3xl font-bold mb-6 text-pink-600">Idea Details</h2>
      {postPic && (
        <div className="mb-4">
          <img src={postPic} alt="Post Picture" className="w-full rounded-md" />
        </div>
      )}
      <div className="mb-4">
        <h3 className="text-lg font-medium mb-2 text-gray-700">Title:</h3>
        <p className="text-sm text-gray-600">{title}</p>
      </div>
      <div className="mb-4">
        <h3 className="text-lg font-medium mb-2 text-gray-700">Description:</h3>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
      <div className="mb-4">
        <h3 className="text-lg font-medium mb-2 text-gray-700">Problem Statement:</h3>
        <p className="text-sm text-gray-600">{problemStatement}</p>
      </div>
      <div className="flex justify-between items-center mt-4">
        <div className="flex items-center gap-2">
          <span className="text-gray-600">Likes: {likesCount}</span>
          <span className="text-gray-600">Saved: {savedCount}</span>
        </div>
        <button className="py-2 px-4 border-2 border-black rounded-md bg-white text-black font-medium hover:bg-black hover:text-white transition-all duration-200">
          Like
        </button>
        <button className="py-2 px-4 border-2 border-black rounded-md bg-white text-black font-medium hover:bg-black hover:text-white transition-all duration-200">
          Save
        </button>
      </div>
    </div>
  );
};

export default IdeaCard;
