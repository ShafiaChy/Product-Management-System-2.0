import express from "express";
import { ProductControllers } from "./product.controller";

const router = express.Router();

router.post("/create-student", ProductControllers.createProduct);

router.get("/", ProductControllers.getAllProducts);

router.get("/:studentId", ProductControllers.getSingleProduct);

export const ProductRoutes = router;
