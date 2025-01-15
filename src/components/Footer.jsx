import React from 'react';

export const Footer = () => {
  return (
    <footer className='bg-white border-t mt-12'>
      <div className='container mx-auto px-4 py-6'>
        <div className='flex justify-between items-center'>
          <div className='text-sm text-gray-500'>
            © 2024 SpeedHub. All rights reserved.
          </div>
          <div className='flex space-x-4 text-sm text-gray-500'>
            <a href='#privacy' className='hover:text-gray-900'>
              Privacy Policy
            </a>
            <a href='#terms' className='hover:text-gray-900'>
              Terms of Use
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
