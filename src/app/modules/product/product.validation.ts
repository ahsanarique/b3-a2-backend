import { z } from 'zod';

const VariantSchema = z.object({
  type: z.string(),
  value: z.string()
});

const InventorySchema = z.object({
  quantity: z.number(),
  inStock: z.boolean()
});

const ProductSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  price: z.number(),
  category: z.string(),
  tags: z.array(z.string()),
  variants: z.array(VariantSchema),
  inventory: InventorySchema
});

type TProduct = z.infer<typeof ProductSchema>;

export { ProductSchema, TProduct };