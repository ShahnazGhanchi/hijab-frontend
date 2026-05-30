import { useEffect, useRef } from "react";
import gsap from "gsap";
import hijabImage from "../assets/hijab.jpg";
const Hero = () => {
  const heroRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Text and Button Animation
      gsap.from(".hero-text", {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.3,
        ease: "power4.out",
      });

      // Image Animation
      gsap.from(".hero-image", {
        x: 50,
        opacity: 0,
        duration: 1.5,
        delay: 0.5,
        ease: "power3.out",
      });
    }, heroRef);

    return () => ctx.revert(); // Cleanup
  }, []);

  return (
    <section ref={heroRef} className="relative min-h-screen flex items-center px-10 pt-20 overflow-hidden">
      <div className="container mx-auto grid md:grid-cols-2 gap-10 items-center">
        
        {/* Left Content */}
        <div className="z-10">
          <h1 className="hero-text text-6xl md:text-8xl font-serif font-bold leading-tight">
            Timeless <br /> 
            <span className="text-rose-400">Elegance</span>
          </h1>
          <p className="hero-text mt-6 text-gray-400 text-lg max-w-md">
            Discover our exclusive collection of premium hijabs, crafted with the finest fabrics for modern grace.
          </p>
          <div className="hero-text mt-10 flex gap-4">
            <button className="px-8 py-3 bg-rose-400 text-slate-950 font-bold rounded-full hover:bg-rose-500 transition-all shadow-lg shadow-rose-400/20">
              Shop Now
            </button>
            <button className="px-8 py-3 border border-rose-400/30 text-rose-400 font-medium rounded-full hover:bg-rose-400/10 transition-all">
              View Lookbook
            </button>
          </div>
        </div>

        {/* Right Content (Image Placeholder) */}
        <div className="hero-image relative flex justify-center">

  <div className="relative w-80 h-[500px] bg-slate-800 rounded-[100px] border border-white/10 overflow-hidden shadow-2xl">

    <img
      src={hijabImage}
      alt="Hijab"
      className="w-full h-full object-cover"
    />

    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60"></div>

  </div>

</div>

          {/* Decorative Circle */}
          <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-rose-400/5 blur-[100px] rounded-full"></div>
        </div>

     

    </section>
  );
};

export default Hero;