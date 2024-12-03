import logo from '@/assets/image/logo.png';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Header() {
  const navigator = useNavigate();
  const [LinkItems, setLinkItems] = useState([
    // { title: 'Search', pathname: '/' },
    { title: 'Home', pathname: '/' },
    { title: 'Movie', pathname: '/list-movies' },
    { title: 'Login', pathname: '/login' },
  ]);
  const [loginStatus, setLoginStatus] = useState(false);
  const [openAction, setOpenAction] = useState(false);

  const handleLogOut = () => {
    localStorage.removeItem('user');
    navigator('/');
    window.location.reload();
  };

  useEffect(() => {
    let user = localStorage.getItem('user');
    if (user) {
      const userData = JSON.parse(user);
      setLoginStatus(true);
      if (userData?.role === 'admin') {
        setLinkItems([
          { title: 'Dashboard', pathname: '/admin/dashboard' },
          { title: 'Movie', pathname: '/admin/list-movies' },
          { title: 'User', pathname: '/admin/user-management' },
        ]);
      } else {
        setLinkItems([
          // { title: 'Search', pathname: '/' },
          { title: 'Home', pathname: '/' },
          { title: 'Movie', pathname: '/list-movies' },
          { title: 'History', pathname: '/history' },
          { title: 'Cart', pathname: '/cart' },
        ]);
      }
    } else {
      setLinkItems([
        // { title: 'Search', pathname: '/' },
        { title: 'Home', pathname: '/' },
        { title: 'Movie', pathname: '/list-movies' },
        { title: 'Login', pathname: '/login' },
      ]);
    }
  }, []);
  return (
    <>
      <div className='d-flex flex-column flex-md-row align-items-center p-3 px-md-4 justify-content-around bg-white border-bottom box-shadow'>
        <Link to={'/'}>
          <img className='my-0 font-weight-normal' src={logo} alt='logo' />
        </Link>
        <nav className='my-2 my-md-0 mr-md-3'>
          {LinkItems.map((item, index) => (
            <Link
              key={index}
              className={
                item?.title === 'Login'
                  ? 'btn btn-outline-info'
                  : 'pl-5 pr-5 pt-4 pb-4 text-dark mr-4'
              }
              to={item.pathname}
            >
              {item.title}
            </Link>
          ))}
          {loginStatus && (
            <>
              <p
                className='btn btn-icon btn-transparent-dark dropdown-toggle show'
                id='navbarDropdownUserImage'
                role='button'
                data-bs-toggle='dropdown'
                aria-haspopup='true'
                aria-expanded='false'
                onClick={() => setOpenAction(!openAction)}
                style={{
                  padding: '0',
                  borderRadius: '50%',
                  margin: "0"
                }}
              >
                <img
                  className='img-fluid'
                  src='https://sb-admin-pro.startbootstrap.com/assets/img/illustrations/profiles/profile-1.png'
                  alt='avatar'
                />
              </p>

              {openAction && (
                <div
                  className='dropdown-menu dropdown-menu-end border-0 shadow animated--fade-in-up show'
                  aria-labelledby='navbarDropdownUserImage'
                  data-bs-popper='static'
                  style={{
                    position: 'absolute',
                    right: '15%',
                  }}
                >
                  <a className='dropdown-item' href='#!'>
                    <div className='dropdown-item-icon'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='24'
                        height='24'
                        viewBox='0 0 24 24'
                        fill='none'
                        stroke='currentColor'
                        strokeWidth='2'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        className='feather feather-settings'
                      >
                        <circle cx='12' cy='12' r='3'></circle>
                        <path d='M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z'></path>
                      </svg>
                    </div>
                    Account
                  </a>
                  <button
                    className='dropdown-item'
                    href='#!'
                    type='button'
                    onClick={handleLogOut}
                  >
                    <div className='dropdown-item-icon'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='24'
                        height='24'
                        viewBox='0 0 24 24'
                        fill='none'
                        stroke='currentColor'
                        strokeWidth='2'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        className='feather feather-log-out'
                      >
                        <path d='M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4'></path>
                        <polyline points='16 17 21 12 16 7'></polyline>
                        <line x1='21' y1='12' x2='9' y2='12'></line>
                      </svg>
                    </div>
                    Logout
                  </button>
                </div>
              )}
            </>
          )}
        </nav>
      </div>
    </>
  );
}

export default Header;
