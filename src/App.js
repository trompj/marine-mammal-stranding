import logo from './logo.svg';
import './styles/App.css';
import {Route, Switch, withRouter} from 'react-router-dom';
import React, { Component } from 'react';
import {Button, Navbar, Nav, NavLink, FormControl, Form} from "react-bootstrap";
import {Dashboard} from "./components/Dashboard";
import { Router } from "react-router-dom";
// import useAuth0 from "@auth0/auth0-react/dist/use-auth0";
import NavBar from "./components/NavBar";
import { useAuth0 } from "@auth0/auth0-react";
import Container from "react-bootstrap/Container";
import History from "./utils/History";
import Profile from "./components/Profile";

const App = () => {
    const { isLoading, error } = useAuth0();

    if (error) {
        return <div>Oops... {error.message}</div>;
    }

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <Router history={History}>
            <div id="app" className="container-fluid">
                <NavBar />
                <Switch>
                    <Route exact path="/" />
                    <Route exact path="/dashboard"><Dashboard /></Route>
                    <Route exact path="/profile"><Profile/></Route>
                </Switch>
                {/*<Footer />*/}
            </div>
        </Router>
    );
};

export default App;
