import express from "express";
import { ProductControllers } from "./product.controller";
import validateRequest from "../../../middleware/validateRequest";
import { createProductValidationSchema } from "./product.validation";

const router = express.Router();

router.post(
  "/",
  validateRequest(createProductValidationSchema),
  ProductControllers.createProduct
);

router.get("/", ProductControllers.getAllProducts);

router.get("/:productId", ProductControllers.getSingleProduct);
router.put("/:productId", ProductControllers.updateProduct);
router.delete("/:productId", ProductControllers.deleteProduct);

export const ProductRoutes = router;
