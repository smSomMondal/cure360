
import { useState } from "react";
import { calculateHealthScore } from "../component/HealthScore";

export default function HealthCheckPage() {
  const [formData, setFormData] = useState({
    age: "",
    weight: "",
    height: "",
    heartRate: "",
    systolicBP: "",
    diastolicBP: "",
    oxygenLevel: "",
    temperature: "",
    symptoms: "",
    conditions: "",
    smokes: "no",
    drinks: "no",
    anxiety: "no",
    depression: "no",
  });

  const [healthScore, setHealthScore] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const score = calculateHealthScore(formData);
    setHealthScore(score);
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Health Score Check</h1>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { name: "age", label: "Age" },
          { name: "weight", label: "Weight (kg)" },
          { name: "height", label: "Height (cm)" },
          { name: "heartRate", label: "Heart Rate (bpm)" },
          { name: "systolicBP", label: "Systolic BP" },
          { name: "diastolicBP", label: "Diastolic BP" },
          { name: "oxygenLevel", label: "Oxygen Level (%)" },
          { name: "temperature", label: "Temperature (°C)" },
          { name: "symptoms", label: "Symptoms (comma-separated)" },
          { name: "conditions", label: "Existing Conditions (comma-separated)" },
        ].map(({ name, label }) => (
          <div key={name}>
            <label className="block mb-1 text-sm font-medium">{label}</label>
            <input
              type="text"
              name={name}
              value={formData[name]}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
        ))}

        {[
          { name: "smokes", label: "Do you smoke?" },
          { name: "drinks", label: "Do you drink alcohol?" },
          { name: "anxiety", label: "Do you experience anxiety?" },
          { name: "depression", label: "Do you experience depression?" },
        ].map(({ name, label }) => (
          <div key={name}>
            <label className="block mb-1 text-sm font-medium">{label}</label>
            <select
              name={name}
              value={formData[name]}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md"
            >
              <option value="no">No</option>
              <option value="yes">Yes</option>
            </select>
          </div>
        ))}

        <div className="md:col-span-2">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
          >
            Calculate Score
          </button>
        </div>
      </form>

      {healthScore !== null && (
        <div className="mt-6 p-4 rounded-md shadow-md border">
          <h2 className="text-xl font-semibold">Your Health Score: {healthScore}/100</h2>
          <p className="mt-2 text-gray-700">
            {healthScore < 55 ? (
              <span className="text-red-600 font-semibold">Critical – Consider medical attention.</span>
            ) : healthScore < 79 ? (
              <span className="text-yellow-600 font-semibold">Moderate – Keep monitoring your health.</span>
            ) : (
              <span className="text-green-600 font-semibold">Good – Keep it up!</span>
            )}
          </p>
        </div>
      )}
    </div>
  );
}
