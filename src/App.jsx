import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import { ROOT_API } from './config';
import Dashboard from './pages/Dashboard';
import ForgotPassword from './pages/ForgotPassword';
import Login from './pages/Login';
import Register from './pages/Register';
import PrivateRoute from './utils/PrivateRoute';
import setAuthToken from './utils/setAuthToken';
import isEmpty from './validation/is-empty';

if (!isEmpty(localStorage?.state)) {
  // To reset if anything goes wrong in middle of token and payload

  // if everything goes well then
  // set auth token header auth

  const state = JSON.parse(localStorage.state);

  setAuthToken(state?.accessToken);

  // Set user and isAuthenticated
  let decoded = null;

  // check if user token is valid
  axios
    .get(`${ROOT_API}/user/ping/`)
    .then((res) => {
      localStorage.setItem('payload', JSON.stringify(res.data));
    })
    .catch((err) => {
      console.log(err);
      localStorage.clear();
      window.location.href = '/login';
    });
  decoded = jwt_decode(state?.accessToken);

  // check for expire token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    console.log('TOKEN EXPIRED!!!');
    // Handle REFRESH
    axios
      .post(ROOT_API + '/auth/token/refresh', { refresh: state?.refreshToken })
      .then((res) => {
        const authState = {
          accessToken: res.data.access,
          refreshToken: res.data.refresh,
          isAuthenticated: true,
        };
        localStorage.setItem('state', JSON.stringify(authState));
      })
      .catch(() => {
        localStorage.clear();
        window.location.href = '/login';
      });
  }
} else {
  localStorage.clear();
}

function App() {
  return (
    <Router>
      <Routes>
        <Route
          exact
          path='/'
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

        <Route exact path='/register' element={<Register />} />
        <Route exact path='/forgot-password' element={<ForgotPassword />} />

        <Route exact path='/login' element={<Login />} />
        {/*       
      <Route path="/confirm" exact element={Confirm} />
      <Route path="/reset_request" exact element={ResetForm} /> */}
        <Route path='/reset' exact element={<ForgotPassword />} />
      </Routes>
      <hr className=' border-yellow-400' />
      <div className='flex flex-wrap items-center md:justify-between justify-center'>
        <div className='w-full md:w-4/12 px-4 mx-auto text-center'>
          <div className='text-sm text-gray-600 dark:text-gray-400 py-1'>
            &copy;
            <span id='year'>2022 </span>
            <a
              href='https://github.com/Anyesh'
              className='hover:underline hover:text-gray-900'
            >
              Anish Shrestha
            </a>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
