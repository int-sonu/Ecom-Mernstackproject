import React from "react";

const Banner = () => {
  return (
    <div className="overflow-x-hidden">
      <div className="w-full bg-black text-white py-11 text-center">
        <h2 className="text-4xl font-bold mb-3">200+</h2>
        <p className="text-lg">International Brands</p>
      </div>

      <div className="w-full bg-black ml-6 mr-40 text-white flex flex-wrap justify-between md:justify-between items-center gap-10 py-10 px-6">
        <span className="text-2xl font-semibold tracking-widest">VERSACE</span>
        <span className="text-2xl font-semibold tracking-widest">ZARA</span>
        <span className="text-2xl font-semibold tracking-widest">GUCCI</span>
        <span className="text-2xl font-semibold tracking-widest">PRADA</span>
        <span className="text-2xl font-semibold tracking-widest">Calvin Klein</span>
      </div>
    </div>
  );
};

export default Banner;
