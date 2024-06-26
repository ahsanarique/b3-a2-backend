import { Schema, model } from 'mongoose';
import {
  TProduct,
  TVariant,
  TInventory,
} from './product.interface';

const variantSchema = new Schema<TVariant>({
  type: { type: String, required: true },
  value: { type: String, required: true },
}, { _id: false });

const inventorySchema = new Schema<TInventory>({
  quantity: { type: Number, required: true },
  inStock: { type: Boolean, required: true },
}, { _id: false });

const productSchema = new Schema<TProduct>({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  tags: { type: [String], required: true },
  variants: { type: [variantSchema], required: true },
  inventory: { type: inventorySchema, required: true },
});

export const Product = model<TProduct>('Product', productSchema);