import { useState, useEffect } from 'react';

export default function DiabetesRiskForm() {
  const initialForm = {
    age: '',
    bmi: '',
    waist: '',
    physicalActivity: '',
    fruitIntake: '',
    bloodPressureMeds: '',
    familyHistory: '',
  };

  const [form, setForm] = useState(initialForm);
  const [risk, setRisk] = useState(null);
  const [errors, setErrors] = useState({});
  const [isFormComplete, setIsFormComplete] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [showBmiCalculator, setShowBmiCalculator] = useState(false);
  const [bmiCalc, setBmiCalc] = useState({ weight: '', height: '' });

  // Check if all form fields are filled
  useEffect(() => {
    const values = Object.values(form);
    setIsFormComplete(values.every(value => value !== ''));
  }, [form]);

  // Handle form changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    
    // Clear error for this field if it exists
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // Handle BMI calculator input changes
  const handleBmiCalcChange = (e) => {
    const { name, value } = e.target;
    setBmiCalc(prev => ({ ...prev, [name]: value }));
  };

  // Calculate BMI from weight and height
  const calculateBmi = () => {
    const weight = parseFloat(bmiCalc.weight);
    const height = parseFloat(bmiCalc.height) / 100; // Convert cm to meters
    
    if (weight > 0 && height > 0) {
      const bmiValue = (weight / (height * height)).toFixed(1);
      setForm(prev => ({ ...prev, bmi: bmiValue }));
      setShowBmiCalculator(false);
    }
  };

  // Validate form inputs
  const validateForm = () => {
    const newErrors = {};
    
    if (form.age === '') newErrors.age = 'Age is required';
    else if (parseInt(form.age) < 18 || parseInt(form.age) > 120) newErrors.age = 'Please enter a valid age (18-120)';
    
    if (form.bmi === '') newErrors.bmi = 'BMI is required';
    else if (parseFloat(form.bmi) < 10 || parseFloat(form.bmi) > 70) newErrors.bmi = 'Please enter a valid BMI (10-70)';
    
    if (form.waist === '') newErrors.waist = 'Waist measurement is required';
    else if (parseFloat(form.waist) < 50 || parseFloat(form.waist) > 200) newErrors.waist = 'Please enter a valid waist circumference (50-200 cm)';
    
    if (form.physicalActivity === '') newErrors.physicalActivity = 'Please select an option';
    if (form.fruitIntake === '') newErrors.fruitIntake = 'Please select an option';
    if (form.bloodPressureMeds === '') newErrors.bloodPressureMeds = 'Please select an option';
    if (form.familyHistory === '') newErrors.familyHistory = 'Please select an option';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Calculate risk score
  const calculateRisk = () => {
    if (!validateForm()) return;
    
    let score = 0;
    let breakdown = [];
    
    // Age factor
    if (parseInt(form.age) > 45) {
      score += 2;
      breakdown.push({ factor: 'Age over 45', points: 2 });
    }
    
    // BMI factor
    if (parseFloat(form.bmi) > 25) {
      score += 2;
      breakdown.push({ factor: 'BMI over 25', points: 2 });
    }
    
    // Waist circumference factor - adjust by gender
    const waistValue = parseFloat(form.waist);
    if (waistValue > 94) {
      score += 2;
      breakdown.push({ factor: 'Waist circumference over 94cm', points: 2 });
    }
    
    // Physical activity factor
    if (form.physicalActivity === 'no') {
      score += 2;
      breakdown.push({ factor: 'Low physical activity', points: 2 });
    }
    
    // Fruit and vegetable intake factor
    if (form.fruitIntake === 'no') {
      score += 1;
      breakdown.push({ factor: 'Low fruit/vegetable intake', points: 1 });
    }
    
    // Blood pressure medication factor
    if (form.bloodPressureMeds === 'yes') {
      score += 2;
      breakdown.push({ factor: 'Taking blood pressure medication', points: 2 });
    }
    
    // Family history factor
    if (form.familyHistory === 'yes') {
      score += 3;
      breakdown.push({ factor: 'Family history of diabetes', points: 3 });
    }
    
    // Determine risk level
    let riskLevel;
    let riskColor;
    let recommendations = [];
    
    if (score >= 8) {
      riskLevel = 'High Risk';
      riskColor = 'bg-red-100 border-red-500 text-red-700';
      recommendations = [
        'Consult a healthcare provider soon',
        'Consider getting your blood glucose tested',
        'Focus on improving diet and exercise habits',
        'Monitor other health indicators regularly'
      ];
    } else if (score >= 4) {
      riskLevel = 'Moderate Risk';
      riskColor = 'bg-yellow-100 border-yellow-500 text-yellow-700';
      recommendations = [
        'Consider lifestyle modifications',
        'Increase physical activity',
        'Improve dietary habits',
        'Follow up with regular health checkups'
      ];
    } else {
      riskLevel = 'Low Risk';
      riskColor = 'bg-green-100 border-green-500 text-green-700';
      recommendations = [
        'Maintain healthy lifestyle habits',
        'Continue regular physical activity',
        'Eat balanced meals with plenty of fruits and vegetables',
        'Have routine health checkups'
      ];
    }
    
    setRisk({ 
      level: riskLevel, 
      score, 
      breakdown, 
      color: riskColor,
      recommendations
    });
  };

  // Reset the form
  const resetForm = () => {
    setForm(initialForm);
    setRisk(null);
    setErrors({});
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-blue-800">Diabetes Risk Assessment</h2>
        {risk && (
          <button 
            onClick={resetForm}
            className="text-sm bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-1 rounded"
            aria-label="Reset assessment"
          >
            Reset
          </button>
        )}
      </div>

      <div className="mb-4">
        <p className="text-gray-600 text-sm">
          This tool estimates your risk for type 2 diabetes based on key risk factors.
          <button 
            onClick={() => setShowExplanation(!showExplanation)}
            className="ml-1 text-blue-600 hover:underline focus:outline-none"
            aria-expanded={showExplanation}
          >
            {showExplanation ? 'Hide info' : 'Learn more'}
          </button>
        </p>
        
        {showExplanation && (
          <div className="mt-2 p-3 bg-blue-50 rounded text-sm text-gray-700">
            <p className="font-medium mb-2">About this assessment:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>This is a screening tool, not a medical diagnosis</li>
              <li>Higher scores indicate higher potential risk</li>
              <li>Age over 45, higher BMI, and family history are significant risk factors</li>
              <li>Always consult healthcare professionals for proper evaluation</li>
            </ul>
          </div>
        )}
      </div>

      {!risk ? (
        <div className="space-y-4" role="form" aria-label="Diabetes Risk Assessment Form">
          <div>
            <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1">
              Age (years)
            </label>
            <input 
              id="age"
              name="age" 
              type="number" 
              value={form.age}
              onChange={handleChange}
              className={`w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500 ${errors.age ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="Enter your age" 
              aria-describedby={errors.age ? "age-error" : undefined}
              min="18"
              max="120"
            />
            {errors.age && <p id="age-error" className="mt-1 text-sm text-red-600">{errors.age}</p>}
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label htmlFor="bmi" className="block text-sm font-medium text-gray-700">
                BMI (kg/m²)
              </label>
              <button
                type="button"
                onClick={() => setShowBmiCalculator(!showBmiCalculator)}
                className="text-xs text-blue-600 hover:underline focus:outline-none"
                aria-expanded={showBmiCalculator}
              >
                {showBmiCalculator ? "Hide calculator" : "Calculate BMI"}
              </button>
            </div>
            
            {showBmiCalculator && (
              <div className="mb-3 p-3 bg-gray-50 rounded border border-gray-200">
                <div className="text-xs font-medium text-gray-700 mb-2">BMI Calculator</div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label htmlFor="weight" className="block text-xs text-gray-600">Weight (kg)</label>
                    <input
                      id="weight"
                      name="weight"
                      type="number"
                      value={bmiCalc.weight}
                      onChange={handleBmiCalcChange}
                      className="w-full p-1 text-sm border rounded"
                      placeholder="Weight"
                      min="30"
                      max="300"
                    />
                  </div>
                  <div>
                    <label htmlFor="height" className="block text-xs text-gray-600">Height (cm)</label>
                    <input
                      id="height"
                      name="height"
                      type="number"
                      value={bmiCalc.height}
                      onChange={handleBmiCalcChange}
                      className="w-full p-1 text-sm border rounded"
                      placeholder="Height"
                      min="100"
                      max="250"
                    />
                  </div>
                </div>
                <button
                  onClick={calculateBmi}
                  className="mt-2 w-full py-1 bg-blue-500 hover:bg-blue-600 text-white text-xs rounded"
                  disabled={!bmiCalc.weight || !bmiCalc.height}
                >
                  Calculate
                </button>
              </div>
            )}
            
            <input 
              id="bmi"
              name="bmi" 
              type="number" 
              step="0.1"
              value={form.bmi}
              onChange={handleChange}
              className={`w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500 ${errors.bmi ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="Enter your BMI" 
              aria-describedby={errors.bmi ? "bmi-error" : undefined}
              min="10"
              max="70"
            />
            {errors.bmi && <p id="bmi-error" className="mt-1 text-sm text-red-600">{errors.bmi}</p>}
            <p className="mt-1 text-xs text-gray-500">
              Normal BMI range: 18.5-24.9
            </p>
          </div>

          <div>
            <label htmlFor="waist" className="block text-sm font-medium text-gray-700 mb-1">
              Waist Circumference (cm)
            </label>
            <input 
              id="waist"
              name="waist" 
              type="number" 
              value={form.waist}
              onChange={handleChange}
              className={`w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500 ${errors.waist ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="Measure at belly button level" 
              aria-describedby={errors.waist ? "waist-error" : undefined}
              min="50"
              max="200"
            />
            {errors.waist && <p id="waist-error" className="mt-1 text-sm text-red-600">{errors.waist}</p>}
            <p className="mt-1 text-xs text-gray-500">
              High risk: {'>'}94cm (men), {'>'}80cm (women)
            </p>
          </div>

          <div>
            <label htmlFor="physicalActivity" className="block text-sm font-medium text-gray-700 mb-1">
              Do you get at least 30 minutes of physical activity daily?
            </label>
            <select 
              id="physicalActivity"
              name="physicalActivity" 
              value={form.physicalActivity}
              onChange={handleChange}
              className={`w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500 ${errors.physicalActivity ? 'border-red-500' : 'border-gray-300'}`}
              aria-describedby={errors.physicalActivity ? "activity-error" : undefined}
            >
              <option value="">Please select</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
            {errors.physicalActivity && <p id="activity-error" className="mt-1 text-sm text-red-600">{errors.physicalActivity}</p>}
          </div>

          <div>
            <label htmlFor="fruitIntake" className="block text-sm font-medium text-gray-700 mb-1">
              Do you eat fruits and vegetables daily?
            </label>
            <select 
              id="fruitIntake"
              name="fruitIntake" 
              value={form.fruitIntake}
              onChange={handleChange}
              className={`w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500 ${errors.fruitIntake ? 'border-red-500' : 'border-gray-300'}`}
              aria-describedby={errors.fruitIntake ? "fruit-error" : undefined}
            >
              <option value="">Please select</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
            {errors.fruitIntake && <p id="fruit-error" className="mt-1 text-sm text-red-600">{errors.fruitIntake}</p>}
          </div>

          <div>
            <label htmlFor="bloodPressureMeds" className="block text-sm font-medium text-gray-700 mb-1">
              Have you ever taken medication for high blood pressure?
            </label>
            <select 
              id="bloodPressureMeds"
              name="bloodPressureMeds" 
              value={form.bloodPressureMeds}
              onChange={handleChange}
              className={`w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500 ${errors.bloodPressureMeds ? 'border-red-500' : 'border-gray-300'}`}
              aria-describedby={errors.bloodPressureMeds ? "bp-error" : undefined}
            >
              <option value="">Please select</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
            {errors.bloodPressureMeds && <p id="bp-error" className="mt-1 text-sm text-red-600">{errors.bloodPressureMeds}</p>}
          </div>

          <div>
            <label htmlFor="familyHistory" className="block text-sm font-medium text-gray-700 mb-1">
              Do you have a family history of diabetes?
            </label>
            <select 
              id="familyHistory"
              name="familyHistory" 
              value={form.familyHistory}
              onChange={handleChange}
              className={`w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500 ${errors.familyHistory ? 'border-red-500' : 'border-gray-300'}`}
              aria-describedby={errors.familyHistory ? "family-error" : undefined}
            >
              <option value="">Please select</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
            {errors.familyHistory && <p id="family-error" className="mt-1 text-sm text-red-600">{errors.familyHistory}</p>}
          </div>

          <button 
            type="button"
            onClick={calculateRisk}
            disabled={!isFormComplete}
            className={`w-full py-2 px-4 rounded font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 ${
              isFormComplete 
                ? 'bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500' 
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
            aria-label="Calculate diabetes risk"
          >
            Calculate Risk
          </button>
        </div>
      ) : (
        <div className="space-y-6" role="region" aria-label="Risk Assessment Results">
          <div className={`p-4 border rounded-lg ${risk.color}`}>
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold">Risk Level: {risk.level}</h3>
              <span className="text-lg font-bold">Score: {risk.score}/14</span>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium text-gray-800 mb-2">Risk factors identified:</h4>
            {risk.breakdown.length > 0 ? (
              <ul className="list-disc pl-5 space-y-1">
                {risk.breakdown.map((item, index) => (
                  <li key={index} className="text-gray-700">
                    {item.factor} <span className="font-medium">({item.points} {item.points === 1 ? 'point' : 'points'})</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-700">No significant risk factors identified.</p>
            )}
          </div>
          
          <div>
            <h4 className="font-medium text-gray-800 mb-2">Recommendations:</h4>
            <ul className="list-disc pl-5 space-y-1">
              {risk.recommendations.map((rec, index) => (
                <li key={index} className="text-gray-700">{rec}</li>
              ))}
            </ul>
          </div>
          
          <div className="pt-2 border-t border-gray-200">
            <p className="text-sm text-gray-600 italic">
              Note: This assessment tool provides an estimate of risk based on common factors.
              It is not a diagnosis. Please consult a healthcare professional for proper evaluation.
            </p>
          </div>
          
          <button 
            onClick={resetForm}
            className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            aria-label="Take assessment again"
          >
            Take Assessment Again
          </button>
        </div>
      )}
      
      <div className="mt-6 pt-4 border-t border-gray-200 text-xs text-gray-500">
        This tool is for educational purposes only and should not replace professional medical advice.
      </div>
    </div>
  );
}