const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema({
  name: String,
  age: Number,
  gender: String,
  contact: String,
  address: String,
  email: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Patient", patientSchema);

const testSchema = new mongoose.Schema({
    name: String,
    category: {
      type: String,
      enum: [
        'Blood Test',
        'Urine Test',
        'Stool Test',
        'Biopsy',
        'Culture Test',
        'X-Ray',
        'MRI',
        'CT Scan',
        'Ultrasound',
        'ECG',
        'Liver Function Test (LFT)',
        'Kidney Function Test (KFT)',
        'Thyroid Function Test (TFT)',
        'Lipid Profile',
        'CBC', // Complete Blood Count
        'COVID-19 Test',
        'Hormone Test',
        'Allergy Test',
        'Tumor Marker',
        'Genetic Test',
        'Histopathology',
        'Cytology',
      ]
    },
    description: String,
    normalRange: String,
    units: String,
    price: Number
  });
  

module.exports = mongoose.model("Test", testSchema);

const reportSchema = new mongoose.Schema({
  patient: { type: mongoose.Schema.Types.ObjectId, ref: "Patient" },
  tests: [
    {
      test: { type: mongoose.Schema.Types.ObjectId, ref: "Test" },
      result: String,
      status: {
        type: String,
        enum: ["Pending", "Completed"],
        default: "Pending",
      },
    },
  ],
  doctorName: String,
  reportDate: { type: Date, default: Date.now },
  remarks: String,
});

module.exports = mongoose.model("Report", reportSchema);


