import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function SignUpPage() {
  const navigator = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    townCity: '',
    userName: '',
    password: '',
    role: 'user',
    isActive: true,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    if (formData?.password === formData?.confirmPassword) {
      axios
        .post('http://localhost:9999/users', formData)
        .then((response) => {
          alert('Sign up successfully');
          navigator('/');
        })
        .catch((error) => {
          alert('Error submitting data', error);
        });
    } else {
      alert('Mật khẩu xác nhận không đúng');
    }
  };

  return (
    <div
      className='card shadow-lg border-0 rounded-lg mt-5 mb-5'
      style={{
        width: '600px',
        margin: '0 auto',
        boxShadow: '0 0px 3rem rgba(0,0,0,.175)',
      }}
    >
      <div className='card-header justify-content-center'>
        <h3 className='fw-light my-4'>Create Account</h3>
      </div>
      <div className='card-body'>
        <form>
          <div className='row gx-3'>
            <div className='col-md-6'>
              <div className='mb-3'>
                <label className='small mb-1' htmlFor='inputFirstName'>
                  First Name
                </label>
                <input
                  className='form-control'
                  id='inputFirstName'
                  name='firstName'
                  type='text'
                  placeholder='Enter first name'
                  value={formData.firstName}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className='col-md-6'>
              <div className='mb-3'>
                <label className='small mb-1' htmlFor='inputLastName'>
                  Last Name
                </label>
                <input
                  className='form-control'
                  id='inputLastName'
                  name='lastName'
                  type='text'
                  placeholder='Enter last name'
                  value={formData.lastName}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
          <div className='mb-3'>
            <label className='small mb-1' htmlFor='inputEmailAddress'>
              Email
            </label>
            <input
              className='form-control'
              id='inputEmailAddress'
              name='email'
              type='email'
              aria-describedby='emailHelp'
              placeholder='Enter email address'
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>
          <div className='mb-3'>
            <label className='small mb-1' htmlFor='inputPhone'>
              Phone
            </label>
            <input
              className='form-control'
              id='inputPhone'
              name='phone'
              type='text'
              aria-describedby='emailHelp'
              placeholder='Enter phone number'
              value={formData.phone}
              onChange={handleInputChange}
            />
          </div>
          <div className='mb-3'>
            <label className='small mb-1' htmlFor='inputTownCity'>
              Town/City
            </label>
            <input
              className='form-control'
              id='inputTownCity'
              name='townCity'
              type='text'
              aria-describedby='emailHelp'
              placeholder='Enter town or city'
              value={formData.townCity}
              onChange={handleInputChange}
            />
          </div>
          <div className='mb-3'>
            <label className='small mb-1' htmlFor='inputUserName'>
              Username
            </label>
            <input
              className='form-control'
              id='inputUserName'
              name='userName'
              type='text'
              aria-describedby='emailHelp'
              placeholder='Enter username'
              value={formData.userName}
              onChange={handleInputChange}
            />
          </div>
          <div className='row gx-3'>
            <div className='col-md-6'>
              <div className='mb-3'>
                <label className='small mb-1' htmlFor='inputPassword'>
                  Password
                </label>
                <input
                  className='form-control'
                  id='inputPassword'
                  name='password'
                  type='password'
                  placeholder='Enter password'
                  value={formData.password}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className='col-md-6'>
              <div className='mb-3'>
                <label className='small mb-1' htmlFor='inputConfirmPassword'>
                  Confirm Password
                </label>
                <input
                  className='form-control'
                  id='inputConfirmPassword'
                  name='confirmPassword'
                  type='password'
                  placeholder='Confirm password'
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
          <button
            className='btn btn-info btn-block'
            onClick={handleSubmit}
            type='button'
          >
            Create Account
          </button>
        </form>
      </div>
      <div className='card-footer text-center'>
        <div className='small'>
          <Link to='/login' style={{ color: '#17a2b8' }}>
            Have an account? Go to login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SignUpPage;
