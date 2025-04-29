import { useState } from 'react';
import { Calendar, Clock, MapPin, BedDouble, Search, User, CheckCircle, ChevronRight } from 'lucide-react';

export default function HospitalLandingPage() {
  const [isStarted, setIsStarted] = useState(false);

  const handleStartClick = () => {
    // In a real application, navigate to hospital selection page
    console.log("Navigate to hospital selection page");
    // Example: history.push('/hospitals/select');
    setIsStarted(true);
    setTimeout(() => {
      alert("Navigating to hospital selection page");
    }, 500);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-700 to-blue-500 py-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Hospital Bed Booking Service</h1>
          <p className="text-xl text-blue-100 mb-8">Find and book available hospital beds in your preferred location</p>
          {!isStarted ? (
            <button 
              onClick={handleStartClick}
              className="px-8 py-3 bg-white text-blue-700 rounded-md font-semibold hover:bg-blue-50 transition-colors shadow-lg"
            >
              Start Booking Process
            </button>
          ) : (
            <div className="inline-block px-8 py-3 bg-green-100 text-green-800 rounded-md font-semibold">
              <div className="flex items-center">
                <CheckCircle className="mr-2" size={20} />
                <span>Starting booking process...</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* How It Works */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">How It Works</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <MapPin className="text-blue-600" size={24} />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Select Location</h3>
            <p className="text-gray-600">Choose your preferred state and city to find available hospitals near you.</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <BedDouble className="text-blue-600" size={24} />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Choose Hospital</h3>
            <p className="text-gray-600">Browse hospitals, view available beds and facilities before making your decision.</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <Calendar className="text-blue-600" size={24} />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Book Your Bed</h3>
            <p className="text-gray-600">Select your admission date, provide patient details and confirm your booking.</p>
          </div>
        </div>
      </div>

      {/* Benefits */}
      <div className="bg-gray-100 py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Benefits of Online Booking</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex">
              <div className="mr-4 text-blue-600">
                <CheckCircle size={24} />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Save Time</h3>
                <p className="text-gray-600">No more waiting in queues or making multiple phone calls to check bed availability.</p>
              </div>
            </div>
            
            <div className="flex">
              <div className="mr-4 text-blue-600">
                <CheckCircle size={24} />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Compare Options</h3>
                <p className="text-gray-600">Easily compare hospitals based on availability, facilities, and doctors.</p>
              </div>
            </div>
            
            <div className="flex">
              <div className="mr-4 text-blue-600">
                <CheckCircle size={24} />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Real-time Availability</h3>
                <p className="text-gray-600">Get up-to-date information on bed availability across multiple hospitals.</p>
              </div>
            </div>
            
            <div className="flex">
              <div className="mr-4 text-blue-600">
                <CheckCircle size={24} />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Secure Booking</h3>
                <p className="text-gray-600">Your personal and medical information is handled with the highest security standards.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Ready to find a hospital bed?</h2>
          <p className="text-xl text-gray-600 mb-8">Start the booking process now and secure your hospital bed in just a few clicks.</p>
          
          <button 
            onClick={handleStartClick}
            className="px-8 py-3 bg-blue-600 text-white rounded-md font-semibold hover:bg-blue-700 transition-colors shadow-md flex items-center mx-auto"
          >
            Find Hospitals
            <ChevronRight className="ml-2" size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}