// ...existing code...
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const routes = require('./routes');
const cors = require('cors');
const cors = require('cors');

const app = express();

// CORS: allow frontend origin(s) and allow cookies
// CORS: allow frontend origin(s) and allow cookies
app.use(cors({
  origin: ['https://privilege-escalation-web.onrender.com'], // include localhost while developing
  origin: ['https://privilege-escalation-web.onrender.com'], // include localhost while developing
  credentials: true
}));

// allow preflight for all routes
app.options('*', cors());

// middlewares
// allow preflight for all routes
app.options('*', cors());

// middlewares
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static('app/public'));

// routes

// routes
app.use('/', routes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log('TinyTasks (vuln) running on port', PORT));
// ...existing code...