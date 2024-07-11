import { z } from "zod";

export const createOrderValidationSchema = z.object({
  body: z.object({
    email: z.string().email(),
    productId: z.string().nonempty(),
    price: z.number().positive(),
    quantity: z.number().int().positive(),
  }),
});

export const orderValidations = {
  createOrderValidationSchema,
};
