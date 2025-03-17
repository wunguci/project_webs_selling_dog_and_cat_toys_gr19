import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    items: [
        {
            product_id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
            },
        }
    ],
    total_price: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        required: true,
        default: "Đang giao",
    },
    order_date: {
        type: Date,
        default: Date.now,
    },
}, {collection: "orders"});

const Order = mongoose.model("Order", orderSchema);
export default Order;