import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
// import * as serviceWorker from "./serviceWorker";
import { BrowserRouter as Router } from 'react-router-dom'
import '../node_modules/bootstrap/scss/bootstrap.scss'
import { Auth0Provider } from "@auth0/auth0-react";
import { getConfig } from "./utils/Config";
import history from "./utils/History";

const onRedirectCallback = (appState) => {
    history.push(
        appState && appState.returnTo ? appState.returnTo : window.location.pathname
    );
};

const config = getConfig();

const providerConfig = {
    domain: config.domain,
    clientId: config.clientId,
    ...(config.audience ? { audience: config.audience } : null),
    redirectUri: window.location.origin,
    scope: "read:current_user update:current_user_metadata",
    onRedirectCallback,
};


ReactDOM.render(
    <Auth0Provider {...providerConfig}>
        {/*<Router>*/}
            <App />
        {/*</Router>*/}
    </Auth0Provider>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
