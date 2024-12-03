import { useLocation, useNavigate } from 'react-router-dom';
import Banner from '@/components/Banner';
import { useEffect, useState } from 'react';
import axios from 'axios';
import image from '../assets/image/1.jpg';

function ListMovie() {
  const [movieDatas, setMovieDatas] = useState([]);
  const navigator = useNavigate();
  const location = useLocation();
  const handleMovieDetail = (id) => {
    navigator(`/movie/${id}`);
  };

  const handleEditMovieDetail = (id) => {
    navigator(`/admin/edit-movie/${id}`);
  };

  const handleAddNewMovie = () => {
    navigator('/admin/add-movie');
  };

  useEffect(() => {
    axios
      .get('http://localhost:9999/movies')
      .then((response) => {
        setMovieDatas(response.data);
      })
      .catch((error) => {
        alert('Error submitting data', error);
      });
  }, []);

  const MovieItem = movieDatas?.map((movie, index) => (
    <div
      className='mb-4 d-flex justify-content-center'
      style={{ width: '20%', textAlign: 'center' }}
      key={index}
    >
      <div className='card' style={{ width: '18rem' }}>
        <img
          className='card-img-top'
          src={movie.img}  
          alt='banner movie'
        />

        <div className='card-body'>
          <h5 className='card-title'>{movie.title}</h5>
          <p className='card-text'>Thể loại: {movie.type}</p>
          <p className='card-text'>Thời gian: {movie.time} phút</p>

          {location?.pathname.includes('/admin/') ? (
            <button
              className='btn btn-info'
              onClick={() => handleEditMovieDetail(movie.id)}
            >
              Chỉnh sửa thông tin
            </button>
          ) : (
            <button
              className='btn btn-info'
              onClick={() => handleMovieDetail(movie.id)}
            >
              Xem thông tin
            </button>
          )}
        </div>
      </div>
    </div>
  ));

  return (
    <>
      <Banner title={'List Movies'} />
      <div className='pl-5 pr-5 pt-4 pb-4'>
        {location?.pathname.includes('/admin/') && (
          <div className='d-flex align-items-center flex-wrap justify-content-end'>
            <button
              className='btn btn-info mb-4'
              style={{ marginRight: '2%' }}
              onClick={handleAddNewMovie}
            >
              Add new movie
            </button>
          </div>
        )}
        <div className='d-flex align-items-center flex-wrap'>{MovieItem}</div>
      </div>
    </>
  );
}

export default ListMovie;
