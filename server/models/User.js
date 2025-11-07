import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    birthDate: { type: Date, required: true },
    password: { type: String, required: true },
    role: { type: String, default: "user" },
    avatar: { type: String, maxlength: 5000000 }, // Tăng giới hạn cho base64 image
    gender: { type: String, enum: ["Nam", "Nữ", "Khác"], default: "Nam" },
    address: { type: String },
    status: { type: String, default: "Inactive", enum: ["Active", "Inactive"] },
    lastActive: { type: Date, default: null },
  },
  { collection: "users" }
);

const User = mongoose.model("User", userSchema);
export default User;
