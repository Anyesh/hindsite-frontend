import axios from 'axios';
import React, { useEffect, useState } from 'react';
import logo from '../assets/logo.png';
import { setToast } from '../components/common/ToastMessage';
import { ROOT_API } from '../config';

export default function Dashboard() {
  const [showModal, showModalSet] = useState(false);
  const [post, postSet] = useState('');
  const [posts, postsSet] = useState([]);

  const [loading, loadingSet] = useState(false);

  const handleOrgLeave = () => {
    const status = confirm('Are you sure you want to leave the organization?');
    if (status) {
      axios
        .post(ROOT_API + '/user/leave-organization')
        .then((res) => {
          setToast('success', res?.data?.msg);

          location.reload();
        })
        .catch((err) => {
          setToast('error', err?.response?.data?.msg);
        });
    }
  };

  const handleLogout = () => {
    axios
      .post(ROOT_API + '/auth/logout', {
        refresh_token: JSON.parse(localStorage.state)?.refreshToken,
      })
      .then(() => {
        localStorage.clear();
        window.location.href = '/login';
      })
      .catch(() => {
        localStorage.clear();
        window.location.href = '/login';
      });
  };

  const handlePostCreate = (e) => {
    e.preventDefault();
    loadingSet(true);
    axios
      .post(ROOT_API + '/posts/add', { description: post })
      .then((res) => {
        setToast('success', 'Post created!');

        loadingSet(false);
        showModalSet(false);
        postSet('');
        window.location.reload();
      })
      .catch((err) => {
        setToast('error', err?.response?.data?.msg);

        loadingSet(false);
      });
  };

  useEffect(() => {
    axios
      .get(ROOT_API + '/posts')
      .then((res) => postsSet(res.data))
      .catch((err) => console.log(err));
  }, []);
  return (
    <>
      <header className='text-gray-600 body-font'>
        <div className='container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center'>
          <a className='flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0'>
            <img src={logo} width='100' />
          </a>
          <nav className='md:ml-auto flex flex-wrap items-center text-base justify-center cursor-pointer'>
            <a
              className='mr-5 hover:text-gray-900'
              onClick={() => showModalSet(true)}
            >
              Create Post{' '}
            </a>

            <a className='mr-5 hover:text-gray-900'>Edit Organization</a>
            <a
              className='mr-5 hover:text-gray-900'
              onClick={() => handleOrgLeave()}
            >
              Leave Organization
            </a>
          </nav>
          <button
            className='inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0'
            type='button'
            onClick={() => handleLogout()}
          >
            Logout
            <svg
              fill='none'
              stroke='currentColor'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              className='w-4 h-4 ml-1'
              viewBox='0 0 24 24'
            >
              <path d='M5 12h14M12 5l7 7-7 7'></path>
            </svg>
          </button>
        </div>
      </header>

      <div className='container mx-auto grid grid-cols-1 gap-6 my-6 px-4 md:px-6 lg:px-8'>
        <h1 className='text-gray-600'>Welcome to Organization's Feed</h1>
        <h5 className='text-gray-500'>
          You Organization:{' '}
          {localStorage?.payload &&
            JSON.parse(localStorage?.payload)?.result?.data?.user?.organization}
        </h5>
        <hr />
        <span className='text-center text-gray-500'>
          {posts.length < 1
            ? 'No Posts in this organization! Create one ❤️'
            : ''}
        </span>
        {posts?.map((p) => (
          <div
            className='max-w-xl w-full mx-auto px-4 py-4 bg-white shadow-md rounded-lg'
            key={p.id}
          >
            <div className='py-2 flex flex-row items-center justify-between'>
              <div className='flex flex-row items-center'>
                <a
                  href='#'
                  className='flex flex-row items-center focus:outline-none focus:shadow-outline rounded-lg'
                >
                  <p className='ml-2 text-base font-medium'>UID: {p.user_id}</p>
                </a>
              </div>
              <div className='flex flex-row items-center'>
                <p className='text-xs font-semibold text-gray-500'>
                  {new Date(p.created_at).toDateString()}
                </p>
              </div>
            </div>

            <hr />
            <div className='py-2'>
              <p className='leading-snug'>{p.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div
        className={` ${
          showModal ? 'fixed' : 'hidden'
        } h-screen w-full flex flex-col items-center justify-center  z-50 inset-0 bg-gray-900 bg-opacity-60 overflow-y-auto`}
      >
        <div className='h-screen absolute w-full flex items-center justify-center bg-modal'>
          <div className='bg-white rounded shadow p-8 m-4 max-w-1/2 w-1/2 max-h-full text-center overflow-y-scroll'>
            <div className='mb-4'>
              <h1>Create your post!</h1>
            </div>
            <div className='mb-8'>
              <textarea
                value={post}
                className='border-2 w-full border-yellow-300 focus:border-none p-5'
                rows={10}
                cols={50}
                placeholder='Create your post here.. .. .. .'
                onChange={(e) => postSet(e.target.value)}
              ></textarea>
            </div>
            <div className='flex justify-center'>
              <button
                type='button'
                className='bg-yellow-400 text-black p-5 rounded-md block w-1/2 mr-1'
                disabled={loading}
                onClick={(e) => handlePostCreate(e)}
              >
                {loading ? 'Loading .. .' : 'Add'}
              </button>
              <button
                type='button'
                onClick={() => showModalSet(false)}
                className='bg-gray-400 text-white p-5 rounded-md block w-1/2 ml-1'
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
