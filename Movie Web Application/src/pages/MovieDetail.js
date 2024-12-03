import Banner from '@/components/Banner';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';

function MovieDetail() {
  const { id } = useParams();
  const [movieData, setMovieData] = useState({});
  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:9999/movies/${id}`)
        .then((response) => {
          setMovieData(response.data);
        })
        .catch((error) => {
          alert('Error submitting data', error);
          console.log(error);
        });
    }
  }, [id]);

  return (
    <>
      <Banner title={'Movie Details'} />
      <div className='d-flex' style={{ width: '94%', margin: '3% auto 0' }}>
        <div className='card flex-md-row mb-4 box-shadow h-md-250'>
          <img
            className='card-img-top'
            src={movieData.img}
            alt='banner movie'
            style={{ width: '273px', height: '426px' }}
          />
          <div
            className='card-body d-flex flex-column align-items-start'
            style={{ width: '45%' }}
          >
            <h3 className='mb-0'>
              <p className='text-dark'>{movieData?.title}</p>
            </h3>
            <div className='mb-2 mt-2 text-muted'>
              {movieData?.original_title}
            </div>
            <p className='card-text mb-auto'>{movieData?.description}</p>
            <Link
              className='btn btn-info'
              style={{ padding: '15px 50px' }}
              to={`/movie-booking/${id}`}
            >
              Đặt vé
            </Link>
          </div>
          <div className='card-body d-flex flex-column align-items-start'>
            <p className='card-text mb-auto'>Đạo Diễn: {movieData?.director}</p>
            <p className='card-text mb-auto'>Thời Lượng: {movieData?.time}</p>
            <p className='card-text mb-auto'>Ngôn Ngữ: {movieData?.language}</p>
            <p className='card-text mb-auto'>Năm Sản Xuất: {movieData?.year}</p>
            <p className='card-text mb-auto'>Quốc Gia: {movieData?.national}</p>
            <p className='card-text mb-auto'>Thể Loại: {movieData?.type}</p>
            <p className='card-text mb-auto'>Diễn Viên: {movieData?.actors}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default MovieDetail;
