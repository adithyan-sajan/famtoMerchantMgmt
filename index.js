require('dotenv').config()
const express = require('express');
const cors = require('cors');
const router = require('./routes');
const connectToDB = require('./config/mongoose')

connectToDB()

const server = express();
server.use(cors());
server.use(express.json());
server.use('/api', router)
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});