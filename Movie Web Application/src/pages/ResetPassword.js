import { Link, useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react'; // Import useState from React
import axios from 'axios';

function ResetPassword() {
  const navigator = useNavigate();
  const { id } = useParams();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = () => {
    if (password === confirmPassword) {
      const userData = localStorage.getItem('user');
      if (userData) {
        let userDataDecode = JSON.parse(userData);
        axios
          .put(`http://localhost:9999/users/${id}`, {
            ...userDataDecode,
            password: password,
          })
          .then((response) => {
            alert('Cập nhật mật khẩu thành công');
            navigator('/login');
          })
          .catch((error) => {
            alert('Error submitting data', error);
          });
      }
    } else {
      alert('Xác nhận mật khẩu không đúng');
    }
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
          Enter your email address and we will send you a link to reset your
          password.
        </div>
        <form>
          <div className='mb-3'>
            <label className='small mb-1' htmlFor='inputPassword'>
              Password
            </label>
            <input
              className='form-control'
              id='inputPassword'
              type='password'
              placeholder='Enter password'
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
          <div className='mb-3'>
            <label className='small mb-1' htmlFor='inputConfirmPassword'>
              Confirm Password
            </label>
            <input
              className='form-control'
              id='inputConfirmPassword'
              type='password'
              placeholder='Enter confirm password'
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
            />
          </div>
          <div className='d-flex align-items-center justify-content-between mt-4 mb-0'>
            <Link to='/forget-password' style={{ color: '#17a2b8' }}>
              Cancel
            </Link>
            <button
              onClick={handleSubmit}
              type='button'
              className='btn btn-info'
            >
              Reset Password
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

export default ResetPassword;
