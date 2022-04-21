import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AuthLayout from '../components/common/AuthLayout';
import ButtonLoading from '../components/common/LoadingButton';
import { setToast } from '../components/common/ToastMessage';
import { ROOT_API } from '../config';
import { loginValidator } from './validator';

export default function Login() {
  const [email, emailSet] = useState('');
  const [password, passwordSet] = useState('');
  const [loading, loadingSet] = useState(false);
  const [isAuthenticated, isAuthenticatedSet] = useState(false);

  const [errors, errorsSet] = useState({ email: '', password: '' });

  useEffect(() => {
    if (isAuthenticated) {
      window.location.href = '/';
    }
  }, [isAuthenticated]);

  const handleSubmission = (e) => {
    e.preventDefault();
    errorsSet({});
    const { errors, isValid } = loginValidator({ email, password });
    if (!isValid) {
      errorsSet(errors);
      return;
    }
    loadingSet(true);

    setTimeout(() => {
      axios
        .post(ROOT_API + '/auth/login', { email, password })
        .then((res) => {
          loadingSet(false);
          emailSet('');
          passwordSet('');
          isAuthenticatedSet(true);
          const authState = {
            accessToken: res.data.access,
            refreshToken: res.data.refresh,
            isAuthenticated: true,
          };
          localStorage.setItem('state', JSON.stringify(authState));
          setToast('success', 'Succesfully logged in!');
        })
        .catch((err) => {
          loadingSet(false);
          setToast('error', err?.response?.data?.message);

          passwordSet('');
        });
    }, 1000);
  };

  return (
    <AuthLayout>
      <form className='bg-white'>
        <h1 className='text-gray-800 font-bold text-2xl mb-1'>
          Sign in to your account
        </h1>
        <p className='text-sm font-normal text-gray-600 mb-7'>
          Or{' '}
          <Link to='/register'>
            <u> register a new account.</u>
          </Link>
        </p>
        <div className='flex items-center border-2 py-2 px-3 rounded-2xl mb-4'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-5 w-5 text-gray-400'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207'
            />
          </svg>
          <input
            className='pl-2 outline-none border-none'
            type='text'
            name='email'
            id='email'
            value={email}
            onChange={(e) => emailSet(e.target.value)}
            placeholder='Email Address'
          />
          {errors?.email ? (
            <small className='text-red-500'>{errors?.email}</small>
          ) : (
            ''
          )}
        </div>
        <div className='flex items-center border-2 py-2 px-3 rounded-2xl'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-5 w-5 text-gray-400'
            viewBox='0 0 20 20'
            fill='currentColor'
          >
            <path
              fillRule='evenodd'
              d='M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z'
              clipRule='evenodd'
            />
          </svg>
          <input
            className='pl-2 outline-none border-none'
            type='password'
            name='password'
            id='password'
            value={password}
            onChange={(e) => passwordSet(e.target.value)}
            placeholder='Password'
          />
          {errors?.password ? (
            <small className='text-red-500'>{errors?.password}</small>
          ) : (
            ''
          )}
        </div>
        <button
          type='submit'
          onClick={handleSubmission}
          disabled={loading}
          className='block w-full bg-indigo-600 mt-4 py-2 rounded-2xl text-white font-semibold mb-2'
        >
          {loading ? <ButtonLoading /> : 'Login'}
        </button>
        <a
          href='#'
          onClick={() => alert('Coming soon!!')}
          className='text-sm ml-2 hover:text-blue-500 cursor-pointer'
        >
          Forgot Password ?
        </a>
      </form>
    </AuthLayout>
  );
}
