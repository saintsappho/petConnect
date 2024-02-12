/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, {useState, useEffect} from 'react';
import { createRoot } from 'react-dom/client';
import { Auth0Provider } from '@auth0/auth0-react';
import App from './App';
import "./main.css";

const root = createRoot(document.getElementById('root'));
const api_key = "891329768945174";
const cloud_name = "dp3almven";

root.render(
  <div id='background'>
    <Auth0Provider
    domain="dev-6ebu1wieb31ofvv3.us.auth0.com"
    clientId="dXjoqKdp9BVih5gK0EATd0gtYDZbr1IM"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
    >
    <App />
    </Auth0Provider >
  </div>
);