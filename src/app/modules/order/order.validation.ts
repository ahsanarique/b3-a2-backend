import { z } from 'zod';

const OrderSchema = z.object({
    email: z.string(),
    productId: z.string(),
    price: z.number(),
    quantity: z.number()
});

type TOrder = z.infer<typeof OrderSchema>;

export { OrderSchema, TOrder };