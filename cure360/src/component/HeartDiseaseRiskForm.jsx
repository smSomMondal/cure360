import { useState, useEffect } from 'react';

export default function HeartDiseaseRiskForm() {
  const initialForm = {
    age: '',
    sex: '',
    smoker: '',
    diabetes: '',
    systolicBP: '',
    diastolicBP: '',
    cholesterol: '',
    hdl: '',
    familyHistory: '',
    physicalActivity: '',
    bmi: '',
  };

  const [form, setForm] = useState(initialForm);
  const [risk, setRisk] = useState(null);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    if (submitted && Object.keys(validate()).length === 0) {
      calculateRisk();
    }
  }, [form, submitted]);

  const validate = () => {
    const newErrors = {};
    if (!form.age) newErrors.age = 'Age is required';
    else if (form.age < 20 || form.age > 120) newErrors.age = 'Age must be between 20 and 120';
    
    if (!form.sex) newErrors.sex = 'Sex is required';
    if (!form.smoker) newErrors.smoker = 'Smoking status is required';
    if (!form.diabetes) newErrors.diabetes = 'Diabetes status is required';
    
    if (!form.systolicBP) newErrors.systolicBP = 'Systolic BP is required';
    else if (form.systolicBP < 70 || form.systolicBP > 250) 
      newErrors.systolicBP = 'Systolic BP should be between 70 and 250 mm Hg';
    
    if (!form.diastolicBP) newErrors.diastolicBP = 'Diastolic BP is required';
    else if (form.diastolicBP < 40 || form.diastolicBP > 150) 
      newErrors.diastolicBP = 'Diastolic BP should be between 40 and 150 mm Hg';
    
    if (!form.cholesterol) newErrors.cholesterol = 'Total cholesterol is required';
    else if (form.cholesterol < 100 || form.cholesterol > 600) 
      newErrors.cholesterol = 'Cholesterol should be between 100 and 600 mg/dL';
    
    if (form.hdl && (form.hdl < 10 || form.hdl > 120)) 
      newErrors.hdl = 'HDL should be between 10 and 120 mg/dL';
    
    if (!form.familyHistory) newErrors.familyHistory = 'Family history is required';
    if (!form.physicalActivity) newErrors.physicalActivity = 'Physical activity is required';
    
    if (form.bmi && (form.bmi < 10 || form.bmi > 70)) 
      newErrors.bmi = 'BMI should be between 10 and 70';
    
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (submitted) {
      setErrors(validate());
    }
  };

  const handleSubmit = () => {
    setSubmitted(true);
    const formErrors = validate();
    setErrors(formErrors);
    
    if (Object.keys(formErrors).length === 0) {
      calculateRisk();
    }
  };

  const calculateRisk = () => {
    let score = 0;
    
    // Age factor (more granular age ranges)
    if (parseInt(form.age) > 70) score += 4;
    else if (parseInt(form.age) > 60) score += 3;
    else if (parseInt(form.age) > 50) score += 2;
    else if (parseInt(form.age) > 40) score += 1;
    
    // Sex factor (men have higher baseline risk)
    score += form.sex === 'male' ? 1 : 0;
    
    // Smoking (with intensity consideration)
    score += form.smoker === 'heavy' ? 4 : form.smoker === 'moderate' ? 3 : form.smoker === 'light' ? 2 : form.smoker === 'former' ? 1 : 0;
    
    // Diabetes with severity
    score += form.diabetes === 'uncontrolled' ? 3 : form.diabetes === 'controlled' ? 2 : 0;
    
    // Blood pressure (considering both systolic and diastolic)
    if (parseInt(form.systolicBP) > 180) score += 4;
    else if (parseInt(form.systolicBP) > 160) score += 3;
    else if (parseInt(form.systolicBP) > 140) score += 2;
    else if (parseInt(form.systolicBP) > 130) score += 1;
    
    if (parseInt(form.diastolicBP) > 110) score += 3;
    else if (parseInt(form.diastolicBP) > 90) score += 2;
    else if (parseInt(form.diastolicBP) > 80) score += 1;
    
    // Cholesterol factors (with HDL "good" cholesterol consideration)
    if (parseInt(form.cholesterol) > 280) score += 3;
    else if (parseInt(form.cholesterol) > 240) score += 2;
    else if (parseInt(form.cholesterol) > 200) score += 1;
    
    if (form.hdl && parseInt(form.hdl) < 40) score += 1;
    else if (form.hdl && parseInt(form.hdl) > 60) score -= 1; // HDL has protective effect
    
    // Family history
    score += form.familyHistory === 'yes' ? 2 : 0;
    
    // Physical activity (protective)
    score += form.physicalActivity === 'none' ? 1 : form.physicalActivity === 'moderate' ? 0 : -1;
    
    // BMI impact
    if (form.bmi) {
      if (parseInt(form.bmi) > 35) score += 2;
      else if (parseInt(form.bmi) > 30) score += 1;
    }
    
    // Calculate risk level
    let riskLevel;
    let riskPercentage;
    
    if (score >= 10) {
      riskLevel = 'High Risk';
      riskPercentage = '> 20%';
    } else if (score >= 5) {
      riskLevel = 'Moderate Risk';
      riskPercentage = '10-20%';
    } else {
      riskLevel = 'Low Risk';
      riskPercentage = '< 10%';
    }
    
    setRisk({
      level: riskLevel,
      score: score,
      percentage: riskPercentage,
      factors: getRiskFactors(form, score)
    });
  };
  
  const getRiskFactors = (formData, score) => {
    const factors = [];
    
    if (parseInt(formData.age) > 50) factors.push('Age over 50');
    if (formData.sex === 'male') factors.push('Male sex');
    if (['light', 'moderate', 'heavy'].includes(formData.smoker)) factors.push('Smoking');
    if (['controlled', 'uncontrolled'].includes(formData.diabetes)) factors.push('Diabetes');
    if (parseInt(formData.systolicBP) > 130) factors.push('Elevated blood pressure');
    if (parseInt(formData.cholesterol) > 200) factors.push('Elevated cholesterol');
    if (formData.hdl && parseInt(formData.hdl) < 40) factors.push('Low HDL cholesterol');
    if (formData.familyHistory === 'yes') factors.push('Family history of heart disease');
    if (formData.physicalActivity === 'none') factors.push('Physical inactivity');
    if (formData.bmi && parseInt(formData.bmi) > 30) factors.push('Obesity');
    
    return factors;
  };

  const resetForm = () => {
    setForm(initialForm);
    setRisk(null);
    setErrors({});
    setSubmitted(false);
  };

  const getRiskColor = () => {
    if (!risk) return 'bg-gray-100';
    switch (risk.level) {
      case 'High Risk': return 'bg-red-100 border-red-300';
      case 'Moderate Risk': return 'bg-yellow-100 border-yellow-300';
      case 'Low Risk': return 'bg-green-100 border-green-300';
      default: return 'bg-gray-100';
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-center text-blue-800 mb-6">Heart Disease Risk Assessment</h1>
      
      <div className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          {/* Basic Information */}
          <div className="col-span-2">
            <h2 className="text-lg font-semibold text-blue-700 mb-2">Personal Information</h2>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
            <input 
              name="age" 
              type="number" 
              value={form.age}
              className={`w-full px-3 py-2 border rounded-md ${errors.age ? 'border-red-500' : 'border-gray-300'}`}
              onChange={handleChange}
            />
            {errors.age && <p className="text-red-500 text-xs mt-1">{errors.age}</p>}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Sex</label>
            <select 
              name="sex" 
              value={form.sex}
              className={`w-full px-3 py-2 border rounded-md ${errors.sex ? 'border-red-500' : 'border-gray-300'}`}
              onChange={handleChange}
            >
              <option value="">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            {errors.sex && <p className="text-red-500 text-xs mt-1">{errors.sex}</p>}
          </div>
          
          {/* Health Behaviors */}
          <div className="col-span-2 mt-2">
            <h2 className="text-lg font-semibold text-blue-700 mb-2">Health Behaviors</h2>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Smoking Status</label>
            <select 
              name="smoker" 
              value={form.smoker}
              className={`w-full px-3 py-2 border rounded-md ${errors.smoker ? 'border-red-500' : 'border-gray-300'}`}
              onChange={handleChange}
            >
              <option value="">Select</option>
              <option value="never">Never Smoked</option>
              <option value="former">Former Smoker</option>
              <option value="light">Light Smoker</option>
              <option value="moderate">Moderate Smoker</option>
              <option value="heavy">Heavy Smoker</option>
            </select>
            {errors.smoker && <p className="text-red-500 text-xs mt-1">{errors.smoker}</p>}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Physical Activity</label>
            <select 
              name="physicalActivity" 
              value={form.physicalActivity}
              className={`w-full px-3 py-2 border rounded-md ${errors.physicalActivity ? 'border-red-500' : 'border-gray-300'}`}
              onChange={handleChange}
            >
              <option value="">Select</option>
              <option value="none">No Regular Exercise</option>
              <option value="moderate">Moderate (1-3 days/week)</option>
              <option value="active">Active (4+ days/week)</option>
            </select>
            {errors.physicalActivity && <p className="text-red-500 text-xs mt-1">{errors.physicalActivity}</p>}
          </div>
          
          {/* Medical Conditions */}
          <div className="col-span-2 mt-2">
            <h2 className="text-lg font-semibold text-blue-700 mb-2">Medical Conditions</h2>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Diabetes Status</label>
            <select 
              name="diabetes" 
              value={form.diabetes}
              className={`w-full px-3 py-2 border rounded-md ${errors.diabetes ? 'border-red-500' : 'border-gray-300'}`}
              onChange={handleChange}
            >
              <option value="">Select</option>
              <option value="no">No Diabetes</option>
              <option value="controlled">Controlled Diabetes</option>
              <option value="uncontrolled">Uncontrolled Diabetes</option>
            </select>
            {errors.diabetes && <p className="text-red-500 text-xs mt-1">{errors.diabetes}</p>}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Family History of Heart Disease</label>
            <select 
              name="familyHistory" 
              value={form.familyHistory}
              className={`w-full px-3 py-2 border rounded-md ${errors.familyHistory ? 'border-red-500' : 'border-gray-300'}`}
              onChange={handleChange}
            >
              <option value="">Select</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
            {errors.familyHistory && <p className="text-red-500 text-xs mt-1">{errors.familyHistory}</p>}
          </div>
          
          {/* Biometric Measurements */}
          <div className="col-span-2 mt-2">
            <h2 className="text-lg font-semibold text-blue-700 mb-2">Biometric Measurements</h2>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Systolic BP (mm Hg)</label>
            <input 
              name="systolicBP" 
              type="number" 
              value={form.systolicBP}
              placeholder="e.g., 120"
              className={`w-full px-3 py-2 border rounded-md ${errors.systolicBP ? 'border-red-500' : 'border-gray-300'}`}
              onChange={handleChange}
            />
            {errors.systolicBP && <p className="text-red-500 text-xs mt-1">{errors.systolicBP}</p>}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Diastolic BP (mm Hg)</label>
            <input 
              name="diastolicBP" 
              type="number" 
              value={form.diastolicBP}
              placeholder="e.g., 80"
              className={`w-full px-3 py-2 border rounded-md ${errors.diastolicBP ? 'border-red-500' : 'border-gray-300'}`}
              onChange={handleChange}
            />
            {errors.diastolicBP && <p className="text-red-500 text-xs mt-1">{errors.diastolicBP}</p>}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Total Cholesterol (mg/dL)</label>
            <input 
              name="cholesterol" 
              type="number" 
              value={form.cholesterol}
              placeholder="e.g., 180"
              className={`w-full px-3 py-2 border rounded-md ${errors.cholesterol ? 'border-red-500' : 'border-gray-300'}`}
              onChange={handleChange}
            />
            {errors.cholesterol && <p className="text-red-500 text-xs mt-1">{errors.cholesterol}</p>}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">HDL Cholesterol (mg/dL)</label>
            <input 
              name="hdl" 
              type="number" 
              value={form.hdl}
              placeholder="e.g., 50 (optional)"
              className={`w-full px-3 py-2 border rounded-md ${errors.hdl ? 'border-red-500' : 'border-gray-300'}`}
              onChange={handleChange}
            />
            {errors.hdl && <p className="text-red-500 text-xs mt-1">{errors.hdl}</p>}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">BMI</label>
            <input 
              name="bmi" 
              type="number" 
              value={form.bmi}
              placeholder="e.g., 24 (optional)"
              className={`w-full px-3 py-2 border rounded-md ${errors.bmi ? 'border-red-500' : 'border-gray-300'}`}
              onChange={handleChange}
            />
            {errors.bmi && <p className="text-red-500 text-xs mt-1">{errors.bmi}</p>}
          </div>
        </div>
        
        <div className="flex gap-4 mt-6">
          <button 
            onClick={handleSubmit} 
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-200"
          >
            Calculate Risk
          </button>
          <button 
            onClick={resetForm}
            className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-md transition duration-200"
          >
            Reset
          </button>
        </div>
      </div>
      
      {risk && (
        <div className={`mt-6 p-4 border rounded-md ${getRiskColor()}`}>
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">
              {risk.level}
            </h2>
            <span className="text-lg font-medium">
              {risk.percentage} 10-year risk
            </span>
          </div>
          
          <div className="mt-2">
            <button 
              onClick={() => setShowDetails(!showDetails)}
              className="text-blue-600 hover:text-blue-800 text-sm flex items-center"
            >
              {showDetails ? 'Hide Details' : 'Show Details'}
            </button>
            
            {showDetails && (
              <div className="mt-3 space-y-3">
                <div>
                  <h3 className="font-medium">Risk Score: {risk.score}</h3>
                  <p className="text-sm text-gray-600">Based on the Framingham Risk Score model</p>
                </div>
                
                {risk.factors.length > 0 && (
                  <div>
                    <h3 className="font-medium">Key Risk Factors:</h3>
                    <ul className="list-disc ml-5 text-sm">
                      {risk.factors.map((factor, index) => (
                        <li key={index}>{factor}</li>
                      ))}
                    </ul>
                  </div>
                )}
                
                <div>
                  <h3 className="font-medium">What You Can Do:</h3>
                  <ul className="list-disc ml-5 text-sm">
                    {risk.level === 'High Risk' && (
                      <>
                        <li>Consult with a healthcare provider as soon as possible</li>
                        <li>Consider medication options for high-risk factors</li>
                        <li>Make immediate lifestyle changes</li>
                      </>
                    )}
                    {risk.level === 'Moderate Risk' && (
                      <>
                        <li>Schedule a follow-up with your doctor</li>
                        <li>Focus on improving modifiable risk factors</li>
                        <li>Adopt heart-healthy eating habits</li>
                      </>
                    )}
                    {risk.level === 'Low Risk' && (
                      <>
                        <li>Maintain healthy lifestyle habits</li>
                        <li>Continue regular check-ups</li>
                        <li>Stay physically active</li>
                      </>
                    )}
                    <li>Quit smoking if applicable</li>
                    <li>Maintain a healthy weight</li>
                    <li>Exercise regularly</li>
                  </ul>
                </div>
                
                <div className="text-xs text-gray-500 italic mt-2">
                  Disclaimer: This assessment is for educational purposes only and should not replace professional medical advice.
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      
      <div className="mt-6 text-center text-xs text-gray-500">
        Based on Framingham Heart Study risk factors.
        <br />This tool is for educational purposes only and does not replace professional medical advice.
      </div>
    </div>
  );
}