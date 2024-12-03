import Banner from '@/components/Banner';
import '@/assets/css/Timeline.scss';
import { FaCrown, FaFireAlt, FaRegSun } from 'react-icons/fa';
import AreaChart from '../../components/Banner/Chart/AreaChart';
import { useEffect, useState } from 'react';
import axios from 'axios';

const labels = ['Mons', 'Tues', 'Weds', 'Thurs', 'Fri', 'Sat', 'Sun'];

function DashboardPage() {
  const [revenue, setRevenue] = useState([]);
  const [dataChart, setDataChart] = useState({
    labels,
    datasets: [
      {
        fill: true,
        label: 'Revenue',
        data: Array.from({ length: 7 }, () => 0),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  });
  const [topMovie, setTopMovie] = useState([]);
  const [totalToday, setTotalToday] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:9999/bills`)
      .then((response) => {
        setRevenue(response.data);
      })
      .catch((error) => {
        alert('Error submitting data', error);
        console.log(error);
      });
  }, []);

  useEffect(() => {
    const totalPriceByDayOfWeek = {};
    revenue.forEach((order) => {
      const date = new Date(order?.date_checkout);
      const dayOfWeek = date.getDay();

      if (!totalPriceByDayOfWeek[dayOfWeek]) {
        totalPriceByDayOfWeek[dayOfWeek] = 0;
      }

      order.cart.forEach((item) => {
        totalPriceByDayOfWeek[dayOfWeek] += item.price;
      });
    });
    let newDataChart = Array.from({ length: 7 }, () => 0);
    for (let key in totalPriceByDayOfWeek) {
      if (totalPriceByDayOfWeek.hasOwnProperty(key)) {
        newDataChart[key] = totalPriceByDayOfWeek[key];
      }
    }
    setDataChart({
      labels,
      datasets: [
        {
          fill: true,
          label: 'Ticket Sold',
          data: newDataChart,
          borderColor: 'rgb(53, 162, 235)',
          backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
      ],
    });
  }, [revenue]);

  useEffect(() => {
    const movieSeatCounts = [];

    revenue?.forEach((item) => {
      item.cart.forEach((cartItem) => {
        const movieId = cartItem.movie_id;
        const movieTitle = cartItem.movie_title;
        const seatCount = cartItem.seat.length;
        const existingMovie = movieSeatCounts.find(
          (movie) => movie.movie_id === movieId,
        );

        if (existingMovie) {
          existingMovie.seatCount += seatCount;
        } else {
          movieSeatCounts.push({
            movie_id: movieId,
            movie_title: movieTitle,
            seatCount,
          });
        }
      });
    });
    movieSeatCounts.sort((a, b) => b.seatCount - a.seatCount);
    const top3Movies = movieSeatCounts.slice(0, 3);
    for (let i = 0; i < top3Movies.length; i++) {
      axios
        .get(`http://localhost:9999/movies/${top3Movies[i]?.movie_id}`)
        .then((response) => {
          top3Movies[i].description = response.data.description;
        })
        .catch((error) => {
          alert('Error submitting data', error);
          console.log(error);
        });
    }
    setTopMovie(top3Movies);
  }, [revenue]);

  useEffect(() => {
    let totalData = Array.from({ length: 3 }, () => 0);
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;

    const totalSeatsToday = revenue.reduce((total, item) => {
      return (
        total +
        item.cart.reduce((cartTotal, cartItem) => {
          if (cartItem.date === formattedDate) {
            return cartTotal + cartItem.seat.length;
          }
          return cartTotal;
        }, 0)
      );
    }, 0);

    const itemCountToday = revenue.reduce((count, item) => {
      if (item.date_checkout === formattedDate) {
        return count + 1;
      }
      return count;
    }, 0);

    const totalPriceToday = revenue
      .filter((item) => item.date_checkout === formattedDate) // Filter items with today's date
      .reduce(
        (total, item) =>
          total + item.cart.reduce((sum, movie) => sum + movie.price, 0),
        0,
      );
    totalData = [itemCountToday, totalSeatsToday, totalPriceToday];
    setTotalToday(totalData);
  }, [revenue]);

  return (
    <>
      <Banner title={''} />
      <div
        className='dashboard-body'
        style={{ width: '70%', margin: '0 auto', marginTop: '-6rem' }}
      >
        <div className='head'>
          <div
            className='card'
            style={{
              borderRadius: '0.35rem',
            }}
          >
            <h4 style={{ padding: '20px 20px 0' }}>Today's Sales</h4>
            <div
              className='card-body row d-flex justify-content-evenly'
              style={{
                padding: '2% 2% 1%',
              }}
            >
              <div className='col-lg-6 col-xl-3 mb-4'>
                <div className='card bg-primary text-white h-100'>
                  <div className='card-body'>
                    <div className='d-flex justify-content-between align-items-center'>
                      <div className='me-3'>
                        <div className='text-white-75 small'>Total Order</div>
                        <div className='text-lg fw-bold'>{totalToday[0]}</div>
                      </div>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='24'
                        height='24'
                        viewBox='0 0 24 24'
                        fill='none'
                        stroke='currentColor'
                        stroke-width='2'
                        stroke-linecap='round'
                        stroke-linejoin='round'
                        className='feather feather-calendar feather-xl text-white-50'
                      >
                        <rect
                          x='3'
                          y='4'
                          width='18'
                          height='18'
                          rx='2'
                          ry='2'
                        ></rect>
                        <line x1='16' y1='2' x2='16' y2='6'></line>
                        <line x1='8' y1='2' x2='8' y2='6'></line>
                        <line x1='3' y1='10' x2='21' y2='10'></line>
                      </svg>
                    </div>
                  </div>
                  <div className='card-footer d-flex align-items-center justify-content-between small'>
                    <a className='text-white stretched-link' href='#!'>
                      View Report
                    </a>
                    <div className='text-white'>
                      <i className='fas fa-angle-right'></i>
                    </div>
                  </div>
                </div>
              </div>
              <div className='col-lg-6 col-xl-3 mb-4'>
                <div className='card bg-warning text-white h-100'>
                  <div className='card-body'>
                    <div className='d-flex justify-content-between align-items-center'>
                      <div className='me-3'>
                        <div className='text-white-75 small'>
                          Ticket Movie Sold
                        </div>
                        <div className='text-lg fw-bold'>{totalToday[1]}</div>
                      </div>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='24'
                        height='24'
                        viewBox='0 0 24 24'
                        fill='none'
                        stroke='currentColor'
                        stroke-width='2'
                        stroke-linecap='round'
                        stroke-linejoin='round'
                        className='feather feather-dollar-sign feather-xl text-white-50'
                      >
                        <line x1='12' y1='1' x2='12' y2='23'></line>
                        <path d='M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6'></path>
                      </svg>
                    </div>
                  </div>
                  <div className='card-footer d-flex align-items-center justify-content-between small'>
                    <a className='text-white stretched-link' href='#!'>
                      View Report
                    </a>
                    <div className='text-white'>
                      <i className='fas fa-angle-right'></i>
                    </div>
                  </div>
                </div>
              </div>
              <div className='col-lg-6 col-xl-3 mb-4'>
                <div className='card bg-success text-white h-100'>
                  <div className='card-body'>
                    <div className='d-flex justify-content-between align-items-center'>
                      <div className='me-3'>
                        <div className='text-white-75 small'>Total Earning</div>
                        <div className='text-lg fw-bold'>${totalToday[2]}</div>
                      </div>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='24'
                        height='24'
                        viewBox='0 0 24 24'
                        fill='none'
                        stroke='currentColor'
                        stroke-width='2'
                        stroke-linecap='round'
                        stroke-linejoin='round'
                        className='feather feather-check-square feather-xl text-white-50'
                      >
                        <polyline points='9 11 12 14 22 4'></polyline>
                        <path d='M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11'></path>
                      </svg>
                    </div>
                  </div>
                  <div className='card-footer d-flex align-items-center justify-content-between small'>
                    <a className='text-white stretched-link' href='#!'>
                      View Tasks
                    </a>
                    <div className='text-white'>
                      <i className='fas fa-angle-right'></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='body d-flex justify-content-between'>
          <div class='container mt-5 mb-5'>
            <div class='card'>
              <div class='card-body'>
                <h4>Top Movie</h4>
                <ul class='timeline'>
                  <li>
                    <p
                      className='d-flex align-items-center'
                      style={{ fontWeight: 'bold' }}
                    >
                      <FaCrown
                        style={{
                          marginRight: '6px',
                          fontWeight: 'bold',
                          color: '#dc3545',
                        }}
                      />
                      Top 1: {topMovie[0]?.movie_title}
                    </p>
                    <p>Lượt vé đã bán: {topMovie[0]?.seatCount}</p>
                  </li>
                  <li>
                    <p
                      className='d-flex align-items-center'
                      style={{ fontWeight: 'bold' }}
                    >
                      <FaFireAlt
                        style={{
                          marginRight: '6px',
                          fontWeight: 'bold',
                          color: '#ffc107',
                        }}
                      />
                      Top 2: {topMovie[1]?.movie_title}
                    </p>
                    <p>Lượt vé đã bán: {topMovie[1]?.seatCount}</p>
                  </li>
                  <li>
                    <p
                      className='d-flex align-items-center'
                      style={{ fontWeight: 'bold' }}
                    >
                      <FaRegSun
                        style={{
                          marginRight: '6px',
                          fontWeight: 'bold',
                          color: '#28a745',
                        }}
                      />
                      Top 3: {topMovie[2]?.movie_title}
                    </p>
                    <p>Lượt vé đã bán: {topMovie[2]?.seatCount}</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class='container mt-5 mb-5' style={{ minHeight: '412px' }}>
            <div class='card'>
              <div class='card-body'>
                <h4>Total Revenues in 7 days</h4>
                <div style={{ height: '40px' }}></div>
                <AreaChart dataChart={dataChart} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DashboardPage;
