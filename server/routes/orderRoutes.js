import express from "express";
import {
    createOrder,
    getOrders,
    getOrderById,
    updateOrder,
    deleteOrder,
    getOrderStats,
    getRecentOrders
} from "../controllers/orderController.js";

const router = express.Router();

// Tạo đơn hàng mới
router.post("/", createOrder);

// Lấy tất cả đơn hàng
router.get("/", getOrders);

// Lấy thống kê đơn hàng
router.get("/stats", getOrderStats);

// Lấy đơn hàng gần đây
router.get("/recent", getRecentOrders);

// Lấy đơn hàng theo ID
router.get("/:id", getOrderById);

// Cập nhật đơn hàng
router.put("/:id", updateOrder);

// Xóa đơn hàng
router.delete("/:id", deleteOrder);

export default router;