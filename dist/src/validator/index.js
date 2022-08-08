"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
class CatsValidator {
    checkCats() {
        return [
            (0, express_validator_1.body)("name").notEmpty().withMessage("The name of the cat should not be empty"),
            (0, express_validator_1.body)("age").notEmpty().withMessage("The age of the cat should not be empty").isNumeric().withMessage("age should be numeric"),
            (0, express_validator_1.body)("id").optional().isUUID(4).withMessage("id should be UUID v4"),
            (0, express_validator_1.body)("breed").notEmpty().withMessage("The breed of the cat should not be empty")
        ];
    }
    checkIdParam() {
        return [
            (0, express_validator_1.param)("id").notEmpty().withMessage("The id should not be empty").isUUID(4).withMessage("id should be UUID v4")
        ];
    }
}
exports.default = new CatsValidator();
