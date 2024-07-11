import { z } from "zod";

// Define Variant schema
const VariantSchema = z.object({
  type: z.string().nonempty(),
  value: z.string().nonempty(),
});

// Define Inventory schema
const InventorySchema = z.object({
  quantity: z.number().min(1),
  inStock: z.boolean(),
});

// Define Product schema
export const createProductValidationSchema = z.object({
  body: z.object({
    name: z.string().nonempty(),
    description: z.string().nonempty(),
    price: z.number().positive(),
    category: z.string().nonempty(),
    tags: z.array(z.string().nonempty()),
    variants: z.array(VariantSchema),
    inventory: InventorySchema,
  }),
});

export const productValidations = {
  createProductValidationSchema,
};
