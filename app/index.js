// ...existing code...
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const routes = require('./routes');



const app = express();

const cors = require('cors');


// Allow only your frontend's Render URL
app.use(cors({
  origin: 'https://privilege-escalation-web.onrender.com/',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

// Parse JSON
app.use(express.json());

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