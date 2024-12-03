import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function ForgetPassword() {
  const navigator = useNavigate();
  const [value, setValue] = useState('');
  const handleSubmit = () => {
    axios
      .get(`http://localhost:9999/users?userName=${value}`)
      .then((response) => {
        if (response.data.length) {
          localStorage.setItem('user', JSON.stringify(response.data[0]));
          navigator(`/reset-password/${response.data[0]?.id}`);
        } else {
          alert('Người dùng không tồn tại');
        }
      })
      .catch((error) => {
        alert('Error submitting data', error);
      });
  };

  return (
    <div
      className='card shadow-lg border-0 rounded-lg mt-5'
      style={{
        width: '600px',
        margin: '0 auto',
        boxShadow: '0 0px 3rem rgba(0,0,0,.175)',
      }}
    >
      <div className='card-header justify-content-center'>
        <h3 className='fw-light my-4'>Password Recovery</h3>
      </div>
      <div className='card-body'>
        <div className='small mb-3 text-muted'>
          Enter your username to continue
        </div>
        <form>
          <div className='mb-3'>
            <label className='small mb-1' htmlFor='inputUsername'>
              Username
            </label>
            <input
              className='form-control'
              id='inputUsername'
              type='text'
              aria-describedby='emailHelp'
              placeholder='Enter username'
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
          </div>
          <div className='d-flex align-items-center justify-content-between mt-4 mb-0'>
            <Link to='/login' style={{ color: '#17a2b8' }}>
              Return to login
            </Link>
            <button
              className='btn btn-info'
              type='button'
              onClick={handleSubmit}
            >
              Continue
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

export default ForgetPassword;
