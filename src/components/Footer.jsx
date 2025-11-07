import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-10">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        
        <div>
          <h3 className="text-2xl font-bold text-white mb-3">Neva</h3>
          <p className="text-sm leading-relaxed">
            Redefining fashion with comfort, style, and confidence.  
            Explore our collection to express your true self.
          </p>
        </div>

        <div>
          <h4 className="text-xl font-semibold text-white mb-3">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="/" className="hover:text-pink-400">Home</a></li>
            <li><a href="/about" className="hover:text-pink-400">About Us</a></li>
            <li><a href="/contact" className="hover:text-pink-400">Contact</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xl font-semibold text-white mb-3">Get in Touch</h4>
          <p className="text-sm">+91 98765 43210</p>
          <p className="text-sm">support@neva.com</p>
          <div className="flex justify-center md:justify-start gap-4 mt-4">
            <a href="#" className="hover:text-pink-400">Instagram</a>
            <a href="#" className="hover:text-pink-400">Facebook</a>
            <a href="#" className="hover:text-pink-400">Twitter</a>
          </div>
        </div>
      </div>

     
    </footer>
  );
};

export default Footer;
