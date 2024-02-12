// const express = require('express');
// const { google } = require('googleapis');
// const crypto = require('crypto');

// const router = express.Router();

// /**
//  * To use OAuth2 authentication, we need access to a CLIENT_ID, CLIENT_SECRET, AND REDIRECT_URI
//  * from the client_secret.json file. To get these credentials for your application, visit
//  * https://console.cloud.google.com/apis/credentials.
//  */
// const oauth2Client = new google.auth.OAuth2(
//   process.env.CLIENT_ID_OATH,
//   process.env.CLIENT_SECRET,
//   process.env.YOUR_REDIRECT_URL
// );

// // Access scopes for read-only Drive activity.
// const scopes = [
//   'https://www.googleapis.com/auth/calendar.events'
// ];

// // Generate a url that asks permissions for the Drive activity scope
// const authorizationUrl = oauth2Client.generateAuthUrl({
//   access_type: 'offline',
//   scope: scopes,
//   include_granted_scopes: true
// });

// // Redirect user to the authorization URL
// router.get('/authorize', (req, res) => {
//   res.redirect(authorizationUrl);
// });

// module.exports = router;
