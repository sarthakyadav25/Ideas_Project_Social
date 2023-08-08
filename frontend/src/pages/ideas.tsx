import React, { useState } from 'react';

interface Idea {
  title: string;
  description: string;
  problemStatement: string;
  postPic: File | null;
}

const Idea: React.FC = () => {
  const [formData, setFormData] = useState<Idea>({
    title: '',
    description: '',
    problemStatement: '',
    postPic: null,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const postPic = e.target.files[0];
      setFormData((prevFormData) => ({
        ...prevFormData,
        postPic,
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Implement your form submission logic here, for example, sending data to the server.
    // formData object contains all the form fields.
    console.log(formData);
  };

  return (
    <div className=" bg-white shadow-md rounded-lg p-6 h-full m-4">
      <h2 className="text-center text-3xl font-bold mb-6 text-pink-600">Share Your Idea</h2>
      <form onSubmit={handleSubmit}>
      <div className="mb-4">
          <label htmlFor="postPic" className="">
            Post Picture
          </label>
          <input
            type="file"
            name="postPic"
            id="postPic"
            onChange={handleFileChange}
            className='mt-1 px-4 py-2 w-full bg-[#e4e4f4]  border-none  rounded-md outline-none'
          />
        </div>
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            value={formData.title}
            onChange={handleChange}
            className="mt-1 px-4 py-2 w-full bg-[#e4e4f4]  border-none  rounded-md outline-none"
            placeholder='Title'
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            name="description"
            id="description"
            value={formData.description}
            onChange={handleChange}
            className="mt-1 px-4 py-2 w-full h-full  bg-[#e4e4f4]  border-none  rounded-md outline-none resize-none"
            rows={2}
            placeholder="Description"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="problemStatement" className="block text-sm font-medium text-gray-700">
            Problem Statement
          </label>
          <textarea
            name="problemStatement"
            id="problemStatement"
            value={formData.problemStatement}
            onChange={handleChange}
            className="mt-1 px-4 py-2 w-full h-full bg-[#e4e4f4]  border-none  rounded-md outline-none resize-none"
            rows={2}
            placeholder='What problem does your Idea solve?'
          />
        </div>

        
        <button
          type="submit"
          className="py-2 px-4 border-2 border-black rounded-md bg-white text-black font-medium hover:bg-black hover:text-white transition-all duration-200"
        >
          Post Idea
        </button>
      </form>
    </div>
    
  );
};

export default Idea;