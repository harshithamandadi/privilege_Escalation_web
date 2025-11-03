const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const routes = require('./routes');

const app = express();

// CORS configuration
app.use(cors({
  origin: 'https://backend-privilege-escalation-web.onrender.com',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

// middlewares
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static('app/public'));

// routes
app.use('/', routes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log('TinyTasks (vuln) running on port', PORT));
