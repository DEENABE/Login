
// console.log('Server is running on port 3000');
const express = require('express');
const connectDB = require('./database/db');
require('dotenv').config();
const cors = require('cors');
const bodyParser = require('body-parser');
const authRouter=require('./routes/authRouter');


connectDB();

const app = express();
app.use(bodyParser.json());
const allowedOrigins = [
  'http://localhost:5173',
  'https://login-chi-sand.vercel.app'  //  Vercel frontend
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));

//routing to authRouter
app.use('/auth',authRouter)

// Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  app.get('/', (req, res) => {
    res.send('Welcome to the Login API');
  }); 
});

