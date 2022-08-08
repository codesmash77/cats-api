import express from "express";
import CatsValidator from '../validator'
import Middleware from '../middleware';
import CatsController from '../controller';

const CatsRouter = express.Router();

CatsRouter.post('/cats', CatsValidator.checkCats(),
    Middleware.handleValidationError,
    CatsController.createCat
);

CatsRouter.put('/cats/:id',
    CatsValidator.checkIdParam(),
    Middleware.handleValidationError,
    CatsController.updateCat
);

CatsRouter.delete('/cats/:id',
    CatsValidator.checkIdParam(),
    Middleware.handleValidationError,
    CatsController.deleteCat
)

CatsRouter.get('/cats',
    CatsController.getCats
);

CatsRouter.get('/cats/:id',
    CatsValidator.checkIdParam(),
    Middleware.handleValidationError,
    CatsController.getCat
);

export default CatsRouter;