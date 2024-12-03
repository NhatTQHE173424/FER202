import Banner from '@/components/Banner';
import '@/assets/css/UserTable.scss';
import { useEffect, useState } from 'react';
import axios from 'axios';

function HistoryPage() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const response = localStorage.getItem('user');
    if (response) {
      const responseDecode = JSON.parse(response);
      if (responseDecode) {
        axios
          .get(`http://localhost:9999/bills?user_id=${responseDecode?.id}`)
          .then((response) => {
            setHistory(response.data);
          })
          .catch((error) => {
            alert('Error submitting data', error);
          });
      }
    }
  }, []);

  const rowHTML = history?.map((item, index) => {
    return item?.cart.map((cart, pos) => (
      <tr key={`${index}-${[pos]}`}>
        <td>#{`${item?.id}${index}${[pos]}`}</td>
        <td>{cart?.movie_title}</td>
        <td>{item?.date_checkout}</td>
        <td>{cart?.price}$</td>
        <td>
          <div className='badge bg-success' style={{ color: '#fff' }}>
            Success
          </div>
        </td>
      </tr>
    ));
  });

  return (
    <>
      <Banner title={'History Order'} />
      <div className=' mt-5' style={{ width: '80%', margin: '0 auto' }}>
        <table
          id='datatablesSimple'
          className='datatable-table'
          style={{ borderCollapse: 'collapse' }}
        >
          <thead>
            <tr>
              <th data-sortable='true' style={{ width: '14.630123927550047%' }}>
                <p className='datatable-sorter'>Orrder ID</p>
              </th>
              <th data-sortable='true' style={{ width: '64.06101048617731%' }}>
                <p className='datatable-sorter'>Movie</p>
              </th>
              <th data-sortable='true' style={{ width: '11.630123927550047%' }}>
                <p className='datatable-sorter'>Date</p>
              </th>
              <th data-sortable='true' style={{ width: '11.630123927550047%' }}>
                <p className='datatable-sorter'>Amount</p>
              </th>
              <th data-sortable='true' style={{ width: '14.108674928503337%' }}>
                <p className='datatable-sorter'>Status</p>
              </th>
            </tr>
          </thead>
          <tbody>{rowHTML}</tbody>
        </table>
      </div>
      {/* <div
        className='d-flex'
        style={{
          justifyContent: 'space-between',
          width: '80%',
          margin: '1% auto',
        }}
      >
        <div>Showing 1 to 10 of 20 entries</div>
        <nav aria-label='...'>
          <ul class='pagination'>
            <li class='page-item disabled'>
              <p class='page-link' tabindex='-1'>
                &laquo;
              </p>
            </li>
            <li class='page-item active'>
              <p class='page-link'>1</p>
            </li>
            <li class='page-item'>
              <p class='page-link'>2</p>
            </li>
            <li class='page-item'>
              <p class='page-link'>&raquo;</p>
            </li>
          </ul>
        </nav>
      </div> */}
    </>
  );
}

export default HistoryPage;
