import { useEffect, useState } from 'react';
import '@/assets/css/UserTable.scss';
import Banner from '@/components/Banner';
import axios from 'axios';

function UserPage() {
  const [userData, setUserData] = useState([]);
  const handleChangeTypeActiveUser = (user, index) => {
    axios
      .put(`http://localhost:9999/users/${user?.id}`, {
        ...user,
        isActive: !user?.isActive,
      })
      .then((response) => {
        alert('Chỉnh sửa thành công');
        let newUserData = [...userData];
        newUserData[index] = response?.data;
        setUserData(newUserData)
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    axios
      .get(`http://localhost:9999/users`)
      .then((response) => {
        setUserData(response.data);
      })
      .catch((error) => {
        alert('Error submitting data', error);
        console.log(error);
      });
  }, []);

  return (
    <>
      <Banner title={'User account'} />
      <div
        className='datatable-container'
        style={{ width: '90%', margin: '2% auto' }}
      >
        <table id='datatablesSimple' className='datatable-table'>
          <thead>
            <tr>
              <th data-sortable='true' style={{ width: '18.14%' }}>
                <p className='datatable-sorter'>Full Name</p>
              </th>
              <th data-sortable='true' style={{ width: '18.14%' }}>
                <p className='datatable-sorter'>User Name</p>
              </th>
              <th data-sortable='true' style={{ width: '20.54%' }}>
                <p className='datatable-sorter'>Email</p>
              </th>
              <th data-sortable='true' style={{ width: '11.72%' }}>
                <p className='datatable-sorter'>Phone</p>
              </th>
              <th data-sortable='true' style={{ width: '11.72%' }}>
                <p className='datatable-sorter'>Status</p>
              </th>
              <th data-sortable='true' style={{ width: '9.32%' }}>
                <p className='datatable-sorter'>Actions</p>
              </th>
            </tr>
          </thead>
          <tbody>
            {userData.map((user, index) => (
              <tr key={user.id}>
                <td>
                  <div className='d-flex align-items-center'>
                    <div className='avatar me-2'>
                      <img
                        className='avatar-img img-fluid'
                        src={`https://sb-admin-pro.startbootstrap.com/assets/img/illustrations/profiles/profile-2.png`}
                        alt={user.name}
                      />
                    </div>
                    {user.firstName + ' ' + user.lastName}
                  </div>
                </td>
                <td>{user.userName}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>
                  {user.isActive ? (
                    <span class='badge badge-success'>Active</span>
                  ) : (
                    <span class='badge badge-danger'>Banned</span>
                  )}
                </td>
                <td>
                  <div class='custom-control custom-switch'>
                    <input
                      type='checkbox'
                      class='custom-control-input'
                      id='customSwitch1'
                      checked={user?.isActive}
                      onChange={() => handleChangeTypeActiveUser(user, index)}
                    />
                    <label
                      class='custom-control-label'
                      for='customSwitch1'
                    ></label>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default UserPage;
