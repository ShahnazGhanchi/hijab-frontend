import React from "react";
import hijabImage from "../assets/hijab.jpg";

const About = () => {
  return (

    <div className="min-h-screen bg-[#090D16] text-white px-6 py-24">

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">

        {/* Left Side Image */}
        <div className="flex justify-center">

          <img
            src={hijabImage}
            alt="Hijab Fashion"
            className="rounded-3xl shadow-2xl w-full max-w-md object-cover"
          />

        </div>

        {/* Right Side Content */}
        <div>

          <h1 className="text-5xl font-bold mb-6 leading-tight">
            About Our Hijab Store
          </h1>

          <p className="text-gray-300 text-lg leading-8 mb-6">

            Welcome to our Hijab Store — where modesty meets elegance.
            We provide premium quality hijabs crafted with comfort,
            style, and confidence in mind.

          </p>

          <p className="text-gray-400 leading-8 mb-6">

            Our mission is to empower women through fashion that
            reflects beauty, grace, and identity. From chiffon to silk,
            every collection is carefully selected to bring you the
            perfect blend of modern style and tradition.

          </p>

          <button className="bg-pink-500 hover:bg-pink-600 px-6 py-3 rounded-full font-semibold transition">

            Explore Collection

          </button>

        </div>

      </div>

    </div>
  );
};

export default About;