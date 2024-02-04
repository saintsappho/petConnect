/* eslint-disable react/prop-types */
import React, {useState, useEffect} from 'react';
import { createRoot } from 'react-dom/client';
import { Auth0Provider } from '@auth0/auth0-react';
import App from './App';

const root = createRoot(document.getElementById('root'));

root.render(
  <div idName='background'>
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