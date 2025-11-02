const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const routes = require('./routes');

const app = express();

// ✅ Allow CORS for both local dev and deployed frontend (Vercel)
const allowedOrigins = [
  'http://localhost:5173', // local development
  'https://privilege-escalation-ct4w5vgfku.vercel.app', // your deployed frontend
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like curl)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true
}));

// ✅ Middleware setup
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static('app/public'));
app.use('/', routes);

// ✅ Server start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log('TinyTasks (vuln) running on port', PORT));
