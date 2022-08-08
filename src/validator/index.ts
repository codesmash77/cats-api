import { body, param } from "express-validator";

class CatsValidator{
    checkCats(){
        return [
            body("name").notEmpty().withMessage("The name of the cat should not be empty"),
            body("age").notEmpty().withMessage("The age of the cat should not be empty").isNumeric().withMessage("age should be numeric"),
            body("id").optional().isUUID(4).withMessage("id should be UUID v4"),
            body("breed").notEmpty().withMessage("The breed of the cat should not be empty")
        ];
    }

    checkIdParam() {
        return [
            param("id").notEmpty().withMessage("The id should not be empty").isUUID(4).withMessage("id should be UUID v4")
        ];
    }

}

export default new CatsValidator();