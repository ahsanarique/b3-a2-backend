import { Product } from './product.model';
import { TProduct } from './product.interface';
import { ProductSchema } from './product.validation';

const isProductAvailable = async (productId: string): Promise<boolean> => {
  try {
    const product: TProduct | null = await Product.findById(productId);
    return product?.inventory.inStock ?? false;
  } catch (error: any) {
    throw new Error(`Error checking product availability: ${error.message}`);
  }
};

const createProductIntoDB = async (productData: any): Promise<TProduct> => {
  try {
    const validatedProduct = ProductSchema.parse(productData);

    const newProduct = new Product(validatedProduct);

    await Product.create(newProduct);
    return newProduct;
  } catch (error: any) {
    throw new Error(`Error creating product: ${error.message}`);
  }
};

const getAllProductsFromDB = async (
  searchTerm?: string
): Promise<TProduct[]> => {
  try {
    const query = searchTerm
      ? {
          $or: [
            { name: new RegExp(searchTerm, 'i') },
            { description: new RegExp(searchTerm, 'i') },
            { category: new RegExp(searchTerm, 'i') },
            { tags: new RegExp(searchTerm, 'i') },
          ],
        }
      : {};
    const products = await Product.find(query);
    return products;
  } catch (error: any) {
    throw new Error(`Error fetching products: ${error.message}`);
  }
};

const getSingleProductFromDB = async (
  productId: string
): Promise<TProduct | null> => {
  try {
    const product = await Product.findOne({id: productId});

    if (!product) {
      throw new Error('Product not found');
    }
    return product;
  } catch (error: any) {
    throw new Error(`Error fetching product: ${error.message}`);
  }
};

const updateProductInDB = async (
  productId: string,
  productData: any
): Promise<TProduct | null> => {
  try {
    const validatedProduct = ProductSchema.partial().parse(productData);
    const updatedProduct = await Product.findOneAndUpdate(
      {id: productId},
      validatedProduct,
      { new: true }
    );

    if (!updatedProduct) {
      throw new Error('Product not found');
    }
    return updatedProduct;
  } catch (error: any) {
    throw new Error(`Error updating product: ${error.message}`);
  }
};

const deleteProductFromDB = async (
  productId: string
): Promise<TProduct | null> => {
  try {
    const result = await Product.findOneAndDelete({id: productId});
    if (!result) {
      throw new Error('Product not found');
    }
    return result;
  } catch (error: any) {
    throw new Error(`Error deleting product: ${error.message}`);
  }
};

export const ProductServices = {
  createProductIntoDB,
  getAllProductsFromDB,
  getSingleProductFromDB,
  deleteProductFromDB,
  updateProductInDB,
};
