import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Banner from '@/components/Banner';
import axios from 'axios';

const seat = Array(15).fill(0);
const currentDate = new Date();
const year = currentDate.getFullYear();
const month = String(currentDate.getMonth() + 1).padStart(2, '0');
const day = String(currentDate.getDate()).padStart(2, '0');
const formattedDate = `${year}-${month}-${day}`;

function MovieBooking() {
  const { id } = useParams();
  const navigator = useNavigate();
  const [movieData, setMovieData] = useState({});
  // eslint-disable-next-line
  const [seatSelected, setSeatSelected] = useState([]);

  const [ticketData, setTicketData] = useState({
    movie_id: id,
    date: formattedDate,
    seat: [],
    time: '',
    price: 0,
  });

  const handleCheckout = () => {
    let userDetail = localStorage.getItem('user');
    if (!userDetail) {
      alert('Bạn cần đăng nhập để tiếp tục');
      navigator('/login');
      return;
    }
    const responseDecode = JSON.parse(userDetail);
    if (responseDecode?.isActive === false) {
      alert('Tài khoản của bạn đang bị cấm liên hệ với admin để giải quyết');
      return;
    }
    if (!ticketData?.seat.length || !ticketData?.time) {
      alert('Bạn cần chọn thời gian chiếu phim và vị trí xem phim để tiếp tục');
      return;
    }
    let ticketDetail = localStorage.getItem('ticket');
    let formData = {
      ...ticketData,
      movie_title: movieData?.title,
      movie_original_title: movieData?.original_title,
    };
    if (ticketDetail) {
      let ticketDetailDecode = JSON.parse(ticketDetail);
      if (ticketDetailDecode) {
        ticketDetailDecode = [...ticketDetailDecode, formData];
        localStorage.setItem('ticket', JSON.stringify(ticketDetailDecode));
      }
    } else {
      let ticketDetailDecode = [formData];
      localStorage.setItem('ticket', JSON.stringify(ticketDetailDecode));
    }
    navigator('/cart');
  };

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:9999/movies/${id}`)
        .then((response) => {
          const movie = response.data;
          const normalizedTimeShow = movie.time_show.map(item => {
            const [date, time] = item.split('T');
            const [year, month, day] = date.split('-');
            return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}T${time}`;
          });
          setMovieData({ ...movie, time_show: normalizedTimeShow });
        })
        .catch((error) => {
          alert('Error fetching movie data', error);
          console.log(error);
        });
    }
  }, [id]);

  useEffect(() => {
    if (ticketData.time && ticketData.date) {
      axios
        .get(`http://localhost:9999/bills`)
        .then((response) => {
          const responseData = response.data;
          let seat = responseData
            ?.flatMap((data) =>
              data?.cart?.filter(
                (item) =>
                  item?.date === ticketData?.date &&
                  item?.time === ticketData?.time,
              ),
            )
            .flatMap((item) => item?.seat || []);
          setSeatSelected(seat);
        })
        .catch((error) => {
          alert('Error submitting data', error);
          console.log(error);
        });
    }
  }, [ticketData.time, ticketData.date]);

  const seatRowHTML = (row) => {
    return seat.map((item, index) => (
      <div
        key={index}
        className={
          seatSelected.includes(row + (index + 1))
            ? 'btn btn-secondary mr-3 mb-1'
            : ticketData?.seat.includes(row + (index + 1))
            ? 'btn btn-warning mr-3 mb-1'
            : (row === 'C' || row === 'D') && index > 3 && index < 11
            ? 'btn btn-danger mr-3 mb-1'
            : 'btn btn-info mr-3 mb-1'
        }
        style={
          seatSelected.includes(row + (index + 1))
            ? { cursor: 'not-allowed' }
            : {}
        }
        onClick={() => {
          const seatOrder = row + (index + 1);
          if (seatSelected.includes(seatOrder)) {
            return;
          }
          const newSeat = [...ticketData?.seat];
          let ticketPrice = ticketData?.price;
          ticketData?.seat.includes(seatOrder)
            ? newSeat.splice(ticketData?.seat.indexOf(seatOrder), 1)
            : newSeat.push(seatOrder);
          let chairType = 'Standard';
          if ((row === 'C' || row === 'D') && index > 3 && index < 11) {
            chairType = 'Vip';
          }
          let price = movieData?.chair_type?.find(
            (chair) => chair?.type === chairType,
          )?.price;
          if (price) {
            price = parseFloat(price);
            if (ticketData?.seat.includes(seatOrder)) {
              ticketPrice -= price;
            } else {
              ticketPrice += price;
            }
          }
          setTicketData({ ...ticketData, seat: newSeat, price: ticketPrice });
        }}
      >
        {index + 1}
      </div>
    ));
  };

  const seatHTML = (
    <div className='mt-5'>
      <div className='d-flex align-items-center mb-2'>
        {seatRowHTML('A')}
        <p className='mb-0 font-weight-bold' style={{ fontSize: '20px' }}>
          A
        </p>
      </div>
      <div className='d-flex align-items-center mb-2'>
        {seatRowHTML('B')}
        <p className='mb-0 font-weight-bold' style={{ fontSize: '20px' }}>
          B
        </p>
      </div>
      <div className='d-flex align-items-center mb-2'>
        {seatRowHTML('C')}
        <p className='mb-0 font-weight-bold' style={{ fontSize: '20px' }}>
          C
        </p>
      </div>
      <div className='d-flex align-items-center mb-2'>
        {seatRowHTML('D')}
        <p className='mb-0 font-weight-bold' style={{ fontSize: '20px' }}>
          D
        </p>
      </div>
      <div className='d-flex align-items-center mb-2'>
        {seatRowHTML('E')}
        <p className='mb-0 font-weight-bold' style={{ fontSize: '20px' }}>
          E
        </p>
      </div>
      <div className='d-flex align-items-center mb-2'>
        {seatRowHTML('F')}
        <p className='mb-0 font-weight-bold' style={{ fontSize: '20px' }}>
          F
        </p>
      </div>
    </div>
  );

  const checkSchedule = movieData?.time_show?.filter((item, index) =>
    item.includes(ticketData?.date),
  
  );

  const timeHTML = checkSchedule?.map((item, index) => {
    const title = item.split('T')[1];
    return (
      <div
        className={
          ticketData?.time === title
            ? 'btn btn-info mr-2 mt-2 mb-2'
            : 'btn btn-outline-info mr-2 mt-2 mb-2'
        }
        key={index}
        onClick={() => {
          setTicketData({ ...ticketData, time: title });
        }}
      >
        {title}
      </div>
    );
  });

  return (
    <>
      <Banner title={'GV Plaza'} />
      <div
        className='d-flex justify-content-center mb-4'
        style={{ width: '94%', margin: '3% auto 0' }}
      >
        <div
          className='card flex-md-row mb-4 box-shadow h-md-250'
          style={{ minWidth: '1380px' }}
        >
          <img
            className='card-img-top'
            src= {movieData.img}
            alt='banner movie'
            style={{ width: '320px', height: '555px' }}
          />
          <div className='card-body d-flex flex-column align-items-start ml-3 mr-3'>
            <h3 className='mb-0'>
              <p className='text-dark'>GV Plaza</p>
            </h3>
            <div className='d-flex align-items-center mb-2'>
              <div
                className='text-muted mb-0 mr-2'
                style={{ whiteSpace: 'nowrap' }}
              >
                {ticketData?.date ? 'Change Date: ' : 'Choose Date: '}
              </div>
              <input
                type='date'
                className='form-control'
                placeholder='Choose Date'
                min={formattedDate}
                onChange={(e) => {
                  setTicketData({ ...ticketData, date: e.target.value });
                }}
                value={ticketData?.date}
                width={'30%'}
              />
            </div>
            {checkSchedule?.length ? (
              <>
                <div className='d-flex align-items-center mb-2'>{timeHTML}</div>
                {seatHTML}
              </>
            ) : (
              <h3 className='mt-5'>Không có lịch chiếu hôm nay</h3>
            )}
          </div>

          {checkSchedule?.length ? (
            <div className='card-body d-flex flex-column align-items-start mt-5 justify-content-end'>
              {movieData?.chair_type?.map((item, index) => (
                <div className='d-flex align-items-center mb-2' key={index}>
                  <div
                    className={
                      item?.type === 'Vip'
                        ? 'btn btn-danger mr-2'
                        : 'btn btn-info mr-2'
                    }
                  ></div>
                  <p
                    className='mb-0 font-weight-bold'
                    style={{ fontSize: '16px' }}
                  >
                    {item?.type + ' ' + item?.price}$
                  </p>
                </div>
              ))}
              <div className='d-flex align-items-center mb-2'>
                <div className='btn btn-secondary mr-2'></div>
                <p
                  className='mb-0 font-weight-bold'
                  style={{ fontSize: '16px' }}
                >
                  Booked
                </p>
              </div>
              <div className='d-flex align-items-center mb-4'>
                <div className='btn btn-warning mr-2'></div>
                <p
                  className='mb-0 font-weight-bold'
                  style={{ fontSize: '16px' }}
                >
                  Selecting
                </p>
              </div>
              <button
                type='button'
                className={
                  ticketData?.price
                    ? 'btn btn-danger font-weight-bold'
                    : 'btn btn-outline-danger font-weight-bold'
                }
                style={{ padding: '15px 50px' }}
                onClick={handleCheckout}
              >
                Thanh toán {ticketData?.price ? `$${ticketData.price}` : null}
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
}

export default MovieBooking;
