import React from 'react';
import './style.css';
import { NavLink } from 'react-router-dom';

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

const Header = ({match}) => {
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
    </header>
  )
}

export default Header;