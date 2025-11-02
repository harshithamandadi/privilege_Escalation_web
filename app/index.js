const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const routes = require('./routes');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static('app/public'));

// routes
app.use('/', routes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log('TinyTasks (vuln) running on port', PORT));
