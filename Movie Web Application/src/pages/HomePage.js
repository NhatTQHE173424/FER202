import content from '@/assets/image/banner.png';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <Link to={'/list-movies'}>
      <div
        style={{
          backgroundImage: `url(${content})`,
          background: `url(${content})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          minHeight: '700px',
          cursor: 'pointer',
        }}
      ></div>
    </Link>
  );
}

export default HomePage;
