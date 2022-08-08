import express from 'express';
import db from './config/database.config';
import CatsRouter from './routes';

db.sync().then(()=> console.log("connected to database"))

const app = express();
const port = 9000;

app.use(express.json());
app.use('/api/v1',CatsRouter);

app.listen( port, () => console.log(`server is running on ${port}`))