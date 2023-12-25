// components/ProfileIdentity.js
import React from 'react';
import { FaUser } from 'react-icons/fa';

const ProfileIdentity = ({ username, name, identity, profileImage }) => {
  return (
    <div className="flex items-center space-x-4">
      {profileImage ? (
        <img
          src={profileImage}
          alt={`${name}'s Avatar`}
          className="w-12 h-12 rounded-full"
        />
      ) : (
        <div className="bg-gray-300 w-12 h-12 flex items-center justify-center rounded-full">
          <FaUser className="h-6 w-6 text-gray-600" />
        </div>
      )}
      <div>
        <h2 className="text-xl font-bold">{name}</h2>
        <p className="text-gray-600">@{username}</p>
        <p className="text-gray-600">{identity}</p>
      </div>
    </div>
  );
};

export default ProfileIdentity;
