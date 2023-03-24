/* eslint-disable import/first */
require('dotenv').config();
import express, { Express } from 'express';
import mongoose from 'mongoose'
import cors from 'cors'

const userRoutes = require('./routes/userRoutes');

const app: Express = express();

app.use(cors());
app.use(express.json());

app.use('/users', userRoutes)

const PORT = process.env.PORT || 5000;
const MONGOOSE_URL = process.env.MONGOOSE_URL || 'mongodb://localhost:27017/LSYSTEM'

mongoose.connect(MONGOOSE_URL)
.then(() => app.listen(PORT, () =>{
  console.log(`Server listening on port ${PORT}.`);
}))
.catch((err: any)=> {
  console.log(err);
})