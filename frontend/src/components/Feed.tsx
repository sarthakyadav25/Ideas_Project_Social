import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import FeedSelector from './FeedSelector';
import ProjectCard from './ProjectCard';
import { FaSearch } from 'react-icons/fa';
import { useAuth } from './authContext';
import { UUID } from 'crypto';
import SkeletonLoadingCard from './SkeletonLoadingCard';

interface Post {
  id: string;
  title: string;
  description: string;
  tech_stack: string;
  project_link_github: string;
  project_link_live: string;
  problem_statement: string;
  post_pic: string | null;
  username: string;
  isLiked: boolean;
  isSaved: boolean;
  type: string;
  no_of_likes: number;
}

type FeedType = 'Project' | 'Idea' | '';

const numPostsToLoad = 6; // Number of posts to load on each "Load More" click

const ProjectList: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [filterText, setFilterText] = useState('');
  const [selectedFeed, setSelectedFeed] = useState<FeedType>('');
  const [numPostsToShow, setNumPostsToShow] = useState(numPostsToLoad);
  const [expandedStates, setExpandedStates] = useState<boolean[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    fetchProjects();
  }, []);





  const fetchProjects = async () => {
    try {
      setIsLoading(true); 
      
      const response = await fetch('https://thinkdevs.onrender.com/api/allposts', {});

      const data = await response.json();

      if (response.ok) {
        setPosts(data);
        setExpandedStates(data.map(() => false)); // Initialize all as collapsed
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error('An error occurred while fetching projects');
    } finally {
      setIsLoading(false); 
    }
  };


  const totalPosts = posts.length;

  const handleLoadMore = () => {
    const newNumPostsToShow = numPostsToShow + numPostsToLoad;
    setNumPostsToShow(newNumPostsToShow);

    if (newNumPostsToShow <= totalPosts) {
      setPosts(posts.slice(0, newNumPostsToShow));
    }
  };

  const filteredPosts = posts.filter((post) => {
    if (!filterText) {
      return true; // Show all posts if filterText is empty
    }

    const lowerCaseFilter = filterText.toLowerCase();
    const searchTermInPost =
      post.title.toLowerCase().includes(lowerCaseFilter) ||
      post.tech_stack.toLowerCase().includes(lowerCaseFilter) ||
      post.description.toLowerCase().includes(lowerCaseFilter) ||
      post.problem_statement.toLowerCase().includes(lowerCaseFilter);

    return searchTermInPost;
  });

  const visiblePosts = filteredPosts.filter((post) =>
    selectedFeed !== '' ? post.type === selectedFeed : true
  );
  const filteredVisiblePosts = filteredPosts.filter((post) =>
  selectedFeed ? post.type === selectedFeed : true
);
  return (
    <div className="bg-none min-h-screen p-8 flex justify-start items-center  flex-col gap-5 max-w-full">
      <FeedSelector selectedFeed={selectedFeed} onSelectFeed={setSelectedFeed} />

      <div className="relative flex items-center justify-center">
        <input
          type="text"
          placeholder="Ex: React, Python etc."
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
          required
          className="md:w-[600px] block w-full rounded-md border border-gray-200 bg-white py-2.5 font-satoshi pl-12 pr-12 text-sm shadow-lg font-medium focus:border-black focus:outline-none focus:ring-0"
        />
        <div className="absolute left-3 ">
          <FaSearch className="text-gray-400" />
        </div>
      </div>

      {isLoading ? (
        <SkeletonLoadingCard />
  ) : (
    <div className="grid gap-5 md:grid-cols-1">
        {visiblePosts.length > 0 ? (
          visiblePosts.map((post, index) => (
            <ProjectCard
              key={post.id}
              project={post}
            />
          ))
        ) : (
          <p className="text-center text-gray-500 mt-4 ">No matching innovations found.</p>
        )}
      </div>
  )}
      
        {/* {numPostsToShow < totalPosts && (
          <button
            className="mt-4 bg-[#ff00ff] w-[200px] text-white py-2 px-4 rounded-md hover:bg-white hover:text-[#ff00ff] border border-[#ff00ff] transition duration-300 ease-in-out block m-auto"
            onClick={handleLoadMore}
          >
            Load More
          </button>
        )} */}
    </div>
  );
};

export default ProjectList;
