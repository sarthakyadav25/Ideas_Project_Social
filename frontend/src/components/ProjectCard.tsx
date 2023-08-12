import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { FaUser, FaGithub, FaLink, FaBookmark, FaHeart } from 'react-icons/fa';

interface ProjectCardProps {
  project: Post;

}

interface Post {
  id: number;
  title: string;
  description: string;
  tech_stack: string;
  project_link_github: string;
  project_link_live: string;
  problem_statement: string;
  post_pic: string | null;
  username: string;
}
interface User {
  username: string;
  id: number;
    bio: string;
    email: string;
    interested_tech_stacks: string; 
    cover_pic: string | null;
    profile_pic: string | null;

}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const [expanded, setExpanded] = useState(false);
  const getUserDetails = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/getprofile/${project.username}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
         console.log(data);
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUserDetails();
  });


  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  return (
    <div  className={`bg-gradient-to-br from-[#d12bd135] via-[#f03ff020] to-[#ffffff48] shadow-md rounded-md overflow-hidden md:w-[550px] hover:shadow-none hover:border-black hover:bg-white hover:border-2 hover:border-solid cursor-pointer transition duration-[0.3s] ease-in-out`}>
      <div className={` p-3  `}>
        <div className="flex items-center space-x-2">
    
          {project.username ? (
            <img
              src={`http://localhost:8000${project.post_pic}`}
              alt={project.username}
              className="w-4 h-4 rounded-full border-solid border-1 border-black"
            />
          ) : (
            <FaUser className="w-4 h-4 text-gray" />
          )}
            <Link href=""><span className='text-sm text-gray-600 '>@{project.username} {}</span></Link>
          <FaBookmark className="w-4 h-4 text-gray" />
          <FaHeart className="w-4 h-4 text-gray" />
        </div>
      </div>
      <div className="relative">
        <div className={`h-20 ${expanded ? 'from-[#00bfff] to-black' : 'from-[#ff00ff] to-[#ff00ff00]'} absolute bottom-0 left-0 right-0 p-3`} />
        {project.post_pic && (
          <img
            src={`http://localhost:8000${project.post_pic}`}
            alt={project.title}
            className={`w-[90%] h-[300px] object-cover position-start rounded-md ${expanded ? 'block' : 'hidden'} flex m-auto`}
          />
        )}
        <div className={`h-20 ${expanded ? 'from-[#00bfff] to-black' : 'from-[#ff00ff] to-white'} absolute bottom-0 left-0 right-0`} />
      </div>
      <div className="p-4" >
        <h3 className="text-[26px]  font-bold mb-2">{project.title}</h3>
        <div className={`mb-2 ${expanded ? '' : 'line-clamp-1'}`}>
          <p className="text-gray-600">{project.description}</p>
        </div>
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
        <button
          className={`mt-2 text-purple-600 hover:text-purple-800`}
          onClick={toggleExpanded}
        >
          {expanded ? 'Collapse' : 'Read More'}
        </button>
      </div>
    </div>
  );
};

export default ProjectCard;
