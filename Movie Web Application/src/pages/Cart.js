import bgFooter from '@/assets/image/bgFooter.png';
import { useEffect, useState } from 'react';
import { AiFillDelete } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

function CartPage() {
  const navigator = useNavigate();

  const [cartData, setCartData] = useState([]);

  const handleCheckout = () => {
    navigator('/checkout');
  };

  const handleDeleteItem = (index) => {
    let newCartData = [...cartData];
    newCartData.splice(index, 1);
    const response = localStorage.getItem('ticket');
    if (response) {
      localStorage.setItem('ticket', JSON.stringify(newCartData));
      setCartData(newCartData);
    }
  };

  useEffect(() => {
    const response = localStorage.getItem('ticket');
    if (response) {
      let responseDecode = JSON.parse(response);
      responseDecode = responseDecode?.filter((item) => {
        const ticketDateString = `${item?.date}T${item?.time}`;
        const ticketDate = new Date(ticketDateString);
        const currentDateTime = new Date();
        return ticketDate >= currentDateTime;
      });
      setCartData(responseDecode);
    }
  }, []);

  const rowHTML = cartData?.map((item, index) => (
    <tr className='border-bottom' key={index}>
      <td>
        <div className='fw-bold'>{item?.movie_title}</div>
        <div className='small text-muted d-none d-md-block'>
          {item?.movie_original_title}
        </div>
      </td>
      <td className='text-end fw-bold'>{item?.seat.join(', ')}</td>
      <td className='text-end fw-bold'>{item?.seat?.length}</td>
      <td className='text-end fw-bold d-flex align-items-center justify-content-end'>
        ${item?.price}
        <div
          className='d-flex align-items-center'
          style={{
            marginLeft: '10px',
            fontSize: '20px',
            cursor: 'pointer',
          }}
        >
          <AiFillDelete onClick={() => handleDeleteItem(index)} />
        </div>
      </td>
    </tr>
  ));

  const totalPrice = cartData?.reduce((total, order) => total + order.price, 0);

  return (
    <>
      <div className='card invoice'>
        <div
          className='card-header p-4 p-md-5 border-bottom-0 bg-gradient-primary-to-secondary text-white-50'
          style={{ background: `url(${bgFooter})` }}
        >
          <div className='row justify-content-between align-items-center'>
            <div className='col-12 col-lg-auto mb-5 mb-lg-0 text-center text-lg-start'>
              <div className='h2 text-white mb-0'>Cart Page</div>
            </div>
          </div>
        </div>
        <div className='card-body p-4 p-md-5'>
          {cartData?.length ? (
            <table className='table table-borderless mb-0'>
              <thead className='border-bottom'>
                <tr className='small text-uppercase text-muted'>
                  <th scope='col'>Product</th>
                  <th className='text-end' scope='col'>
                    Seat
                  </th>
                  <th className='text-end' scope='col'>
                    Quantity
                  </th>
                  <th className='text-end' scope='col'>
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody>
                {rowHTML}
                <tr>
                  <td className='text-end pb-0' colSpan='3'>
                    <div
                      className='text-uppercase small fw-700 text-muted'
                      style={{ textAlign: 'end' }}
                    >
                      Subtotal:
                    </div>
                  </td>
                  <td className='text-end pb-0'>
                    <div className='h5 mb-0 fw-700'>${totalPrice}</div>
                  </td>
                </tr>
                <tr>
                  <td className='text-end pb-0' colSpan='3'>
                    <div
                      className='text-uppercase small fw-700 text-muted'
                      style={{ textAlign: 'end' }}
                    >
                      Total Amount Due:
                    </div>
                  </td>
                  <td className='text-end pb-0'>
                    <div className='h5 mb-0 fw-700 text-green'>
                      ${totalPrice}
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          ) : (
            <h2>Không có mặt hàng nào trong giỏ hàng</h2>
          )}
        </div>

        {cartData?.length ? (
          <div className='card-footer p-4 p-lg-5 border-top-0 d-flex justify-content-end'>
            <button
              className='btn btn-info btn-lg'
              style={{ marginRight: '8%' }}
              onClick={handleCheckout}
            >
              Checkout
            </button>
          </div>
        ) : null}
      </div>
    </>
  );
}

export default CartPage;
