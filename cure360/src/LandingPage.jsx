import React from 'react';
import { Phone, User, Hospital, Ambulance, Beaker, ShoppingBag, ChevronRight, Star, MapPin, Clock, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function HealthServicesLandingPage() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Navigation */}
      <nav className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <div className="text-teal-600 text-2xl font-bold">MediCare+</div>
          </div>
          <div className="hidden md:flex space-x-8">
            <a href="#" className="text-gray-700 hover:text-teal-600 font-medium">Home</a>
            <a href="/Location" className="text-gray-700 hover:text-teal-600 font-medium">Location</a>
            <a href="#" className="text-gray-700 hover:text-teal-600 font-medium">Services</a>
            <a href="#" className="text-gray-700 hover:text-teal-600 font-medium">About</a>
            <a href="#" className="text-gray-700 hover:text-teal-600 font-medium">Doctors</a>
            <a href="#" className="text-gray-700 hover:text-teal-600 font-medium">Contact</a>
          </div>
          <div className="flex items-center space-x-4">
          <Link to="/dashboard">
            <button className="bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-700">
              Sign In
            </button>
          </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-teal-500 to-blue-500 text-white">
        <div className="container mx-auto px-4 py-16 md:py-24 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Your Health is Our Priority</h1>
            <p className="text-xl mb-8">Access quality healthcare services all in one place. From finding doctors to ordering medicine - we've got you covered.</p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <button className="bg-white text-teal-600 px-6 py-3 rounded-md font-medium hover:bg-gray-100">
                Book Appointment
              </button>
              <button className="border border-white text-white px-6 py-3 rounded-md font-medium hover:bg-teal-600">
                Emergency Call
              </button>
            </div>
          </div>
          <div className="md:w-1/2">
            <img src="/api/placeholder/600/400" alt="Healthcare professionals" className="rounded-lg shadow-xl" />
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800">Our Services</h2>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">Comprehensive healthcare solutions to meet all your medical needs in one integrated platform.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Doctors Service */}
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow border-t-4 border-blue-500">
              <div className="bg-blue-100 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                <User size={32} className="text-blue-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Find Doctors</h3>
              <p className="text-gray-600 mb-4">Connect with the best specialists and general physicians in your area. Book appointments online.</p>
              <a href="#" className="text-blue-500 flex items-center font-medium">
                Learn More <ChevronRight size={16} className="ml-1" />
              </a>
            </div>

            {/* Hospital Service */}
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow border-t-4 border-teal-500">
              <div className="bg-teal-100 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                <Hospital size={32} className="text-teal-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Hospital Network</h3>
              <p className="text-gray-600 mb-4">Access our wide network of partnered hospitals and healthcare facilities for your treatment needs.</p>
              <a href="#" className="text-teal-500 flex items-center font-medium">
                Learn More <ChevronRight size={16} className="ml-1" />
              </a>
            </div>

            {/* Ambulance Service */}
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow border-t-4 border-red-500">
              <div className="bg-red-100 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                <Ambulance size={32} className="text-red-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Emergency Ambulance</h3>
              <p className="text-gray-600 mb-4">24/7 ambulance service with trained paramedics for emergency medical transportation.</p>
              <a href="#" className="text-red-500 flex items-center font-medium">
                Learn More <ChevronRight size={16} className="ml-1" />
              </a>
            </div>

            {/* Lab Service */}
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow border-t-4 border-purple-500">
              <div className="bg-purple-100 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                <Beaker size={32} className="text-purple-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Lab Testing</h3>
              <p className="text-gray-600 mb-4">Book diagnostic tests from accredited laboratories with home sample collection option.</p>
              <a href="#" className="text-purple-500 flex items-center font-medium">
                Learn More <ChevronRight size={16} className="ml-1" />
              </a>
            </div>

            {/* Medical Shop Service */}
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow border-t-4 border-green-500">
              <div className="bg-green-100 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                <ShoppingBag size={32} className="text-green-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Medicine Delivery</h3>
              <p className="text-gray-600 mb-4">Order prescription and OTC medicines online with fast home delivery from certified pharmacies.</p>
              <a href="#" className="text-green-500 flex items-center font-medium">
                Learn More <ChevronRight size={16} className="ml-1" />
              </a>
            </div>

            {/* Teleconsultation */}
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow border-t-4 border-amber-500">
              <div className="bg-amber-100 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                <Phone size={32} className="text-amber-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Teleconsultation</h3>
              <p className="text-gray-600 mb-4">Connect with doctors virtually through video calls for convenient healthcare from your home.</p>
              <a href="#" className="text-amber-500 flex items-center font-medium">
                Learn More <ChevronRight size={16} className="ml-1" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800">Why Choose MediCare+</h2>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">We're dedicated to providing the highest quality healthcare with convenience and care.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <CheckCircle size={32} className="text-teal-500 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Verified Professionals</h3>
              <p className="text-gray-600">All our doctors and healthcare providers are certified and thoroughly verified.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <Clock size={32} className="text-teal-500 mb-4" />
              <h3 className="text-lg font-semibold mb-2">24/7 Service</h3>
              <p className="text-gray-600">Round-the-clock service for emergencies and medical consultations whenever you need.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <MapPin size={32} className="text-teal-500 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Wide Coverage</h3>
              <p className="text-gray-600">Extensive network covering multiple locations for your convenience.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <Star size={32} className="text-teal-500 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Quality Assured</h3>
              <p className="text-gray-600">High standards of healthcare with focus on patient satisfaction and outcomes.</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-teal-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to experience better healthcare?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">Download our app or register online to access all our services from anywhere, anytime.</p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <button className="bg-white text-teal-600 px-8 py-3 rounded-md font-medium hover:bg-gray-100">
              Get Started
            </button>
            <button className="border border-white text-white px-8 py-3 rounded-md font-medium hover:bg-teal-700">
              Contact Us
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">MediCare+</h3>
              <p className="text-gray-400">Providing comprehensive healthcare services to improve lives and wellbeing.</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Home</a></li>
                <li><a href="#" className="hover:text-white">About Us</a></li>
                <li><a href="#" className="hover:text-white">Services</a></li>
                <li><a href="#" className="hover:text-white">Doctors</a></li>
                <li><a href="#" className="hover:text-white">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Find Doctors</a></li>
                <li><a href="#" className="hover:text-white">Hospital Network</a></li>
                <li><a href="#" className="hover:text-white">Ambulance Service</a></li>
                <li><a href="#" className="hover:text-white">Lab Testing</a></li>
                <li><a href="#" className="hover:text-white">Medicine Delivery</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
              <ul className="space-y-2 text-gray-400">
                <li>1234 Healthcare Blvd</li>
                <li>Wellness City, WC 56789</li>
                <li>contact@medicare-plus.com</li>
                <li>+1 (555) 123-4567</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} MediCare+. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}