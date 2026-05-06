const Product = require('../models/product.model');
const ApiError = require('../utils/apiError');

const createProduct = async (data) => {
  return Product.create(data);
};

const getProductById = async (id) => {
  const product = await Product.findById(id);
  if (!product) throw new ApiError(404, 'Product not found');
  return product;
};

const updateProduct = async (id, data) => {
  const product = await Product.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
    context: 'query',
  });
  if (!product) throw new ApiError(404, 'Product not found');
  return product;
};

const deleteProduct = async (id) => {
  const product = await Product.findByIdAndDelete(id);
  if (!product) throw new ApiError(404, 'Product not found');
  return product;
};

const queryProducts = async (query) => {
  const page = parseInt(query.page, 10) || 1;
  const limit = parseInt(query.limit, 10) || 12;
  const skip = (page - 1) * limit;

  const filter = {};
  if (query.category) filter.category = query.category;
  if (query.minPrice || query.maxPrice) {
    filter.price = {};
    if (query.minPrice) filter.price.$gte = Number(query.minPrice);
    if (query.maxPrice) filter.price.$lte = Number(query.maxPrice);
  }
  if (query.search) {
    filter.$text = { $search: query.search };
  }

  let sort = { createdAt: -1 };
  if (query.sortBy) {
    const [field, order] = query.sortBy.split(':');
    sort = { [field]: order === 'asc' ? 1 : -1 };
  }

  const total = await Product.countDocuments(filter);
  const products = await Product.find(filter).sort(sort).skip(skip).limit(limit);

  return { products, page, limit, total, pages: Math.ceil(total / limit) };
};

module.exports = { createProduct, getProductById, updateProduct, deleteProduct, queryProducts };
