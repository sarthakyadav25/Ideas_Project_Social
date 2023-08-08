import React, { useState } from 'react';

const IdeasModal = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    problem_statement: '',
  });

  const handleChange = (e:any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = () => {
    // You can implement form submission logic here
    console.log('Ideas Form Data:', formData);
  };



  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-md shadow-lg w-96">
        <h2 className="text-xl font-semibold mb-4">Ideas Modal</h2>
        <div className="mb-4">
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full bg-gray-100 border-none rounded-md px-3 py-2"
            placeholder="Title"
          />
        </div>
        <div className="mb-4">
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full bg-gray-100 border-none rounded-md px-3 py-2 resize-none"
            placeholder="Description"
          />
        </div>
        <div className="mb-4">
          <textarea
            name="problem_statement"
            value={formData.problem_statement}
            onChange={handleChange}
            className="w-full bg-gray-100 border-none rounded-md px-3 py-2 resize-none"
            placeholder="Problem Statement"
          />
        </div>
        <div className="flex justify-end">
          <button onClick={handleSubmit} className="px-4 py-2 bg-blue-500 text-white rounded-md">
            Submit
          </button>
          <button  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md ml-2">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default IdeasModal;
