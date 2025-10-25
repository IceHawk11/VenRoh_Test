import React from "react";
import { Mail, MapPin, Phone } from "lucide-react";

const Contact = () => {
  return (
    <section id="contact" className="py-20 bg-yellow-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-black mb-4">Contact Us</h2>
          <p className="text-black text-lg max-w-2xl mx-auto">
            We’d love to hear from you. Whether you have a question about our services or want to explore partnerships, feel free to reach out.
          </p>
        </div>

        {/* Contact Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-black0 rounded-full flex items-center justify-center mb-4">
              <Phone className="text-white" size={24} />
            </div>
            <h4 className="text-black font-semibold text-lg mb-1">Phone</h4>
            <p className="text-black">+91 7595095983</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center mb-4">
              <Mail className="text-white" size={24} />
            </div>
            <h4 className="text-black font-semibold text-lg mb-1">Email</h4>
            <p className="text-black">admin@venroh.com</p>
          </div>
          
        </div>
       
      </div>
    </section>
  );
};

export default Contact;
