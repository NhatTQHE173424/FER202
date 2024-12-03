import Header from '../components/Header';
import Footer from '../components/Footer';
import { useLocation } from 'react-router-dom';

const DefaultLayout = ({ children }) => {
  const location = useLocation();
  return (
    <div>
      <Header />
      <div
        style={{
          minHeight: '71vh',
          backgroundColor: location.pathname.includes('/admin/dashboard')
            ? '#f2f6fc'
            : '#fff',
        }}
      >
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default DefaultLayout;
