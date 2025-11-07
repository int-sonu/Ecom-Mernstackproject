import React from "react";
import { assets } from "../assets/assets";

const AboutPage = () => {
  return (
    <div className="pt-[120px] bg-gray-50 min-h-screen text-gray-800">
      <section className="bg-gradient-to-r from-gray-900 via-gray-800 to-black text-white py-16 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">About Us</h1>
        <p className="text-gray-300 text-lg max-w-2xl mx-auto">
          Discover who we are, what we stand for, and how we bring style, comfort, and confidence to you — every single day.
        </p>
      </section>

     <section className="max-w-6xl mx-auto px-6 lg:px-20 py-16 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
  <div>
    <h2 className="text-3xl font-semibold mb-4 text-gray-900">Our Story</h2>
    <p className="text-gray-700 leading-relaxed mb-4">
      <span className="font-semibold text-pink-600">Neva</span> began with a simple idea — to create fashion that feels timeless and true. 
      What started as a small studio with a love for design has grown into a brand trusted for quality, comfort, and creativity.
    </p>
    <p className="text-gray-700 leading-relaxed">
      From everyday wear to elegant pieces, each design reflects our passion for craftsmanship and our belief that fashion should make you feel confident and inspired.
    </p>
  </div>

  <div className="flex justify-center">
    <img
      src={assets.banner1}
      alt="Our Story"
      className="rounded-2xl shadow-2xl w-full md:w-4/5 object-cover"
    />
  </div>
</section>


      <section className="bg-pink-50 py-16">
        <div className="max-w-6xl mx-auto px-6 lg:px-20 text-center">
          <h2 className="text-3xl font-semibold mb-6 text-gray-900">Our Mission</h2>
          <p className="text-gray-700 leading-relaxed max-w-3xl mx-auto">
            We aim to empower every individual to express their unique identity through fashion.  
            By blending modern trends with uncompromising comfort and quality,  
            <span className="font-semibold text-pink-600"> Neva </span> strives to make confidence wearable.
          </p>
        </div>
      </section>

     
      <section className="bg-gray-900 text-white py-16 text-center">
        <h2 className="text-3xl font-semibold mb-4">Join Our Fashion Journey</h2>
        <p className="text-gray-300 mb-6">
          Be part of the <span className="text-pink-500 font-semibold">Neva</span> community and redefine your style with us.
        </p>
        <a
          href="/contact"
          className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded-full font-medium transition-colors"
        >
          Contact Us
        </a>
      </section>
    </div>
  );
};

export default AboutPage;
