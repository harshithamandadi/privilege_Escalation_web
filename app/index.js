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



// allow preflight for all routes
app.options('*', cors());

// middlewares
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static('app/public'));
app.use('/', routes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log('TinyTasks (vuln) running on port', PORT));

