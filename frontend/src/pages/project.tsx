import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface ProjectData {
  title: string;
  description: string;
  tech_stack: string;
  project_link_github: string;
  project_link_live: string;
  problem_statement: string;
  post_pic: File | null;
}

const UploadProjectForm: React.FC = () => {
  const [projectData, setProjectData] = useState<ProjectData>({
    title: '',
    description: '',
    tech_stack: '',
    project_link_github: '',
    project_link_live: '',
    problem_statement: '',
    post_pic: null,
  });

  
const handleSubmit = async (event: React.FormEvent) => {
  event.preventDefault();

  // Perform frontend validation
  if (
    !projectData.title ||
    !projectData.description ||
    !projectData.tech_stack ||
    !projectData.project_link_github
  ) {
    toast.error('Please fill in all required fields.');
    return;
  }

  try {
    const formData = new FormData();
    formData.append('title', projectData.title);
    formData.append('description', projectData.description);
    formData.append('tech_stack', projectData.tech_stack);
    formData.append('project_link_github', projectData.project_link_github);
    formData.append('project_link_live', projectData.project_link_live);
    formData.append('problem_statement', projectData.problem_statement);
    
    if (projectData.post_pic) {
      formData.append('post_pic', projectData.post_pic);
    }

    const response = await fetch('http://localhost:8000/api/post_project', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      },
      body: formData,
    });

    const data = await response.json();

    if (response.ok) {
      toast.success(data.message);
      console.log(data);
      // Clear form data after successful submission
      setProjectData({
        title: '',
        description: '',
        tech_stack: '',
        project_link_github: '',
        project_link_live: '',
        problem_statement: '',
        post_pic: null,
      });
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    toast.error('An error occurred');
  }
};
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setProjectData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    setProjectData((prevData) => ({
      ...prevData,
      post_pic: file,
    }));
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4">Upload Your Project</h2>
        <form onSubmit={handleSubmit} encType='multi/form-data'>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              name="title"
              value={projectData.title}
              onChange={handleInputChange}
              className="mt-1 p-2 border rounded w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              name="description"
              value={projectData.description}
              onChange={handleInputChange}
              rows={4}
              className="mt-1 p-2 border rounded w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Tech Stack</label>
            <input
              type="text"
              name="tech_stack"
              value={projectData.tech_stack}
              onChange={handleInputChange}
              className="mt-1 p-2 border rounded w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">GitHub Link</label>
            <input
              type="text"
              name="project_link_github"
              value={projectData.project_link_github}
              onChange={handleInputChange}
              className="mt-1 p-2 border rounded w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Live Link</label>
            <input
              type="text"
              name="project_link_live"
              value={projectData.project_link_live}
              onChange={handleInputChange}
              className="mt-1 p-2 border rounded w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Problem Statement</label>
            <textarea
              name="problem_statement"
              value={projectData.problem_statement}
              onChange={handleInputChange}
              rows={4}
              className="mt-1 p-2 border rounded w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Upload Image</label>
            <input
              type="file"
              
              name="post_pic"
              onChange={handleFileChange}
              className="mt-1 p-2"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Submit
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default UploadProjectForm;
