"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validator_1 = __importDefault(require("../validator"));
const middleware_1 = __importDefault(require("../middleware"));
const controller_1 = __importDefault(require("../controller"));
const CatsRouter = express_1.default.Router();
CatsRouter.post('/cats', validator_1.default.checkCats(), middleware_1.default.handleValidationError, controller_1.default.createCat);
CatsRouter.put('/cats/:id', validator_1.default.checkIdParam(), middleware_1.default.handleValidationError, controller_1.default.updateCat);
CatsRouter.delete('/cats/:id', validator_1.default.checkIdParam(), middleware_1.default.handleValidationError, controller_1.default.deleteCat);
CatsRouter.get('/cats', controller_1.default.getCats);
CatsRouter.get('/cats/:id', validator_1.default.checkIdParam(), middleware_1.default.handleValidationError, controller_1.default.getCat);
exports.default = CatsRouter;
