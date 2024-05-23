import { Product } from '../product/product.model';
import { TProduct } from '../product/product.interface';
import { TOrder } from './order.validation';
import { ProductServices } from '../product/product.service';
import { Order } from './order.model';

const createOrderInDB = async (orderData: TOrder): Promise<TOrder> => {
  try {
    const product: TProduct | null = await Product.findOne({
      id: orderData.productId,
    });

    if (!product) {
      throw new Error('Product not found');
    }

    if (product.inventory.quantity < orderData.quantity) {
      throw new Error('Insufficient inventory quantity');
    }

    product.inventory.quantity -= orderData.quantity;
    product.inventory.inStock = product.inventory.quantity > 0;

    ProductServices.updateProductInDB(orderData.productId, product);

    const newOrder = new Order(orderData);
    await Order.create(newOrder);
    return newOrder;
  } catch (error: any) {
    throw new Error(`Error creating order: ${error.message}`);
  }
};

const getOrdersFromDB = async (email?: string): Promise<TOrder[]> => {
  try {
    const query = email ? { email } : {};
    const orders = await Order.find(query);
    return orders;
  } catch (error: any) {
    throw new Error(`Error fetching orders: ${error.message}`);
  }
};

export const OrderServices = {
    createOrderInDB,
    getOrdersFromDB
}
