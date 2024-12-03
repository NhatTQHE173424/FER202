import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Banner from '@/components/Banner';
import axios from 'axios';

function AddNewMovie() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movieData, setMovieData] = useState({
    id: null,
    title: '',
    type: '',
    time: '',
    year: '',
    director: '',
    language: '',
    national: '',
    actors: '',
    original_title: '',
    time_show: [],
    chair_type: [
      { type: 'Vip', price: '' },
      { type: 'Standard', price: '' },
    ],
    description: '',
  });

  const [timeShow, setTimeShow] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => {
    setShowModal(!showModal);
  };

  const addNewTimeShow = () => {
    const newTimeShow = new Date(timeShow).toISOString();
    const movieDuration = parseInt(movieData.time, 10);
    
    if (!isNaN(new Date(timeShow).getTime()) && !isNaN(movieDuration)) {
      const minTime = new Date(newTimeShow).getTime() - movieDuration * 60 * 1000;
      const maxTime = new Date(newTimeShow).getTime() + movieDuration * 60 * 1000;
      
      const isTimeValid = movieData.time_show.every((showtime) => {
        const showtimeInMillis = new Date(showtime).getTime();
        return showtimeInMillis < minTime || showtimeInMillis > maxTime;
      });
      
      if (isTimeValid) {
        setMovieData((prevMovieData) => ({
          ...prevMovieData,
          time_show: [...prevMovieData.time_show, newTimeShow],
        }));
        setTimeShow('');
        setShowModal(false);
      } else {
        alert("Can't add new time show. It conflicts with existing showtimes.");
      }
    } else {
      alert('Invalid input for new time show or movie duration.');
    }
  };

  const handleSubmit = () => {
    const url = id ? `http://localhost:9999/movies/${id}` : 'http://localhost:9999/movies';
    const method = id ? axios.put : axios.post;
    
    method(url, movieData)
      .then(() => {
        alert(`Movie ${id ? 'updated' : 'added'} successfully`);
        navigate('/admin/list-movies');
      })
      .catch((error) => {
        alert('Error submitting data');
        console.error(error);
      });
  };

  const removeShowTime = (index) => {
    setMovieData((prevMovieData) => ({
      ...prevMovieData,
      time_show: prevMovieData.time_show.filter((_, i) => i !== index),
    }));
  };

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:9999/movies/${id}`)
        .then((response) => {
          setMovieData(response.data);
        })
        .catch((error) => {
          alert('Error fetching movie data');
          console.error(error);
        });
    }
  }, [id]);

  const ModalShowTime = showModal && (
    <div className='modal-overlay'>
      <div
        className='modal'
        tabIndex='-1'
        role='dialog'
        style={{ display: 'block' }}
      >
        <div className='modal-dialog' role='document'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title'>Add Time Show</h5>
              <button type='button' className='close' onClick={handleShowModal}>
                <span>&times;</span>
              </button>
            </div>
            <div className='modal-body'>
              <div className='form-group'>
                <label htmlFor='timeShow'>Time show</label>
                <input
                  id='timeShow'
                  type='datetime-local'
                  className='form-control'
                  value={timeShow}
                  onChange={(e) => setTimeShow(e.target.value)}
                />
                <small className='form-text text-muted'>
                  Time for movie show
                </small>
              </div>
            </div>
            <div className='modal-footer'>
              <button
                type='button'
                className='btn btn-secondary'
                onClick={handleShowModal}
              >
                Close
              </button>
              <button
                type='button'
                className='btn btn-info'
                onClick={addNewTimeShow}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <Banner title={id ? 'Edit Movie' : 'Add New Movie'} />
      {ModalShowTime}
      <div
        className='card shadow-lg border-0 rounded-lg mt-5 mb-5'
        style={{
          width: '600px',
          margin: '0 auto',
          boxShadow: '0 0px 3rem rgba(0,0,0,.175)',
        }}
      >
        <div className='card-header justify-content-center'>
          <h3 className='fw-light my-4'>{id ? 'Edit Movie' : 'Add Movie'}</h3>
        </div>
        <div className='card-body'>
          <form>
            <div className='mb-3'>
              <label className='small mb-1' htmlFor='title'>
                Name
              </label>
              <input
                id='title'
                className='form-control'
                type='text'
                placeholder='Enter movie title'
                value={movieData.title}
                onChange={(e) =>
                  setMovieData({ ...movieData, title: e.target.value })
                }
              />
            </div>
            <div className='mb-3'>
              <label className='small mb-1' htmlFor='original_title'>
                Original Name
              </label>
              <input
                id='original_title'
                className='form-control'
                type='text'
                placeholder='Enter original title'
                value={movieData.original_title}
                onChange={(e) =>
                  setMovieData({ ...movieData, original_title: e.target.value })
                }
              />
            </div>

            <div className='row gx-3'>
              <div className='col-md-6'>
                <div className='mb-3'>
                  <label className='small mb-1' htmlFor='type'>
                    Type
                  </label>
                  <select
                    id='type'
                    className='custom-select'
                    value={movieData.type}
                    onChange={(e) =>
                      setMovieData({ ...movieData, type: e.target.value })
                    }
                  >
                    <option defaultValue>Select type</option>
                    <option value='Tình cảm'>Tình cảm</option>
                    <option value='Hành động'>Hành động</option>
                    <option value='Khoa học viễn tưởng'>Khoa học viễn tưởng</option>
                  </select>
                </div>
              </div>
              <div className='col-md-6'>
                <div className='mb-3'>
                  <label className='small mb-1' htmlFor='time'>
                    Duration (minutes)
                  </label>
                  <input
                    id='time'
                    className='form-control'
                    type='number'
                    placeholder='Enter duration'
                    value={movieData.time}
                    onChange={(e) =>
                      setMovieData({ ...movieData, time: e.target.value })
                    }
                  />
                </div>
              </div>
            </div>
            <div className='mb-3'>
              <label className='small mb-1' htmlFor='time_show'>
                Showtime
              </label>
              <div className='card'>
                <div className='card-body'>
                  {movieData.time_show.map((item, index) => (
                    <button
                      className='btn btn-info m-2'
                      key={index}
                      type='button'
                      onClick={() => removeShowTime(index)}
                    >
                      {new Date(item).toLocaleString()}
                    </button>
                  ))}
                  <button
                    type='button'
                    className='btn btn-info m-2'
                    onClick={handleShowModal}
                  >
                    Add new Showtime
                  </button>
                </div>
              </div>
            </div>

            <div className='mb-3'>
              <label className='small mb-1' htmlFor='chair_type'>
                Chair Type
              </label>
              <div className='card'>
                <div className='card-body'>
                  {movieData.chair_type.map((chair, index) => (
                    <div className='row gx-3' key={index}>
                      <div className='col-md-6'>
                        <div className='mb-3'>
                          <label className='small mb-1'>Chair Type</label>
                          <input
                            className='form-control'
                            type='text'
                            value={chair.type}
                            readOnly
                          />
                        </div>
                      </div>
                      <div className='col-md-6'>
                        <div className='mb-3'>
                          <label className='small mb-1'>Price</label>
                          <input
                            className='form-control'
                            type='text'
                            value={chair.price}
                            onChange={(e) => {
                              const newChairType = [...movieData.chair_type];
                              newChairType[index].price = e.target.value;
                              setMovieData({ ...movieData, chair_type: newChairType });
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className='row gx-3'>
              <div className='col-md-6'>
                <div className='mb-3'>
                  <label className='small mb-1' htmlFor='language'>
                    Language
                  </label>
                  <select
                    id='language'
                    className='custom-select'
                    value={movieData.language}
                    onChange={(e) =>
                      setMovieData({ ...movieData, language: e.target.value })
                    }
                  >
                    <option defaultValue>Select language</option>
                    <option value='VietNam'>VietNam</option>
                    <option value='China'>China</option>
                    <option value='English'>English</option>
                  </select>
                </div>
              </div>
              <div className='col-md-6'>
                <div className='mb-3'>
                  <label className='small mb-1' htmlFor='national'>
                    National
                  </label>
                  <select
                    id='national'
                    className='custom-select'
                    value={movieData.national}
                    onChange={(e) =>
                      setMovieData({ ...movieData, national: e.target.value })
                    }
                  >
                    <option defaultValue>Select national</option>
                    <option value='VietNam'>VietNam</option>
                    <option value='China'>China</option>
                    <option value='English'>English</option>
                  </select>
                </div>
              </div>
            </div>
            <div className='row gx-3'>
              <div className='col-md-6'>
                <div className='mb-3'>
                  <label className='small mb-1' htmlFor='director'>
                    Director
                  </label>
                  <input
                    id='director'
                    className='form-control'
                    type='text'
                    placeholder='Enter director name'
                    value={movieData.director}
                    onChange={(e) =>
                      setMovieData({ ...movieData, director: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className='col-md-6'>
                <div className='mb-3'>
                  <label className='small mb-1' htmlFor='actors'>
                    Actors
                  </label>
                  <input
                    id='actors'
                    className='form-control'
                    type='text'
                    placeholder='Enter actor names'
                    value={movieData.actors}
                    onChange={(e) =>
                      setMovieData({ ...movieData, actors: e.target.value })
                    }
                  />
                </div>
              </div>
            </div>
            <div className='mb-3'>
              <label className='small mb-1' htmlFor='description'>
                Description
              </label>
              <textarea
                id='description'
                className='form-control'
                placeholder='Enter description'
                value={movieData.description}
                onChange={(e) =>
                  setMovieData({ ...movieData, description: e.target.value })
                }
              />
            </div>
            <button
              className='btn btn-info btn-block'
              type='button'
              onClick={handleSubmit}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default AddNewMovie;
