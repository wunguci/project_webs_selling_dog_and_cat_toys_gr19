import express from "express";
import { getSettings, updateSettings } from "../controllers/settingController.js";

const router = express.Router();

// GET /api/settings - Lấy cài đặt hiện tại
router.get("/", getSettings);

// PUT /api/settings - Cập nhật cài đặt
router.put("/", updateSettings);

export default router;