'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProfilePage = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = "token_value"; // Gantilah dengan nilai token yang sesuai
        const response = await axios.get("http://localhost:5000/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUserProfile(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user profile:', error);
        setError('Error fetching user profile. Please try again.');
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!userProfile) {
    return <p>User not found.</p>;
  }

  return (
    <div>
      <h2>Profile Page</h2>
      <p>Username: {userProfile.username}</p>
      <p>Name: {userProfile.name}</p>
      {userProfile.profile_image && (
        <img
          src={`data:image/png;base64,${userProfile.profile_image}`}
          alt="Profile"
          style={{ width: '100px', height: '100px', objectFit: 'cover' }}
        />
      )}
      {/* Add additional profile information here */}
    </div>
  );
};

export default ProfilePage;
