import Cart from '../models/Cart.js';

// Thêm sản phẩm vào giỏ hàng
export const addToCart = async (req, res) => {
    try {
        const { user_id, product_id, quantity } = req.body;
        const newCard = new Cart({
            user_id,
            items: [{product_id, quantity}]
        });
        const savedCart = await newCard.save();
        res.status(201).json(savedCart);
    } catch (error) {
        res.status(400).json({message: error.message})
    }    
}

// Lấy giỏ hàng theo user_id
export const getCartByUserId = async (req, res) => {
    try {
        const cart = await Cart.findOne({user_id: req.params.user_id}).populate('items.product_id');
        if (!cart) {
            return res.status(404).json({message: "Cart not found"});
        }
        res.status(200).json(cart);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

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
        const cart = await Cart.findOne({user_id: req.params.user_id});
        if (!cart) {
            return res.status(404).json({message: "Cart not found"});
        }
        const updatedItems = cart.items.filter(item => item.product_id != req.params.product_id);
        const updatedCart = await Cart.findOneAndUpdate(
            {user_id: req.params.user_id},
            {items: updatedItems},
            {new: true}
        ).populate('items.product_id');
        res.status(200).json(updatedCart);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

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