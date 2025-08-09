import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Import, ShoppingCart } from "lucide-react"; 
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css"; 


function Cart() {
    const [cart, setCart] = useState([]);
    const [total, setTotal] = useState(0);
    const [itemCount, setItemCount] = useState(0);

    useEffect(() => {
        const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
        setCart(cartItems);
        setItemCount(cartItems.reduce((acc, item) => acc + item.quantity, 0));
        setTotal(
            cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
        );
    }, []);

    const handleRemove = (id) => {
        const updatedCart = cart.filter((item) => item._id !== id);
        setCart(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));

        
        setItemCount(updatedCart.reduce((acc, item) => acc + item.quantity, 0));
        setTotal(
            updatedCart.reduce((acc, item) => acc + item.price * item.quantity, 0)
        );

        toast.success("Item removed from cart!", { autoClose: 2000 });
    };

    const handleCheckout = () => {
        toast.success("Proceeding to Checkout!", { autoClose: 2000 });
    };

    if (cart.length === 0) {
        return (
            <div className="text-center text-green-700 py-10">
                <h2 className="text-2xl font-semibold">Your Cart is Empty</h2>
                <Link
                    to="/"
                    className="mt-5 inline-block text-green-600 hover:text-green-800 font-semibold"
                >
                    Go Back to Shop
                </Link>
            </div>
        );
    }

    return (
        <>
            
            <div className=" min-h-screen py-10 px-4">
                <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-6">
                    <h2 className="text-3xl text-green-900 font-semibold mb-6 text-center">
                        🌿 Your Cart
                    </h2>

                    {cart.map((item) => (
                        <motion.div
                            key={item._id}
                            className="flex justify-between items-center p-4 bg-green-100 rounded-lg shadow-sm mb-4"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4 }}
                        >
                            <div className="flex items-center space-x-4">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-20 h-20 object-cover rounded-lg"
                                />
                                <div>
                                    <h3 className="text-xl font-semibold text-green-800">{item.title}</h3>
                                    <p className="text-green-600">₹{item.price} x {item.quantity}</p>
                                </div>
                            </div>

                            <button
                                onClick={() => handleRemove(item._id)}
                                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition duration-200"
                            >
                                Remove
                            </button>
                        </motion.div>
                    ))}

                    <div className="mt-6 flex justify-between text-lg font-semibold">
                        <p>Total Items: {itemCount}</p>
                        <p>Total: ₹{total}</p>
                    </div>

                    <button
                        onClick={handleCheckout}
                        className="mt-8 w-full py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition duration-200"
                    >
                        Proceed to Checkout
                    </button>
                </div>

                
                <ToastContainer position="top-right" autoClose={5000} />
            </div>
           
        </>
    );
}

export default Cart;
