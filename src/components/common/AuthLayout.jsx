import React from 'react';
import logo from '../../assets/logo.png';

export default function AuthLayout({ children }) {
  return (
    <>
      <div className='h-screen flex container'>
        <div className='md:flex hidden w-1/2 bg-gradient-to-tr from-gray-100 to-yellow-300 i justify-around items-center'>
          <div>
            <a href='/'>
              <img src={logo} />
            </a>
            <p className='text-black mt-5 p-5'>
              Enabling generations to share knowhow and expertise globally.
            </p>
          </div>
        </div>
        <div className='flex w-100 md:w-1/2 justify-center items-center bg-white p-5'>
          {children}
        </div>
      </div>
    </>
  );
}
