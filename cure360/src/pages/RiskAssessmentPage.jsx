import { useState } from 'react';
import DiabetesRiskForm from '../component/DiabetesRiskForm';
import HeartDiseaseRiskForm from '../component/HeartDiseaseRiskForm';

export default function RiskAssessmentPage() {
  const [activeForm, setActiveForm] = useState(null);

  const handleBoxClick = (formName) => {
    setActiveForm(formName);
  };

  const handleBackClick = () => {
    setActiveForm(null);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Health Risk Assessment</h1>
      
      {activeForm === null ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div 
            className="bg-blue-100 p-6 rounded-lg shadow-md cursor-pointer hover:bg-blue-200 transition-colors flex flex-col items-center justify-center h-48"
            onClick={() => {window.location.href='https://j5dlzsbfymlpofg4j8jrkh.streamlit.app/'}}
          >
            <h2 className="text-xl font-semibold text-blue-800 mb-2">Diabetes Risk Assessment</h2>
            <p className="text-blue-600 text-center">Evaluate your risk factors for diabetes</p>
          </div>
          
          <div 
            className="bg-red-100 p-6 rounded-lg shadow-md cursor-pointer hover:bg-red-200 transition-colors flex flex-col items-center justify-center h-48"
            onClick={() => handleBoxClick('heart')}
          >
            <h2 className="text-xl font-semibold text-red-800 mb-2">Heart Disease Risk Assessment</h2>
            <p className="text-red-600 text-center">Check your risk factors for heart disease</p>
          </div>
        </div>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <button 
            onClick={handleBackClick}
            className="mb-4 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 mr-2">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Selection
          </button>
          
          {activeForm === 'diabetes' && <DiabetesRiskForm />}
          {activeForm === 'heart' && <HeartDiseaseRiskForm />}
        </div>
      )}
    </div>
  );
}