import React from 'react';

export const Navbar = () => {
  return (
    <nav className='bg-white shadow-lg'>
      <div className='container mx-auto px-4 py-4'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center space-x-2'>
            <img src='/speedhub-logo.svg' alt='SpeedHub' className='h-8 w-8' />
            <span className='text-xl font-bold text-gray-900'>SpeedHub</span>
          </div>
          <div>
            <a href='#about' className='text-gray-600 hover:text-gray-900'>
              About
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};
