import React, { useState, useEffect, useContext } from "react";
import { Button, Container, Col, Card, Icon, Dropdown, IconButton} from "@edx/paragon";
import { getConfig } from "@edx/frontend-platform";
import { useCookies } from 'react-cookie';
import { Person } from '@edx/paragon/icons';
import { AppContext } from '@edx/frontend-platform/react';


const Navigation = () => {
  const currentURL = window.location.href;
  const urlWithoutProtocol = currentURL.replace('https://', '');
  const [cookies] = useCookies(['edxloggedin', 'edx-user-info']);
  let username = '';
  const { authenticatedUser } = useContext(AppContext);

  if (authenticatedUser) {
    username = authenticatedUser.username;
  }


    return (
        <nav className="navigation nav-wrapper">
         <div className="nav-logo">
        {/* <img className="logo" src={Logo} alt="brand-logo"/> */}
         </div>
         
         {authenticatedUser ? (
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