"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
class Middleware {
    handleValidationError(req, res, next) {
        const err = (0, express_validator_1.validationResult)(req);
        if (!err.isEmpty()) {
            return res.json(err);
        }
        next();
    }
}
exports.default = new Middleware();
