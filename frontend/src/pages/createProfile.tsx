import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';

interface FormData {
  username: string;
  bio: string;
  interested_tech_stacks: string;
  github_link: string;
  twitter_link: string;
  linkedin_link: string;
  linktree_link: string;
  profile_pic: File | null;
  cover_pic: File | null;
}

const CreateProfile: React.FC = () => {
  const router = useRouter();

  const [formData, setFormData] = useState<FormData>({
    username: '',
    bio: '',
    interested_tech_stacks: '',
    github_link: '',
    twitter_link: '',
    linkedin_link: '',
    linktree_link: '',
    profile_pic: null,
    cover_pic: null,
  });

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // Perform frontend validation
    if (
      !formData.username ||
      !formData.bio ||
      !formData.profile_pic ||
      !formData.cover_pic
    ) {
      toast.error('Please fill in all required fields.');
      return;
    }

    try {
      const form = new FormData();
      form.append('username', formData.username);
      form.append('bio', formData.bio);
      form.append('interested_tech_stacks', formData.interested_tech_stacks);
      form.append('github_link', formData.github_link);
      form.append('twitter_link', formData.twitter_link);
      form.append('linkedin_link', formData.linkedin_link);
      form.append('linktree_link', formData.linktree_link);
      form.append('profile_pic', formData.profile_pic);
      form.append('cover_pic', formData.cover_pic);

      const response = await fetch('https://thinkdevs.onrender.com/api/profile', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
        body: form,
      });

      const data = await response.json();
      if (response.ok) {
        toast.success(data.message);
        console.log(data);
        // Clear form data after successful submission
        setFormData({
          username: '',
          bio: '',
          interested_tech_stacks: '',
          github_link: '',
          twitter_link: '',
          linkedin_link: '',
          linktree_link: '',
          profile_pic: null,
          cover_pic: null,
        });

        router.push('/');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error('An error occurred');
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    setFormData((prevData) => ({
      ...prevData,
      [event.target.name]: file,
    }));
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4">Create Profile</h2>
        <form onSubmit={handleSubmit} encType='multipart/form-data'>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              className="mt-1 p-2 border rounded w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Bio</label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleInputChange}
              rows={4}
              className="mt-1 p-2 border rounded w-full"
            />
          </div>
          <div className="mb-4">
  <label className="block text-sm font-medium text-gray-700">Interested Tech Stacks</label>
  <input
    type="text"
    name="interested_tech_stacks"
    value={formData.interested_tech_stacks}
    onChange={handleInputChange}
    className="mt-1 p-2 border rounded w-full"
  />
</div>
<div className="mb-4">
  <label className="block text-sm font-medium text-gray-700">GitHub Link</label>
  <input
    type="text"
    name="github_link"
    value={formData.github_link}
    onChange={handleInputChange}
    className="mt-1 p-2 border rounded w-full"
  />
</div>
<div className="mb-4">
  <label className="block text-sm font-medium text-gray-700">Twitter Link</label>
  <input
    type="text"
    name="twitter_link"
    value={formData.twitter_link}
    onChange={handleInputChange}
    className="mt-1 p-2 border rounded w-full"
  />
</div>
<div className="mb-4">
  <label className="block text-sm font-medium text-gray-700">LinkedIn Link</label>
  <input
    type="text"
    name="linkedin_link"
    value={formData.linkedin_link}
    onChange={handleInputChange}
    className="mt-1 p-2 border rounded w-full"
  />
</div>
<div className="mb-4">
  <label className="block text-sm font-medium text-gray-700">LinkTree Link</label>
  <input
    type="text"
    name="linktree_link"
    value={formData.linktree_link}
    onChange={handleInputChange}
    className="mt-1 p-2 border rounded w-full"
  />
</div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Profile Picture</label>
            <input
              type="file"
              name="profile_pic"
              onChange={handleFileChange}
              className="mt-1 p-2"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Cover Picture</label>
            <input
              type="file"
              name="cover_pic"
              onChange={handleFileChange}
              className="mt-1 p-2"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Create Profile
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default CreateProfile;
