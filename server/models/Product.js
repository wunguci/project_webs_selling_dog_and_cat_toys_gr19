import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  sold: {
    type: Number,
    default: 0,
  },
  images: {
    type: [String], // Mảng các đường dẫn ảnh
    default: [],
  },
  category_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category', // Tham chiếu đến model Category
    required: true,
  },
}, { collection: 'products' });

const Product = mongoose.model('Product', productSchema);
export default Product;