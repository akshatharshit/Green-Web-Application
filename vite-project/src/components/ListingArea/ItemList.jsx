import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listItems, deleteItem } from "../../slices/itemCreateSlice";
import { jwtDecode } from "jwt-decode";
import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react"; 
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css"; 


const ItemList = () => {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.itemCreate);
  const { token } = useSelector((state) => state.auth);
  const [cartCount, setCartCount] = useState(0); 

  let userId = null;
  if (token) {
    try {
      const decoded = jwtDecode(token);
      userId = decoded.id;
    } catch (err) {
      console.error("Invalid token", err);
    }
  }

  useEffect(() => {
    dispatch(listItems());
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    setCartCount(cartItems.length); 
  }, [dispatch]);

  const handleDelete = (id) => {
    if (token) {
      dispatch(deleteItem(id, token));
      toast.success("Item deleted successfully!", { autoClose: 2000 }); 
    }
  };

  const handleAddToCart = (item) => {
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];

   
    const itemIndex = existingCart.findIndex((i) => i._id === item._id);
    if (itemIndex >= 0) {
      existingCart[itemIndex].quantity += 1;
    } else {
      existingCart.push({ ...item, quantity: 1 });
    }

    
    localStorage.setItem("cart", JSON.stringify(existingCart));

    
    const total = existingCart.reduce(
      (acc, curr) => acc + curr.price * curr.quantity,
      0
    );
    localStorage.setItem("cartTotal", total);

    setCartCount(existingCart.length);
    toast.success(`${item.title} added to cart!`, { autoClose: 2000 }); 
  };

  if (loading) return <p className="text-center text-green-700">Loading...</p>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;

  return (
    <>
      
      <div className=" min-h-screen py-10 px-4 relative bg-gradient-to-r from-green-200 via-green-100 to-green-200" >
        
        <Link to="/cart" className="absolute top-5 right-6 flex items-center space-x-2">
          <ShoppingCart className="w-8 h-8 text-green-700 hover:text-green-900 transition duration-200" />
          {cartCount > 0 && (
            <span className="text-green-700 font-semibold">{cartCount}</span> // Cart item count
          )}
        </Link>

        <h1 className="text-3xl text-green-900 font-bold text-center mb-8">
          🌿 Our Eco-Friendly Items
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <motion.div
              key={item._id}
              className="bg-white rounded-2xl shadow-lg p-5 hover:shadow-xl transition-shadow duration-300"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h2 className="text-xl font-semibold text-green-800">{item.title}</h2>
              <p className="text-green-700 mt-1">{item.description}</p>
              <p className="text-green-900 font-bold mt-2">₹{item.price}</p>

              <div className="flex space-x-3 mt-4">
                <button
                  onClick={() => handleAddToCart(item)}
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition duration-200"
                >
                  Add to Cart
                </button>

                {userId &&
                  item.seller &&
                  (item.seller._id === userId || item.seller === userId) && (
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition duration-200"
                    >
                      Delete
                    </button>
                  )}
              </div>
            </motion.div>
          ))}
        </div>

       
        <ToastContainer position="top-right" autoClose={5000} />
      </div>
      
    </>
  );
};

export default ItemList;
