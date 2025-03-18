import Order from "../models/Order.js";

// Tạo đơn hàng mới
export const createOrder = async (req, res) => {
    try {
        const { user_id, items, total_price, status } = req.body;
        const newOrder = new Order({
            user_id,
            items,
            total_price,
            status,
        });
        const savedOrder = await newOrder.save();
        res.status(201).json(savedOrder);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Lấy tất cả đơn hàng
export const getOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate('user_id').populate('items.product_id');
        res.status(200).json(orders);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

// Lấy đơn hàng theo ID
export const getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate('user_id').populate('items.product_id');
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }
        res.status(200).json(order);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

// Cập nhật đơn hàng
export const updateOrder = async (req, res) => {
    try {
        const { status } = req.body;
        const updatedOrder = await Order.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        ).populate('user_id').populate('items.product_id');
        if (!updatedOrder) {
            return res.status(404).json({ message: "Order not found" });
        }
        res.status(200).json(updatedOrder);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Xóa đơn hàng
export const deleteOrder = async (req, res) => {
    try {
        const deletedOrder = await Order.findByIdAndDelete(req.params.id);
        if (!deletedOrder) {
            return res.status(404).json({ message: "Order not found" });
        }
        res.status(200).json({ message: "Order deleted successfully" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};