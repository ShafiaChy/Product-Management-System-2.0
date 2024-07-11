import { Product } from "./product.interface";
import { ProductModel } from "./product.model";

const createProductIntoDB = async (Product: Product) => {
  const result = await ProductModel.create(Product);

  return result;
};

const getAllProductsFromDB = async (searchQuery: string) => {
  const searchTerm = {};
  if (searchQuery) {
    const regex = new RegExp(searchQuery, "i");
    const result = await ProductModel.find({
      $or: [
        { name: { $regex: regex } },
        { description: { $regex: regex } },
        { tags: { $regex: regex } },
        { category: { $regex: regex } },
      ],
    });
    return result;
  }
  const result = await ProductModel.find(searchTerm);
  return result;
};

const getSingleProductFromDB = async (id: string) => {
  const result = await ProductModel.findOne({ id });
  return result;
};

const updateProductIntoDB = async (id: string, payload: Partial<Product>) => {
  const { tags, variants, inventory, ...remainingProductData } = payload;

  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingProductData,
  };

  if (tags && Array.isArray(tags)) {
    modifiedUpdatedData["tags"] = tags;
  }

  if (variants && Array.isArray(variants) && variants.length) {
    variants.forEach((variant, index) => {
      if (variant && Object.keys(variant).length) {
        for (const [key, value] of Object.entries(variant)) {
          modifiedUpdatedData[`variants.${index}.${key}`] = value;
        }
      }
    });
  }

  if (inventory && Object.keys(inventory).length) {
    for (const [key, value] of Object.entries(inventory)) {
      modifiedUpdatedData[`inventory.${key}`] = value;
    }
  }

  console.log(modifiedUpdatedData);

  const result = await ProductModel.findOneAndUpdate(
    { id },
    modifiedUpdatedData,
    {
      new: true,
      runValidators: true,
    }
  );
  return result;
};

const deleteProductFromDB = async (id: string) => {
  const result = await ProductModel.findByIdAndDelete(id);
  return result;
};

export const ProductServices = {
  updateProductIntoDB,
  createProductIntoDB,
  getAllProductsFromDB,
  getSingleProductFromDB,
  deleteProductFromDB,
};
