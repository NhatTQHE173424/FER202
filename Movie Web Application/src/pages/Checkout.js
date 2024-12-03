import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Banner from '@/components/Banner';

const currentDate = new Date();
const year = currentDate.getFullYear();
const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are 0-based, so add 1
const day = String(currentDate.getDate()).padStart(2, '0');
const formattedDate = `${year}-${month}-${day}`;

function CheckoutPage() {
  const navigator = useNavigate();

  const [formData, setFormData] = useState({
    user_id: '',
    full_name: '',
    phone: '',
    email: '',
    address: '',
    date_checkout: formattedDate,
    cart: [],
  });

  const handleCheckout = () => {
    axios
      .post('http://localhost:9999/bills', formData)
      .then((response) => {
        alert('Đặt vé thành công');
        localStorage.removeItem('ticket');
        navigator('/history');
      })
      .catch((error) => {
        alert('Error submitting data', error);
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    const cartResponse = localStorage.getItem('ticket');
    const userResponse = localStorage.getItem('user');
    let finalData = {};
    if (cartResponse) {
      let responseDecode = JSON.parse(cartResponse);
      responseDecode = responseDecode?.filter((item) => {
        const ticketDateString = `${item?.date}T${item?.time}`;
        const ticketDate = new Date(ticketDateString);
        const currentDateTime = new Date();
        return ticketDate >= currentDateTime;
      });
      finalData = { ...finalData, cart: responseDecode };
    }
    if (userResponse) {
      let responseDecode = JSON.parse(userResponse);
      finalData = {
        ...finalData,
        full_name: responseDecode?.firstName + ' ' + responseDecode?.lastName,
        phone: responseDecode?.phone,
        email: responseDecode?.email,
        address: responseDecode?.townCity,
        user_id: responseDecode?.id,
        date_checkout: formattedDate,
      };
    }
    setFormData(finalData);
  }, []);

  console.log(formData);

  const totalPrice = formData?.cart?.reduce(
    (total, order) => total + order.price,
    0,
  );

  const rowHTML = formData?.cart?.map((item, index) => (
    <tr className='border-bottom' key={index}>
      <td className='d-flex align-items-center'>
        <div
          className='fw-bold'
          style={{
            fontWeight: '500',
            color: 'red',
            marginRight: '5px',
          }}
        >
          {item?.movie_title}
        </div>
      </td>
      <td className='text-end fw-bold'>${item?.price}</td>
    </tr>
  ));

  return (
    <>
      <Banner title={'Checkout Page'} />
      <div className='row' style={{ width: '70%', margin: '3% auto' }}>
        <div className='col-xl-7'>
          <div className='card mb-4'>
            <div className='card-header'>Billing Details</div>
            <div className='card-body'>
              <form>
                <div className='mb-3'>
                  <label className='small mb-1' htmlFor='fullName'>
                    Full Name
                  </label>
                  <input
                    className='form-control'
                    id='fullName'
                    name='fullName'
                    type='text'
                    placeholder='Enter your full name'
                    value={formData.full_name}
                    onChange={handleInputChange}
                  />
                </div>
                <div className='row gx-3 mb-3'>
                  <div className='col-md-6'>
                    <label className='small mb-1' htmlFor='phone'>
                      Phone number
                    </label>
                    <input
                      className='form-control'
                      id='phone'
                      name='phone'
                      type='tel'
                      placeholder='Enter your phone number'
                      value={formData.phone}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className='col-md-6'>
                    <label className='small mb-1' htmlFor='email'>
                      Email address
                    </label>
                    <input
                      className='form-control'
                      id='email'
                      name='email'
                      type='email'
                      placeholder='Enter your email'
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className='mb-3'>
                  <label className='small mb-1' htmlFor='address'>
                    Address
                  </label>
                  <textarea
                    className='form-control'
                    id='address'
                    name='address'
                    type='text'
                    placeholder='Enter your address'
                    value={formData.address}
                    onChange={handleInputChange}
                  />
                </div>

                <button
                  className='btn btn-info'
                  type='button'
                  onClick={handleCheckout}
                >
                  Place Order
                </button>
              </form>
            </div>
          </div>
        </div>
        <div className='col-xl-5'>
          <div className='card mb-4 mb-xl-0'>
            <div className='card-header'>Your Order</div>
            <div className='card-body'>
              <table className='table table-borderless mb-0'>
                <thead className='border-bottom'>
                  <tr className='small text-uppercase text-muted'>
                    <th scope='col'>Product</th>
                    <th className='text-end' scope='col'>
                      Amount
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {rowHTML}
                  <tr>
                    <td>
                      <div className='fw-bold'>TOTAL</div>
                    </td>
                    <td className='text-end font-weight-bold'>${totalPrice}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CheckoutPage;
