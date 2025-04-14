import React, { useState, useEffect } from 'react';

const GPSTracker = () => {
  const [position, setPosition] = useState(null);
  const [address, setAddress] = useState('Locating...');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [apiKey, setApiKey] = useState('fa2c8b33c6514702a1d7922b3386af6c'); // Add your OpenCage API key here

  useEffect(() => {
    // Check if geolocation is supported by the browser
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      setLoading(false);
      return;
    }

    // Get current position
    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        setPosition({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
          timestamp: position.timestamp
        });
        
        // Reverse geocoding with OpenCage
        reverseGeocode(position.coords.latitude, position.coords.longitude);
        setLoading(false);
      },
      (error) => {
        let errorMessage;
        switch(error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = "User denied the request for geolocation";
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = "Location information is unavailable";
            break;
          case error.TIMEOUT:
            errorMessage = "The request to get user location timed out";
            break;
          case error.UNKNOWN_ERROR:
            errorMessage = "An unknown error occurred";
            break;
          default:
            errorMessage = "Error: " + error.message;
        }
        setError(errorMessage);
        setLoading(false);
      },
      {
        enableHighAccuracy: true, 
        timeout: 5000,
        maximumAge: 0
      }
    );

    // Cleanup function to stop watching location
    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, []);

  // Function to reverse geocode using OpenCage
  const reverseGeocode = async (latitude, longitude) => {
    if (!apiKey) {
      setAddress('Please provide an OpenCage API key');
      return;
    }

    try {
      const response = await fetch(
        `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}&language=en`
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.results && data.results.length > 0) {
        setAddress(data.results[0].formatted);
      } else {
        setAddress('No address found for this location');
      }
    } catch (error) {
      console.error('Error fetching address:', error);
      setAddress('Error fetching address');
    }
  };

  // Function to handle API key input
//   const handleApiKeyChange = (e) => {
//     setApiKey(e.target.value);
//     if (position) {
//       reverseGeocode(position.latitude, position.longitude);
//     }
//   };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md mt-4">
      <h2 className="text-xl font-bold mb-4">GPS Tracker</h2>
      
      {/* API Key Input */}
      {/* <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          OpenCage API Key:
        </label>
        <input 
          type="text" 
          value={apiKey} 
          onChange={handleApiKeyChange} 
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter your OpenCage API key"
        />
        <p className="text-xs text-gray-500 mt-1">
          Get a key at: opencagedata.com
        </p>
      </div> */}

      {loading ? (
        <div className="flex items-center justify-center py-4">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : error ? (
        <div className="text-red-500 py-2">{error}</div>
      ) : position ? (
        <div>
          <div className="bg-gray-100 p-4 rounded-md mb-4">
            <h3 className="font-semibold mb-2">Current Location:</h3>
            <p className="text-sm mb-1">
              <strong>Address:</strong> {address}
            </p>
            <p className="text-sm mb-1">
              <strong>Latitude:</strong> {position.latitude.toFixed(6)}
            </p>
            <p className="text-sm mb-1">
              <strong>Longitude:</strong> {position.longitude.toFixed(6)}
            </p>
            <p className="text-sm">
              <strong>Accuracy:</strong> {position.accuracy.toFixed(2)} meters
            </p>
          </div>
          
          <div className="text-right">
            <span className="text-xs text-gray-500">
              Last updated: {new Date(position.timestamp).toLocaleTimeString()}
            </span>
          </div>
          
          {/* Map Link */}
          <a 
            href={`https://www.openstreetmap.org/?mlat=${position.latitude}&mlon=${position.longitude}#map=16/${position.latitude}/${position.longitude}`}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full text-center mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded transition duration-200"
          >
            View on Map
          </a>
        </div>
      ) : (
        <div className="text-gray-500">Waiting for location data...</div>
      )}
    </div>
  );
};

export default GPSTracker;