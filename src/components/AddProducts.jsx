import React, { useState } from 'react';
import axios from 'axios';

const AddProduct = () => {

  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: '',
    fabric: ''
  });

  const [image, setImage] = useState(null);

  // text fields handle
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // image handle
  const handleImage = (e) => {
    setImage(e.target.files[0]);
  };

  // form submit
  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const token = localStorage.getItem('token');

      const data = new FormData();

      data.append('name', formData.name);
      data.append('price', formData.price);
      data.append('category', formData.category);
      data.append('fabric', formData.fabric);
      data.append('image', image);

      const response = await axios.post(
        'http://localhost:8000/api/products/add',
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      console.log(response.data);

      alert('Product Added Successfully');

    } catch (error) {

      console.log(error);

      alert('Error adding product');
    }
  };
  // delete function
  const handleDelete = async (id) => {

  try {

    const token = localStorage.getItem("token");

    await axios.delete(
      `http://localhost:8000/api/products/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    alert("Product Deleted");

    setProducts(
      products.filter((product) => product._id !== id)
    );

  } catch (error) {

    console.log(error);

    alert("Delete failed");
  }
};

  return (

    <div className="flex justify-center items-center min-h-screen bg-[#090D16] text-white">

  <form
    onSubmit={handleSubmit}
    className="bg-[#111827] p-8 rounded-xl w-[400px] shadow-lg"
  >

    <h1 className="text-3xl font-bold mb-6 text-center">
      Add Product
    </h1>

    <input
      type="text"
      name="name"
      placeholder="Product Name"
      onChange={handleChange}
      className="w-full p-3 mb-4 rounded bg-[#1F2937] border border-gray-600 outline-none"
    />

    <input
      type="number"
      name="price"
      placeholder="Price"
      onChange={handleChange}
      className="w-full p-3 mb-4 rounded bg-[#1F2937] border border-gray-600 outline-none"
    />

    <input
      type="text"
      name="category"
      placeholder="Category"
      onChange={handleChange}
      className="w-full p-3 mb-4 rounded bg-[#1F2937] border border-gray-600 outline-none"
    />

    <input
      type="text"
      name="fabric"
      placeholder="Fabric"
      onChange={handleChange}
      className="w-full p-3 mb-4 rounded bg-[#1F2937] border border-gray-600 outline-none"
    />

    <input
      type="file"
      onChange={handleImage}
      className="w-full mb-5"
    />

    <button
      type="submit"
      className="w-full bg-rose-400 hover:bg-pink-600 p-3 rounded font-semibold"
    >
      Add Product
    </button>

  </form>

</div>
)};
export default AddProduct;