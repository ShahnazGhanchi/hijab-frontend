import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";

const Products = () => {

  const [products, setProducts] = useState([]);

  const getProducts = async () => {

    try {

      const response = await axios.get(
        'https://hijab-backend-pink.vercel.app/api/products/all'
      );

      setProducts(response.data);

    } catch (error) {

      console.log(error);
    }
  };
  
  // delete function
  const handleDelete = async (id) => {

  try {

    const token = localStorage.getItem("token");

    console.log(token);

    await axios.delete(
      `https://hijab-backend-pink.vercel.app/api/products/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    setProducts(
      products.filter((product) => product._id !== id)
    );

    alert("Product Deleted");

  } catch (error) {

    console.log(error);

    alert("Delete Failed");
  }
};

  useEffect(() => {

    getProducts();

  }, []);

  return (

  <div className="min-h-screen bg-[#090D16] text-white px-8 py-24">

    <h1 className="text-4xl font-bold mb-10 text-center">
      Our Products
    </h1>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

      {products.map((product) => (
        <Link
          to={`/product/${product._id}`}
          key={product._id}
        >

          <div className="bg-[#111827] rounded-2xl overflow-hidden shadow-lg hover:scale-105 transition duration-300">

            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-80 object-cover"
            />

            <div className="p-5">

              <h2 className="text-2xl font-semibold mb-2">
                {product.name}
              </h2>

              <p className="text-gray-300">
                Fabric:
                <span className="text-white ml-1">
                  {product.fabric}
                </span>
              </p>

              <p className="text-gray-300">
                Category:
                <span className="text-white ml-1 capitalize">
                  {product.category}
                </span>
              </p>

              <p className="text-pink-400 text-2xl font-bold mt-4">
                Rs. {product.price}
              </p>

              <button
                onClick={(e) => {
                  e.preventDefault();
                  handleDelete(product._id);
                }}
                className="mt-4 bg-red-500 hover:bg-red-600 px-4 py-2 rounded"
              >
                Delete
              </button>

            </div>
          </div>

        </Link>
      ))}

    </div>

  </div>
)};
  


export default Products;