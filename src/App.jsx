import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import AuthForm from "./components/AuthForm"; 
import AddProduct from './components/AddProducts.jsx';
import Products from './components/Produts.jsx'; 
import About from './components/About.jsx';
import ProductDetail from './components/ProductDetail.jsx';


  function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  return (
  <Router>

    <div className="w-full min-h-screen bg-[#090D16] text-white overflow-x-hidden selection:bg-rose-400/20">

      {token && <Navbar />}

      <Routes>

        <Route
          path="/"
          element={
            !token
              ? <AuthForm setToken={setToken} />
              : <Navigate to="/home" />
          }
        />

        <Route
          path="/home"
          element={
            token
              ? <Hero />
              : <Navigate to="/" />
          }
        />
        <Route
     path="/about"
   element={<About />}
    />

        <Route
          path="/add-product"
          element={<AddProduct />}
        />
        <Route
      path="/products"
      element={<Products />}
/>
<Route 
   path="/product/:id"
  
   element={<ProductDetail />}
   />

      </Routes>

    </div>

  </Router>
);
  };
export default App;