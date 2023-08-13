import React, { useState, useEffect } from 'react';
import { FaUser, FaGithub, FaLink, FaRegBookmark,FaBookmark, FaHeart, FaRegHeart } from 'react-icons/fa';
import { useAuth } from './authContext';
import { useRouter } from 'next/router';
import Link from 'next/link';

interface ProjectCardProps {
  project: Post;
}
interface UserProfile {
  username: string;
  profile: {
    id: number;
    bio: string;
    email: string;
    interested_tech_stacks: string;
    cover_pic: string;
    profile_pic: string;
    user: number;
  };
}
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
  isLiked: boolean; // Add this property
  isSaved: boolean; // Add this property
  no_of_likes: number;
}


const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const [expanded, setExpanded] = useState(false);
  const [isLiked, setIsLiked] = useState(project.isLiked);
  const [isSaved, setIsSaved] = useState(project.isSaved);
  const [likesCount, setLikesCount] = useState(project.no_of_likes);
  const [likedUsername, setLikedUsername] = useState<string | null>(null); // for the loggein user name
  const [profilePic, setProfilePic] = useState<string | null>(null); // State for profile picture
  const router = useRouter();
  const { isLoggedIn } = useAuth();
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);

  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);


  useEffect(() => {
    setIsLiked(project.isLiked);
    setIsSaved(project.isSaved);

    // Fetch user's saved posts from the API and update state
    if (isLoggedIn) {
      fetchSavedPosts();
      fetchUserInfo();
    }
  }, [project.isLiked, project.isSaved, isLoggedIn]);
  useEffect(() => {
    async function fetchUserProfile() {
      try {
        const response = await fetch('https://thinkdevs.onrender.com/api/profile', {
          method: 'GET',
          headers: {
            authorization: `Bearer ${localStorage.getItem('access_token')}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUserProfile(data);
        } else {
          console.error('Failed to fetch profile data');
        }
      } catch (error) {
        console.error(error);
      }
    }
    fetchUserProfile();
  }, []);
  const fetchUserInfo = async () => {
    try {
      const response = await fetch(`https://thinkdevs.onrender.com/api/getprofile/${project.username}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      });

      if (response.ok) {
        const responseData = await response.json();
        setLikedUsername(responseData); // Store liked username in state
        setProfilePic(responseData.profile_pic); 
      } else {
        console.error('Failed to fetch user details');
      }
    } catch (error) {
      console.error(error);
    }
  };
  const fetchSavedPosts = async () => {
    try {
      const response = await fetch(
        `https://thinkdevs.onrender.com/api/get_saved_posts`, // Adjust the API endpoint as needed
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          },
        }
      );

      if (response.ok) {
        const responseData = await response.json();
        const savedPostIds = responseData.map((savedPost: { post_id: any; }) => savedPost.post_id);
        setIsSaved(savedPostIds.includes(project.id));
      } else {
        console.error('Failed to fetch saved posts');
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setIsLiked(project.isLiked); // Initialize like status
  }, [project.isLiked]);

  const toggleLike = async () => {
    try {
      if (!isLoggedIn) {
        router.push('/login');
        return;
      }
      
      // Call the like post API and handle the response
      const response = await fetch(`https://thinkdevs.onrender.com/api/like_post/${project.id}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      });
      
      if (response.ok) {
        const responseData = await response.json();
        
        // Update likesCount based on API response
        setLikesCount(responseData.likesCount);
  
        // Here, you can use the API response to update the liked state
        // For example, if the API returns "liked: true" or "liked: false"
        setIsLiked(responseData.liked);
        console.log(responseData.liked);
      } else {
        console.log('Failed to like/unlike the post');
      }
    } catch (error) {
      console.error(error);
    }
  };


  const toggleSave = async () => {
    try {
      if (!isLoggedIn) {
        router.push('/login');
        return;
      }

      const response = await fetch(
        `https://thinkdevs.onrender.com/api/save_post/${project.id}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          },
        }
      );

      if (response.ok) {
        setIsSaved(!isSaved);
      } else {
        console.error('Failed to save/unsave the post');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`https://thinkdevs.onrender.com/api/delete_post/${project.id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      });
  
      if (response.ok) {
        // Handle successful deletion
        console.log('Post deleted successfully');
        // You can implement further actions, like removing the post from the state or updating UI.
      } else {
        // Handle error
        console.error('Failed to delete post');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={`bg-gradient-to-br p-3 from-[#d12bd135] via-[#f03ff020] to-[#ffffff48] shadow-md rounded-md overflow-hidden md:w-[550px] hover:shadow-none hover:border-black hover:bg-white hover:border-2 hover:border-solid transition duration-[0.3s] ease-in-out`}>
    
      <div className="relative">
        <div className={`h-20  ${expanded ? 'from-[#00bfff] to-black' : 'from-[#ff00ff] to-[#ff00ff00]'} absolute bottom-0 left-0 right-0 `} />
        {project.post_pic && (
          <img 
            src={`http://localhost:8000${project.post_pic}`}
            alt={project.title}
            className={`w-[94%] h-[300px] mt-3 object-cover position-start rounded-md ${expanded ? 'block' : 'hidden'} flex m-auto`}
          />
        )}
      </div>
      <div className="p-3 bg-transparent cursor-pointer">
        <div className="flex items-center justify-between space-x-2 ">
          <div className="flex items-center justify-center flex-row space-x-2 ">
          {profilePic ? (
        <img
          src={`http://localhost:8000/${profilePic}`}
          alt={project.username}
          className="w-7 h-7 rounded-full border-solid border-1 border-black"
        />
      ) : (
        <FaUser className="w-4 h-4 text-gray" />
      )}  
            <span className="text-sm text-gray-600 font-semibold hover:text-gray-900"><a href="">{project.username}</a></span>
          </div>
          <div className='flex justify-center gap-3 items-center transition duration-[0.3s] ease-in-out'>
            {!isSaved ? (
              <FaRegBookmark
                className="w-6 h-6 text-purple-600"
                onClick={toggleSave}
              />
            ) : (
              <FaBookmark
                className="w-6 h-6 text-purple-600 outline-1"
                onClick={toggleSave}
              />
            )}
            {!isLiked ? (
              <FaRegHeart
                className="w-7 h-7 text-[#ff393c]"
                onClick={toggleLike}
              />
            ) : (
              <FaHeart
                className="w-7 h-7 text-[#ff393c] outline-1"
                onClick={toggleLike}
              />
            )}
            <span>{likesCount}</span>
          </div>
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-[26px] font-bold mb-2">{project.title}</h3>
        <div className={`mb-2 ${expanded ? '' : 'line-clamp-1'}`}>
          <p className="text-gray-600">{project.description}</p>
        </div>
        {
          project.project_link_github && project.project_link_live && (
            <div className={`flex justify-start items-center gap-5 mt-2`}>
            <div className="flex items-center space-x-1">
              <FaGithub className="text-gray-600" />
              <a
                href={project.project_link_github}
                className="text-gray-600 hover:underline"
              >
                GitHub
              </a>
            </div>
            <div className="flex items-center space-x-1">
              <FaLink className="text-gray-600" />
              <a
                href={project.project_link_live}
                className="text-gray-600 hover:underline"
              >
                Live
              </a>
            </div>
          </div>
          )
        }
      
  
        {expanded && (
          <div>
            <div className="flex flex-wrap gap-1 mt-2">
              {project.tech_stack.split(',').map((tech, index) => (
                <span
                  key={index}
                  className="py-1 px-2 bg-[#7de6ac93] rounded-full text-xs text-gray-600"
                >
                  {tech.trim()}
                </span>
              ))}
            </div>
            <h4 className="mt-3 text-black font-semibold">Problem Statement</h4>
            <p className="mt-1 text-white-600">{project.problem_statement}</p>
          </div>
        )}
        {userProfile?.username === project.username && (
        <div className="flex justify-end mt-3">
          
          <button className="text-white hover:underline p-2 rounded-md bg-red-600" onClick={() => setDeleteConfirmationOpen(true)}>Delete</button>
        </div>
      )}
        {deleteConfirmationOpen && (
  <div className="mt-3">
    <p>Are you sure you want to delete this post?</p>
    <button className="text-red-600 hover:underline" onClick={handleDelete}>Confirm Delete</button>
    <button className="ml-2 text-blue-600 hover:underline" onClick={() => setDeleteConfirmationOpen(false)}>Cancel</button>
  </div>
)}
        <button
          className={`mt-2 text-purple-600 hover:text-purple-800`}
          onClick={toggleExpanded}
        >
          {expanded ? 'Collapse' : 'Read More'}
        </button>
      </div>
    </div>
  );
}
  export default ProjectCard;  