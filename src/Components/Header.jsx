import React from 'react'
import AccountIcon from './AccountIcon'
import CompareButton from './CompareButton'

const Header = () => {
  return (
    <div
      className="header"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '10px 20px',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <a href="/" style={{ display: 'flex', alignItems: 'center' }}>
          <img
            src="/favi.png"
            alt="Logo"
            style={{
              height: '50px',
              width: '200px',
              borderRadius: '10%',
              objectFit: 'cover',
              marginRight: '10px',
              cursor: 'pointer',
            }}
          />
        </a>
        <CompareButton />
      </div>

      <div>
        <AccountIcon />
      </div>
    </div>
  )
}

export default Header
