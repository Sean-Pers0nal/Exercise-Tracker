// index.js
// where your node app starts

// init project
require('dotenv').config();
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint...
app.get('/api/hello', function (req, res) {
  res.json({ greeting: 'hello API' });
});

// A new API endpoint to parse the request headers
app.get('/api/whoami', function (req, res) {
  // Get the IP address from the request header. 'x-forwarded-for' is used in case the app is behind a proxy.
  // req.socket.remoteAddress can be used for direct connections, but x-forwarded-for is more reliable.
  const ipaddress = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

  // Get the language from the 'accept-language' header
  const language = req.headers['accept-language'];

  // Get the software from the 'user-agent' header
  const software = req.headers['user-agent'];

  // Send the JSON response with the extracted information
  res.json({
    ipaddress: ipaddress,
    language: language,
    software: software
  });
});

// listen for requests :)
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
