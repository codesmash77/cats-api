import express, { Request, Response } from 'express';
import db from './config/database.config';
import CatsValidator from './validator'
import Middleware from './middleware';
import CatsController from './controller';


db.sync().then(()=> console.log("connected to database"))

const app = express();
const port = 9000;

app.use(express.json());

app.post('/cats', CatsValidator.checkCats(),
    Middleware.handleValidationError,
    CatsController.createCat
);

app.put('/cats/:id',
    CatsValidator.checkIdParam(),
    Middleware.handleValidationError,
    CatsController.updateCat
);

app.delete('/cats/:id',
    CatsValidator.checkIdParam(),
    Middleware.handleValidationError,
    CatsController.deleteCat
)

app.get('/cats',
    CatsController.getCats
);

app.get('/cats/:id',
    CatsValidator.checkIdParam(),
    Middleware.handleValidationError,
    CatsController.getCat
);




app.listen( port, () => console.log(`server is running on ${port}`))