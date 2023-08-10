import React, { useEffect, useState } from 'react';

interface Post {
  id: number;
  title: string;
  description: string;
  tech_stack: string;
  project_link_github: string;
  project_link_live: string;
  problem_statement: string;
  post_pic: string | null;
}

const ProjectList: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    fetchProjects();
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
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error('An error occurred while fetching projects');
    }
  };

  return (
    <div className="bg-none min-h-screen p-8 flex justify-center items-center flex-col   max-w-full">
      <h2 className="text-2xl font-semibold mb-4">Project List</h2>
      <ul className='flex flex-wrap gap-5'>
        {posts.map((post) => (
          <li key={post.id} className="bg-white shadow-md rounded-lg p-4 mb-4 w-1/3 truncate">
            <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
            {post.post_pic ? (
              <img
              src={`http://localhost:8000${post.post_pic}`}
              alt=""
              className=" relative w-full object-cover mt-4"
              />
              ) : (
                <span className="text-gray-500 mt-4">No Picture</span>
                )}
            <p className="text-gray-600 mb-2 ">{post.description}</p>
            <p className="mb-4 ">{post.problem_statement}</p>
            <p className="text-gray-500 mb-2">Tech Stack: {post.tech_stack}</p>
            <p className="text-blue-500 mb-2">
              GitHub Link: <a href={post.project_link_github}>{post.project_link_github}</a>
            </p>
            <p className="text-blue-500 mb-2">
              Live Link: <a href={post.project_link_live}>{post.project_link_live}</a>
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectList;
