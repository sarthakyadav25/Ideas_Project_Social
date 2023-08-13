import React, { useState } from 'react';

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

const CreateProfile: React.FC = () => {
  const [userProfile, setUserProfile] = useState<UserProfile>({
    username: '',
    profile: {
      id: 0,
      bio: '',
      email: '',
      interested_tech_stacks: '',
      cover_pic: 'default_cover_pic.jpg', // Replace with actual URL
      profile_pic: '/media/profile_pics/default_profile_pic.jpg', // Replace with actual URL
      user: 0,
    },
  });

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;

    setUserProfile((prevProfile) => ({
      ...prevProfile,
      profile: {
        ...prevProfile.profile,
        [name]: value,
      },
    }));
  };

  return (
    <div className="min-h-screen w-full flex items-start justify-center bg-transparent">
      <div className="w-screen p-6 bg-white rounded-lg shadow-lg">
        
        <h2 className="text-xl font-semibold mt-4 mb-2 text-center">
          Create Your Profile
        </h2>
        <form className="space-y-4">
        
          <div>
          <div
          className="h-40 bg-cover bg-center rounded-t-lg"
          style={{
            backgroundImage: `url(${userProfile.profile.cover_pic})`,
          }}
        />
        <div className="relative w-16 h-16 -mt-8 ml-5 md:ml-8 md:-mt-8  sm:ml-8 sm:-mt-8 ">
          <input 
          type="file"
          name="cover_pic"
          // onChange={handleFileChange}
          className="mt-1 p-2"
        />
          <img
            src={userProfile.profile.profile_pic}
            alt="Profile"
            className="w-full h-full rounded-full object-cover border-4 border-white"
          />
        </div>
            <label htmlFor="username" className="font-medium">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={userProfile.username}
              onChange={handleInputChange}
              placeholder="Enter your username"
              className="w-full px-3 py-2 border rounded focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="bio" className="font-medium">
              Bio
            </label>
            <textarea
              id="bio"
              name="bio"
              value={userProfile.profile.bio}
              onChange={handleInputChange}
              placeholder="Write a short bio about yourself"
              className="w-full px-3 py-2 border rounded focus:outline-none"
              rows={4}
            />
          </div>
          <div>
            <label htmlFor="email" className="font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={userProfile.profile.email}
              onChange={handleInputChange}
              placeholder="Enter your email"
              className="w-full px-3 py-2 border rounded focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="interestedTechStacks" className="font-medium">
              Interested Tech Stacks
            </label>
            <input
              type="text"
              id="interestedTechStacks"
              name="interested_tech_stacks"
              value={userProfile.profile.interested_tech_stacks}
              onChange={handleInputChange}
              placeholder="Enter your interested tech stacks"
              className="w-full px-3 py-2 border rounded focus:outline-none"
            />
          </div>
          {/* Add more fields here */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProfile;
