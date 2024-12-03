import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function LoginPage() {
  const navigation = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    axios
      .get(
        `http://localhost:9999/users?email=${formData?.email}&password=${formData?.password}`,
      )
      .then((response) => {
        if (response?.data && response?.data.length) {
          alert('Login successful');
          const userData = response.data[0];
          localStorage.setItem('user', JSON.stringify(userData));
          if (userData?.role === 'admin') {
            navigation('/admin/dashboard');
          } else {
            navigation('/list-movies');
          }
          window.location.reload();
        } else {
          alert('Check your username and password. Then try again.');
        }
      })
      .catch((error) => {
        alert('Error submitting data', error);
      });
  };

  return (
    <div
      className='card border-0 rounded-lg mt-5'
      style={{
        width: '600px',
        margin: '0 auto',
        boxShadow: '0 0px 3rem rgba(0,0,0,.175)',
      }}
    >
      <div className='card-header justify-content-center'>
        <h3 className='fw-light my-4'>Login</h3>
      </div>
      <div className='card-body'>
        <form>
          <div className='mb-3'>
            <label className='small mb-1' htmlFor='inputEmailAddress'>
              Email
            </label>
            <input
              className='form-control'
              id='inputEmailAddress'
              type='email'
              placeholder='Enter email address'
              name='email'
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>
          <div className='mb-3'>
            <label className='small mb-1' htmlFor='inputPassword'>
              Password
            </label>
            <input
              className='form-control'
              id='inputPassword'
              type='password'
              placeholder='Enter password'
              name='password'
              value={formData.password}
              onChange={handleInputChange}
            />
          </div>
          <div className='d-flex align-items-center justify-content-between mt-4 mb-0'>
            <Link to='/forget-password'>Forgot Password?</Link>
            <button
              type='button'
              className='btn btn-info'
              onClick={handleSubmit}
            >
              Login
            </button>
          </div>
        </form>
      </div>
      <div className='card-footer text-center'>
        <div className='small'>
          <Link to='/sign-up' style={{ color: '#17a2b8' }}>
            Need an account? Sign up!
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
