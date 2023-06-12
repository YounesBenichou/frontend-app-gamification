import React, { useState, useEffect } from "react";
import { Button, Container, Col, Card, Icon, Dropdown, IconButton} from "@edx/paragon";
import { getConfig } from "@edx/frontend-platform";
import { useCookies } from 'react-cookie';
import { Person } from '@edx/paragon/icons';

const Navigation = () => {
  const currentURL = window.location.href;
  const urlWithoutProtocol = currentURL.replace('https://', '');
  const [cookies] = useCookies(['edxloggedin', 'edx-user-info']);
  let username = ''
  // Access the cookie value
  const userLoggedIn = cookies['edxloggedin'];
  const userInfo = cookies['edx-user-info'];
  if (userInfo) {
    const jsonStringWithoutBackslashes = userInfo.replace(/\\/g, '');
    const formattedData = jsonStringWithoutBackslashes.replace(/(?<=\})\s*"(?=\w)/g, '",').replace(/(?<=\d|\w)\s*"(?=\w)/g, '", "');
    
    const cleanedString = formattedData .replace(/"(054)",|054/g, '');
    const jsonString = cleanedString.replace(': 1"', ': "1"');
    const finalString = jsonString.replace('}",', '},');

    try {
        const userInfoObject = JSON.parse(finalString);
         username = userInfoObject.username;
       } catch (error) {
         // Handle the JSON parsing error, provide a fallback value if needed
         console.error('Error parsing JSON:', error);
       }
  } else {
    //Do nothing
  }


    return (
        <nav className="navigation nav-wrapper">
         <div className="nav-logo">
        {/* <img className="logo" src={Logo} alt="brand-logo"/> */}
         </div>
         
         {userLoggedIn ? (
        <div className="nav-auth-container">
          <Dropdown>
  <Dropdown.Toggle
    id="dropdown-toggle-with-iconbutton"
    as={IconButton}
    iconAs={Person}
    variant=""
  ></Dropdown.Toggle>
  <Dropdown.Menu>
    <Dropdown.Item href="/dashboard">Dashboard</Dropdown.Item>
    <Dropdown.Item href={`/u/${username}`}>Profile</Dropdown.Item>
    <Dropdown.Item href="/account/settings">Account</Dropdown.Item>
    <Dropdown.Item href="/logout">Logout</Dropdown.Item>
  </Dropdown.Menu>
</Dropdown>
<p className="username">{username}</p>
          
        </div>
      ) : 
      <div className="nav-auth-container">
      <a className="navigation-link" href="/register"><Button variant="" className="btn-login mb-2 mb-sm-0">Register</Button>
      </a>
      <a className="navigation-link" href="/dashboard"><Button variant="" className="btn-register mb-2 mb-sm-0">Login</Button>
      </a>
      </div>
      }
        </nav>
    )
}


export default Navigation;