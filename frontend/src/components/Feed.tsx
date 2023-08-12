import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import FeedSelector from './FeedSelector';
import ProjectCard from './ProjectCard';
import { FaSearch } from 'react-icons/fa';
import { useAuth } from './authContext';

interface Post {
  id: number;
  title: string;
  description: string;
  tech_stack: string;
  project_link_github: string;
  project_link_live: string;
  problem_statement: string;
  post_pic: string | null;
  user: {
    username: string;
    profile_photo: string | null;
  };
  type: string;
}

type FeedType = 'projects' | 'ideas';

const numPostsToLoad = 6; // Number of posts to load on each "Load More" click

const ProjectList: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [filterText, setFilterText] = useState('');
  const [selectedFeed, setSelectedFeed] = useState<FeedType>('projects');
  const [numPostsToShow, setNumPostsToShow] = useState(numPostsToLoad);
  const [expandedStates, setExpandedStates] = useState<boolean[]>([]);
  const router = useRouter();
  useEffect(() => {
    fetchProjects();
  }, []);
  const { isLoggedIn } = useAuth();


  useEffect(() => {
    console.log('userLoggedIn:', isLoggedIn);
  }, []);
  const fetchProjects = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/allposts', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        setPosts(data);
        setExpandedStates(data.map(() => false)); // Initialize all as collapsed
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error('An error occurred while fetching projects');
    }
  };


  const totalPosts = posts.length;

  const handleLoadMore = () => {
    if (isLoggedIn) {
      const newNumPostsToShow = numPostsToShow + numPostsToLoad;
      setNumPostsToShow(newNumPostsToShow);

      if (newNumPostsToShow <= totalPosts) {
        setPosts(posts.slice(0, newNumPostsToShow));
      }
    } else {
      router.push('/login');
    }
  };

  const filteredPosts = posts.filter((post) => {
    if (!filterText  ) {
      return true; // Show all posts if filterText is empty
    }
    if(isLoggedIn){
    const lowerCaseFilter = filterText.toLowerCase();
    const searchTermInPost =
      post.title.toLowerCase().includes(lowerCaseFilter) ||
      post.tech_stack.toLowerCase().includes(lowerCaseFilter) ||
      post.description.toLowerCase().includes(lowerCaseFilter) ||
      post.problem_statement.toLowerCase().includes(lowerCaseFilter);

    return searchTermInPost;
    }else{
      router.push('/login');
    }
  });

  const visiblePosts = filteredPosts.slice(0, numPostsToShow);

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
        {numPostsToShow < totalPosts && (
          <button
            className="mt-4 bg-[#ff00ff] w-[200px] text-white py-2 px-4 rounded-md hover:bg-white hover:text-[#ff00ff] border border-[#ff00ff] transition duration-300 ease-in-out block m-auto"
            onClick={handleLoadMore}
          >
            Load More
          </button>
        )}
      </div>
    </div>
  );
};

export default ProjectList;
