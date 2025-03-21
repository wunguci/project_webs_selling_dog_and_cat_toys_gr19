import Cart from '../models/Cart.js';

// Thêm sản phẩm vào giỏ hàng
export const addToCart = async (req, res) => {
  try {
      const { user_id, product_id, quantity } = req.body;
      let cart = await Cart.findOne({ user_id });

      if (cart) {
          const existingItemIndex = cart.items.findIndex(
              (item) => item.product_id.toString() === product_id
          );

          if (existingItemIndex !== -1) {
              cart.items[existingItemIndex].quantity += quantity;
          } else {
              cart.items.push({ product_id, quantity });
          }
      } else {
          cart = new Cart({
              user_id,
              items: [{ product_id, quantity }],
          });
      }

      // Lưu giỏ hàng
      const savedCart = await cart.save();

      res.status(201).json(savedCart);
  } catch (error) {
      res.status(400).json({ message: error.message });
  }
};

// Lấy giỏ hàng theo user_id
export const getCartByUserId = async (req, res) => {
    try {
      const cart = await Cart.findOne({ user_id: req.params.user_id }).populate('items.product_id');

      // Nếu giỏ hàng tồn tại nhưng không có sản phẩm
      if (!cart) {
        console.log("Giỏ hàng trống");
        return res.status(200).json({ status: "empty", message: "Your cart is empty", items: [] });
      }
  
      res.status(200).json({ status: "success", data: cart });
    } catch (error) {
      console.error("Lỗi khi truy vấn giỏ hàng:", error);
      res.status(500).json({ status: "error", message: "Lỗi server, không thể lấy giỏ hàng.", error: error.message });
    }
  };

// Cập nhật giỏ hàng
export const updateCart = async (req, res) => {
    try {
        const { items } = req.body;
        const updatedCart = await Cart.findOneAndUpdate(
            {user_id: req.params.user_id},
            {items},
            {new: true}
        ).populate('items.product_id');
        if (!updatedCart) {
            return res.status(404).json({message: "Cart not found"});
        }
        res.status(200).json(updatedCart);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

// Xóa giỏ hàng
export const deleteCart = async (req, res) => {
    try {
        const cart = await Cart.findOneAndDelete({user_id: req.params.user_id});
        if (!cart) {
            return res.status(404).json({message: "Cart not found"});
        }
        res.status(200).json({message: "Cart deleted"});
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

// Xóa sản phẩm khỏi giỏ hàng
export const deleteProductFromCart = async (req, res) => {
    try {
      const { user_id, product_id } = req.params;
      // Tìm giỏ hàng của người dùng
      const cart = await Cart.findOne({ user_id });
  
      if (!cart) {
        return res.status(404).json({ message: "Cart not found" });
      }
  
      const itemIndex = cart.items.findIndex(item => item.product_id.equals(product_id));
      
      if (itemIndex === -1) {
        return res.status(404).json({ message: "Product not found in cart" });
      }
  
      cart.items.splice(itemIndex, 1);
  
      // Lưu lại giỏ hàng
      await cart.save();
      await cart.populate('items.product_id');
  
      if (cart.items.length === 0) {
        return res.status(200).json({ message: "Product removed successfully. Cart is now empty.", cart });
      }
  
      res.status(200).json({ message: "Product removed successfully", cart });
    } catch (error) {
      console.error("Lỗi khi xóa sản phẩm:", error);
      res.status(500).json({ message: "Lỗi server", error: error.message });
    }
  };
// Xóa tất cả sản phẩm khỏi giỏ hàng
export const deleteAllProductsFromCart = async (req, res) => {
    try {
        const cart = await Cart.findOneAndUpdate(
            {user_id: req.params.user_id},
            {items: []},
            {new: true}
        ).populate('items.product_id');
        res.status(200).json(cart);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

// đếm số lượng sản phẩm trong giỏ hàng
export const countCartItems = async (req, res) => {
    try {
        const cart = await Cart.findOne({user_id: req.params.user_id});
        if (!cart) {
            return res.status(404).json({message: "Cart not found"});
        }
        const count = cart.items.reduce((total, item) => total + item.quantity, 0);
        res.status(200).json(count);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}