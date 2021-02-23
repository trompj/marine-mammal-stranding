import React, { useState } from "react";
import { NavLink as RouterNavLink, useLocation } from "react-router-dom";
import { FaBeer } from 'react-icons/fa';
import { useAuth0 } from "@auth0/auth0-react";
import Navbar from "react-bootstrap/Navbar";
import '../styles/App.css';
import '../styles/NavBar.css'
import FormControl from "react-bootstrap/FormControl";
import Form from "react-bootstrap/Form";
import NavLink from "react-bootstrap/NavLink";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const {
    user,
    isAuthenticated,
    loginWithRedirect,
    logout,
  } = useAuth0();
  const toggle = () => setIsOpen(!isOpen);

  const logoutWithRedirect = () =>
    logout({
      returnTo: window.location.origin,
    });

  const usePathname = () => {
    const location = useLocation();
    return location.pathname;
  };

  return (
      <div>
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="/">Marine Stranding Response</Navbar.Brand>
          <Nav
            activeKey={usePathname()}
            className="mr-auto"
          >
            <NavLink
              href="/"
              to="/"
              activeclassname="theme-font-color"
            >
              Home
            </NavLink>
            {isAuthenticated && (
                <NavLink
                    href="/dashboard"
                    to="/dashboard"
                    activeclassname="theme-font-color"
                >
                  Dashboard
                </NavLink>
            )}
          </Nav>

          <Nav
            className="d-none d-md-block"
            activeKey={usePathname()}
          >
            {!isAuthenticated && (
                <Nav.Item>
                  <Button
                      id="qsLoginBtn"
                      className="btn-margin theme-background-color"
                      onClick={() => loginWithRedirect()}
                  >
                    Log in
                  </Button>
                </Nav.Item>
            )}
            {isAuthenticated && (
                <Dropdown>
                  <Dropdown.Toggle className="nav-color" id="profileDropDown">
                    <img
                        src={user.picture}
                        alt="Profile"
                        className="nav-user-profile d-inline-block rounded-circle mr-3"
                        width="50"
                    />
                  </Dropdown.Toggle>
                  <Dropdown.Menu className="dropdown-location">
                    <Dropdown.Item
                      header
                      className="disabled-nav-item"
                    >
                      {user.name}
                    </Dropdown.Item>
                    <Dropdown.Item
                        tag={RouterNavLink}
                        href="/profile"
                        className="dropdown-item"
                        to="/profile"
                        activeclassname="dropdown-item-active"
                    >
                      Profile
                    </Dropdown.Item>
                    <Dropdown.Item
                        className="dropdown-item"
                        onClick={() => logoutWithRedirect()}
                    >
                      Log out
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
            )}
          </Nav>

          {/*{!isAuthenticated && (*/}
              {/*<Nav*/}
                {/*className="d-md-none" navbar*/}
                {/*activeKey={usePathname()}*/}
              {/*>*/}
                {/*<Nav.Item>*/}
                  {/*<Button*/}
                      {/*id="qsLoginBtn"*/}
                      {/*className="theme-background-color"*/}
                      {/*block*/}
                      {/*onClick={() => loginWithRedirect({})}*/}
                  {/*>*/}
                    {/*Log in*/}
                  {/*</Button>*/}
                {/*</Nav.Item>*/}
              {/*</Nav>*/}
          {/*)}*/}
          {/*{isAuthenticated && (*/}
              {/*<Nav*/}
                  {/*className="d-md-none justify-content-between"*/}
                  {/*navbar*/}
                  {/*style={{ minHeight: 170 }}*/}
              {/*>*/}
                {/*<Nav.Item>*/}
                    {/*<span className="user-info">*/}
                      {/*<img*/}
                          {/*src={user.picture}*/}
                          {/*alt="Profile"*/}
                          {/*className="nav-user-profile d-inline-block rounded-circle mr-3"*/}
                          {/*width="50"*/}
                      {/*/>*/}
                      {/*<h6 className="d-inline-block">{user.name}</h6>*/}
                    {/*</span>*/}
                {/*</Nav.Item>*/}
                {/*<Nav.Item>*/}
                  {/*<NavLink*/}
                      {/*href="/profile"*/}
                      {/*to="/profile"*/}
                      {/*exact activeClassName="dropdown-item-active"*/}
                  {/*>*/}
                    {/*Profile*/}
                  {/*</NavLink>*/}
                {/*</Nav.Item>*/}
                {/*<Nav.Item>*/}
                  {/*<NavLink*/}
                      {/*to="#"*/}
                      {/*id="qsLogoutBtn"*/}
                      {/*onClick={() => logoutWithRedirect()}*/}
                  {/*>*/}
                    {/*Log out*/}
                  {/*</NavLink>*/}
                {/*</Nav.Item>*/}
              {/*</Nav>*/}
          {/*)}*/}

        </Navbar>

      </div>
  );
};

export default NavBar;
