import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-[#F3EFE0] pt-16 pb-8 border-t border-black/5">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* TOP SECTION: LOGO & LINKS */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-16">
          
          {/* BRAND SIDE: Logo and Name on ONE LINE */}
          <div className="flex items-center gap-4 flex-nowrap min-w-max">
            {/* Replace 'logo.png' with your actual logo file path */}
            <img 
              src="/logo.png" 
              alt="Ark Growth Logo" 
              className="h-12 w-auto mix-blend-multiply" 
            />
            <span className="font-playfair text-2xl uppercase tracking-tighter whitespace-nowrap text-[#1A1A1A]">
              Ark Growth
            </span>
          </div>

          {/* QUICK LINKS SIDE */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-12">
            <div>
              <h4 className="text-xs uppercase tracking-widest text-[#B8860B] font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-[#5E5E5E]">
                <li><a href="/" className="hover:text-[#B8860B] transition-colors">Home</a></li>
                <li><a href="/about" className="hover:text-[#B8860B] transition-colors">About</a></li>
                <li><a href="/services" className="hover:text-[#B8860B] transition-colors">Services</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs uppercase tracking-widest text-[#B8860B] font-bold mb-4">Contact</h4>
              <ul className="space-y-2 text-sm text-[#5E5E5E]">
                <li><a href="mailto:info@arkgrowth.com" className="hover:text-[#B8860B] transition-colors">Email Us</a></li>
                <li><a href="/contact" className="hover:text-[#B8860B] transition-colors">Inquiry</a></li>
              </ul>
            </div>
          </div>
        </div>

        {/* BOTTOM SECTION: COPYRIGHT */}
        <div className="pt-8 border-t border-black/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[10px] uppercase tracking-[0.3em] text-[#B8860B] font-bold">
            Ark Growth Strategy &copy; 2026
          </p>
          <p className="text-[10px] text-[#5E5E5E] uppercase tracking-widest">
            Strategic Financial Illumination
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
