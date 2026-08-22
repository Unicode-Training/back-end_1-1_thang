import express, { Request, Response } from "express";
import { validate } from "../middlewares/validate.middleware";
import { createProductSchema } from "../validators/product.validator";
import { productController } from "../controllers/product.controller";
const router = express.Router();
router.get('/', (req: Request, res: Response) => {
    res.json({})
});

router.get('/products', productController.findAll);
router.post('/products', validate(createProductSchema), productController.create);
router.get('/products/:id', productController.find);
export default router;