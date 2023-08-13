import React, { useEffect, useState } from 'react';
import ProjectCard from '@/components/ProjectCard';

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
  isLiked: boolean;
  isSaved: boolean;
  type: string;
  no_of_likes: number;
}

const ShowProfile: React.FC = () => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);

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
          fetchUserPosts(data.profile.user);
        } else {
          console.error('Failed to fetch profile data');
        }
      } catch (error) {
        console.error(error);
      }
    }
    fetchUserProfile();
  }, []);

  const fetchUserPosts = async (username: string) => {
    try {
      const response = await fetch(
        `https://thinkdevs.onrender.com/api/userposts?username=${username}`,
        {
          method: 'GET',
          headers: {
            authorization: `Bearer ${localStorage.getItem('access_token')}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setPosts(data);
      } else {
        console.error('Failed to fetch user posts');
      }
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <div className="h-screen w-screen  bg-gray-100 overflow-y-scroll shadow-lg">
      {/* User profile content */}
      <div className="bg-white   backdrop-blur-sm">
        {userProfile && (
          <div className="w-full p-2">
            <div className="h-40 bg-cover bg-center rounded-t-lg border-b border-gray-300" style={{ backgroundImage: `url(https://thinkdevs.onrender.com${userProfile.profile.cover_pic})` }} />
            <div className="p-6">
              <div className="relative mt-2">
                <img src={`https://thinkdevs.onrender.com${userProfile.profile.profile_pic}`} alt="Profile" className="w-16 h-16 rounded-full object-cover border-4 border-purple-600 -mt-16 ml-5 md:ml-8 md:-mt-16 sm:ml-8 sm:-mt-16 " />
              </div>
              <div className="font-medium text-gray-800 mt-2 text-sm">@{userProfile.username}</div>
              <div className="font-medium text-gray-800 text-sm">{userProfile.profile.bio}</div>
              <div className="font-medium text-gray-800 text-sm">{userProfile.profile.email}</div>
              <div className="flex flex-wrap gap-1 mt-2">
                {userProfile.profile.interested_tech_stacks.split(',').map((tech, index) => (
                  <span
                    key={index}
                    className="py-1 px-2 bg-[#7de6ac93] rounded-full text-xs text-gray-600"
                  >
                    {tech.trim()}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Posts */}
      <div className="bg-[#e5e0e387] min-h-screen p-2 overflow-y-scroll">
      <h2
          className="mx-auto my-5 text-center font-semibold" 
        >
          Your Posts
        </h2>
        {posts.map((post) => (
  <div key={post.id} className="mb-5 flex flex-col items-center justify-center">
    <ProjectCard project={post} />
  </div>
))}
      </div>
    </div>
  );
};

export default ShowProfile;
