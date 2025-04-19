import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebaseConfig';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const UserInfo = ({ totalTestTaken }) => {
  const [user] = useAuthState(auth);
  console.log("user in userinfo", user);

  return (
    <div className="user-profile" style={{ backgroundColor: '#fefefe', color: '#222' }}>
      <div className="user">
        <div className="picture">
          <AccountCircleIcon
            style={{
              display: 'block',
              transform: 'scale(6)',
              margin: 'auto',
              marginTop: '3.5rem',
              color: '#555',
            }}
          />
        </div>
        <div className="info">
          <div className="email" style={{ fontSize: '1.5rem', fontWeight: 'bold', textAlign: 'center' }}>
            {user?.email}
          </div>
          <div
            className="joined-at"
            style={{
              fontSize: '1.5rem',
              color: '#666',
              marginTop: '0.3rem',
              textAlign: 'center',
            }}
          >
            {user?.metadata?.creationTime}
          </div>
        </div>
      </div>
      <div className="total-tests" style={{ textAlign: 'center', marginTop: '2rem', fontWeight: '500' }}>
        <span>Total Test Taken - {totalTestTaken}</span>
      </div>
    </div>
  );
};

export default UserInfo;
