import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface ideasData {
  title: string;
  description: string;
  tech_stack: string;
  project_link_github: string;
  project_link_live: string;
  problem_statement: string;
}

const UploadProjectForm: React.FC = () => {
  const [ideasData, setideasData] = useState<ideasData>({
    title: '',
    description: '',
    tech_stack: '',
    project_link_github: '',
    project_link_live: '',
    problem_statement: '',
  });

  
const handleSubmit = async (event: React.FormEvent) => {
  event.preventDefault();

  // Perform frontend validation
  if (
    !ideasData.title ||
    !ideasData.description 
  ) {
    toast.error('Please fill in all required fields.');
    return;
  }

  try {
    const formData = new FormData();
    formData.append('title', ideasData.title);
    formData.append('description', ideasData.description);
    formData.append('tech_stack', ideasData.tech_stack);
    formData.append('project_link_github', ideasData.project_link_github);
    formData.append('project_link_live', ideasData.project_link_live);
    formData.append('problem_statement', ideasData.problem_statement);
    
  

    const response = await fetch('http://localhost:8000/api/post_idea', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      },
      body: formData,
    });

    console.log('API Response:', response);
    const data = await response.json();
    console.log('Data:', data);
    if (response.ok) {
      if (data.message) {
        toast.success(data.message);
      }
    
      console.log(data);
      // Clear form data after successful submission
      setideasData({
        title: '',
        description: '',
        tech_stack: '',
        project_link_github: '',
        project_link_live: '',
        problem_statement: '',
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
    setideasData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    setideasData((prevData) => ({
      ...prevData,
      post_pic: file,
    }));
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4">Upload Your Idea</h2>
        <form onSubmit={handleSubmit} encType='multipart/form-data'>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              name="title"
              value={ideasData.title}
              onChange={handleInputChange}
              className="mt-1 p-2 border rounded w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              name="description"
              value={ideasData.description}
              onChange={handleInputChange}
              rows={4}
              className="mt-1 p-2 border rounded w-full"
            />
          </div>
          
          
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Problem Statement</label>
            <textarea
              name="problem_statement"
              value={ideasData.problem_statement}
              onChange={handleInputChange}
              rows={4}
              className="mt-1 p-2 border rounded w-full"
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
