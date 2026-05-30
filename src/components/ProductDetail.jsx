import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


const ProductDetail = () => {
  const { id } = useParams();

  const [product, setProduct] = useState(null);

  useEffect(() => {
    getSingleProduct();
  }, []);

  const getSingleProduct = async () => {
    try {
      const res = await axios.get(
  `http://localhost:8000/api/products/${id}`
);
      setProduct(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  if (!product) {
    return <h1 className="text-center mt-10">Loading...</h1>;
  }

  return (
  <div className="min-h-screen bg-[#090D16] text-white px-8 py-24">

    <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">

      <div>
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-[550px] object-cover rounded-3xl shadow-2xl"
        />
      </div>

      <div>

        <h1 className="text-5xl font-bold mb-6">
          {product.name}
        </h1>

        <p className="text-gray-300 text-lg mb-4">
          Premium quality hijab for elegant modest fashion.
        </p>

        <p className="text-xl mb-2">
          Fabric:
          <span className="text-rose-400 ml-2">
            {product.fabric}
          </span>
        </p>

        <p className="text-xl mb-6">
          Category:
          <span className="text-rose-400 ml-2 capitalize">
            {product.category}
          </span>
        </p>

        <h2 className="text-4xl font-bold text-pink-500 mb-8">
          Rs {product.price}
        </h2>

        <button className="bg-rose-500 hover:bg-rose-600 px-8 py-4 rounded-2xl text-lg font-semibold transition duration-300">
          Add To Cart
        </button>

      </div>

    </div>

  </div>
)};


export default ProductDetail;