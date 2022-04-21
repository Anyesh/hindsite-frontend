import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AuthLayout from '../components/common/AuthLayout';
import ButtonLoading from '../components/common/LoadingButton';
import { setToast } from '../components/common/ToastMessage';
import { ROOT_API } from '../config';
import { validator } from './validator';

export default function Register() {
  const [email, emailSet] = useState('');
  const [password, passwordSet] = useState('');
  const [password2, password2Set] = useState('');
  const [organization, organizationSet] = useState('');
  const [organizationList, organizationListSet] = useState([]);

  const [loading, loadingSet] = useState(false);
  const [errors, errorsSet] = useState({ email: '', password: '' });

  const fetchOrganizations = () => {
    axios
      .get(ROOT_API + '/organizations')
      .then((res) => organizationListSet(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchOrganizations();
  }, []);

  const handleSubmission = (e) => {
    e.preventDefault();
    const { errors, isValid } = validator({ email, password, password2 });
    if (!isValid) {
      errorsSet(errors);
      return;
    }
    loadingSet(true);

    setTimeout(() => {
      axios
        .post(ROOT_API + '/auth/register', { email, password, organization })
        .then((res) => {
          loadingSet(false);
          errorsSet({});
          emailSet('');
          passwordSet('');
          password2Set('');

          organizationSet('');
          setToast('success', 'Succesfully registered!');
        })
        .catch((err) => {
          loadingSet(false);
          errorsSet(err?.response?.data?.result);
          passwordSet('');
          password2Set('');
          setToast('error', err?.response?.data?.message);
        });
    }, 2000);
  };

  return (
    <AuthLayout>
      <form className='bg-white'>
        <h1 className='text-gray-800 font-bold text-2xl mb-1'>
          Sign up for an account
        </h1>
        <p className='text-sm font-normal text-gray-600 mb-7'>
          Or
          <Link to='/login'>
            <u> go back to login</u>
          </Link>
        </p>
        <div className='flex items-center border-2 py-2 px-3 rounded-2xl mb-4'>
          <svg
            stroke='currentColor'
            fill='none'
            className='h-5 w-5 '
            viewBox='0 0 100 100'
            xmlns='http://www.w3.org/2000/svg'
          >
            <title />
            <path d='M89.13,28.69H67.76V19.07a4,4,0,0,0-4-4H36.26a4,4,0,0,0-4,4v9.62H10.87A5.89,5.89,0,0,0,5,34.56V89.1A5.89,5.89,0,0,0,10.87,95H89.13A5.89,5.89,0,0,0,95,89.1V34.56A5.89,5.89,0,0,0,89.13,28.69ZM35,19.07a1.23,1.23,0,0,1,1.22-1.22H63.72a1.23,1.23,0,0,1,1.22,1.22v9.62H35ZM10.87,31.5H89.13a3.06,3.06,0,0,1,3.05,3.05v19H59.84V51.48A2.81,2.81,0,0,0,57,48.67H43a2.81,2.81,0,0,0-2.81,2.81v2.11H7.81v-19A3.06,3.06,0,0,1,10.87,31.5ZM57,51.48v7H43v-7Zm32.1,40.67H10.87A3.06,3.06,0,0,1,7.81,89.1V56.41H40.16v2.11A2.81,2.81,0,0,0,43,61.33H57a2.81,2.81,0,0,0,2.81-2.81V56.41H92.19V89.1A3.06,3.06,0,0,1,89.13,92.16Z' />
          </svg>
          <svg
            className='w-2 h-2 absolute top-0 right-0 m-4 pointer-events-none'
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 412 232'
          >
            <path
              d='M206 171.144L42.678 7.822c-9.763-9.763-25.592-9.763-35.355 0-9.763 9.764-9.763 25.592 0 35.355l181 181c4.88 4.882 11.279 7.323 17.677 7.323s12.796-2.441 17.678-7.322l181-181c9.763-9.764 9.763-25.592 0-35.355-9.763-9.763-25.592-9.763-35.355 0L206 171.144z'
              fill='#648299'
              fillRule='nonzero'
            />
          </svg>
          <select
            className='border-none pl-5 pr-10 bg-white hover:border-gray-400 focus:outline-none appearance-none w-full'
            value={organization}
            onChange={(e) => organizationSet(e.target.value)}
          >
            <option value={null}>Choose an organization</option>
            {organizationList?.map((org) => (
              <option key={org?.id}>{org?.name}</option>
            ))}
          </select>
          {errors?.organization ? (
            <small className='text-red-500'>{errors?.organization}</small>
          ) : (
            ''
          )}
        </div>
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
        <div className='flex items-center border-2 py-2 px-3 rounded-2xl mb-4'>
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
            name='password2'
            id='password2'
            value={password2}
            onChange={(e) => password2Set(e.target.value)}
            placeholder='Re-enter Password'
          />
          {errors?.password2 ? (
            <small className='text-red-500'>{errors?.password2}</small>
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
          {loading ? <ButtonLoading /> : 'Register'}
        </button>
      </form>
    </AuthLayout>
  );
}
