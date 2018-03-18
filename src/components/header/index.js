import React from 'react';
import './style.css';
import { NavLink } from 'react-router-dom';
import { clearState } from '../../utils/local-storage';

const links=[
  {
    display : 'Home',
    url : '/'
  }, 
  {
    display : 'Image Gallery',
    url : '/upload-images'
  }
]

const Header = () => {
  return (
    <header className="header">
      {
        links.map((link,index) => 
          <div key={index}>
            <NavLink
              activeStyle={{
                color: '#F3E5F5',
                borderBottom: '1px solid #F3E5F5',
              }}
              exact
              to={link.url}
            >
              {link.display}
            </NavLink>
          </div>
        )
      }
      <div className="button" onClick={clearState}> Clear Local Storage </div>
    </header>
  )
}

export default Header;