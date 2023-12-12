'use client';
// Navbar.js

import React, { useState, useEffect } from 'react';
import Skeleton from '@mui/material/Skeleton';
import Button from '@mui/material/Button';

const data = [
  { id: 1, category: 'Paket', imageUrl: '/Images/1.jpg' },
  { id: 2, category: 'Makanan', imageUrl: '/Images/2.jpg' },
  { id: 3, category: 'Snack', imageUrl: '/Images/3.jpg' },
  { id: 4, category: 'Coffe', imageUrl: '/Images/2.jpg' },
  { id: 5, category: 'Ice Drink', imageUrl: '/Images/4.jpg' },
  { id: 6, category: 'Hot Drink', imageUrl: '/Images/1.jpg' },
  // ... tambahkan data lainnya sesuai kebutuhan
];

const Navbar = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Simulate loading delay (e.g., fetching data from API)
    const delay = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(delay);
  }, [activeCategory]);

  const filteredData =
    activeCategory === 'All'
      ? data
      : data.filter((item) => item.category === activeCategory);

  const handleCategoryChange = (category) => {
    if (activeCategory !== category) {
      setLoading(true);
      setActiveCategory(category);
    }
  };

  return (
    <div className="mx-auto max-w-screen-2xl px-4 pb-4">
      {/* Navigasi tombol di atas */}
      <div className="mb-4 p-4 flex justify-center flex-wrap">
        <Button
          onClick={() => handleCategoryChange('All')}
          disabled={loading}
          className={`bg-blue-500 text-white px-4 py-2 rounded mx-2 my-2 sm:mx-1 ${
            activeCategory === 'All' ? 'border border-white' : ''
          }`}
        >
          All
        </Button>
        <Button
          onClick={() => handleCategoryChange('Paket')}
          disabled={loading}
          className={`bg-blue-500 text-white px-4 py-2 rounded mx-2 my-2 sm:mx-1 ${
            activeCategory === 'Paket' ? 'border border-white' : ''
          }`}
        >
          Paket
        </Button>
        <Button
          onClick={() => handleCategoryChange('Makanan')}
          disabled={loading}
          className={`bg-blue-500 text-white px-4 py-2 rounded mx-2 my-2 sm:mx-1 ${
            activeCategory === 'Makanan' ? 'border border-white' : ''
          }`}
        >
          Makanan
        </Button>
        <Button
          onClick={() => handleCategoryChange('Snack')}
          disabled={loading}
          className={`bg-blue-500 text-white px-4 py-2 rounded mx-2 my-2 sm:mx-1 ${
            activeCategory === 'Snack' ? 'border border-white' : ''
          }`}
        >
          Snack
        </Button>
        <Button
          onClick={() => handleCategoryChange('Coffe')}
          disabled={loading}
          className={`bg-blue-500 text-white px-4 py-2 rounded mx-2 my-2 sm:mx-1 ${
            activeCategory === 'Coffe' ? 'border border-white' : ''
          }`}
        >
          Coffe
        </Button>
        <Button
          onClick={() => handleCategoryChange('Ice Drink')}
          disabled={loading}
          className={`bg-blue-500 text-white px-4 py-2 rounded mx-2 my-2 sm:mx-1 ${
            activeCategory === 'Ice Drink' ? 'border border-white' : ''
          }`}
        >
          Ice Drink
        </Button>
        <Button
          onClick={() => handleCategoryChange('Hot Drink')}
          disabled={loading}
          className={`bg-blue-500 text-white px-4 py-2 rounded mx-2 my-2 sm:mx-1 ${
            activeCategory === 'Hot Drink' ? 'border border-white' : ''
          }`}
        >
          Hot Drink
        </Button>
      </div>
      {/* Tampilan gambar dengan data di bawahnya */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {loading
          ? Array.from({ length: 8 }).map((_, index) => (
              <Skeleton
                key={index}
                variant="rectangular"
                width="100%"
                height={200}
              />
            ))
          : filteredData.map((item) => (
              <div
                key={item.id}
                className="card card-compact bg-base-100 shadow-xl rounded-md overflow-hidden"
              >
                <div className="relative">
                  <figure>
                    <img
                      src={item.imageUrl}
                      alt={`Gambar ${item.id}`}
                      className="w-full h-full object-cover"
                    />
                  </figure>
                  <p className="text-sm text-left mt-2 text-white absolute top-0 left-0 p-2 bg-red-500">
                    Rp.10.000
                  </p>
                </div>
                
                <div className="card-body p-4">
                  <h2 className="card-title text-xl font-bold mb-2">
                    {item.category}
                  </h2>
                  <p className="text-gray-600 mb-4">Description goes here.</p>
                  <div className="card-actions flex justify-end">
                    <button className="btn btn-primary pr-2">Buy Now</button>
                    <button className="btn btn-primary">Detail</button>
                  </div>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
};

export default Navbar;
