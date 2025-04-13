
import mongoose from "mongoose";

const departmentEnum = [
    'Pathology',
    'Radiology',
    'Cardiology',
    'Orthopedics',
    'Neurology',
    'Oncology',
    'Pediatrics',
    'Dermatology',
    'Gynecology',
    'Psychiatry',
    'ENT',
    'General Medicine',
    'Surgery'
];


const facilityEnum = [
    'ICU',
    'Emergency',
    'Pharmacy',
    'Lab',
    'Ambulance',
    'Cafeteria',
    'Operation Theatre',
    'Blood Bank',
    'Radiology Unit',
    'Waiting Area',
    'Parking',
    'Covid Isolation Ward'
];


const bedTypeEnum = [
    'General Ward',
    'Private',
    'ICU',
    'PICU', // Pediatric ICU
    'NICU', // Neonatal ICU
    'HDU',  // High Dependency Unit
    'Emergency',
    'Isolation',
    'Maternity',
    'Day Care'
  ];
  

const bedInfo = new mongoose.Schema({
    Type: {
        type: String,
        required: true,
        enum: bedTypeEnum
    },
    bedNumber: {
        type: String,
        required: true
    },
    maxCapacity: {
        type: Number,
        required: true
    },
}, { _id: true, timestamps: true });

const hospitalSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    registrationNumber: {
        type: String,
        required: true
    },
    contactNumber: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    address: {
        street: {
            type: String,
            required: true,
        },
        city: {
            type: String,
            required: true,
        },
        state: {
            type: String,
            required: true,
        },
        country: {
            type: String,
            required: true,
        },
        pincode: {
            type: String,
            required: true,
        },
        landmark: {
            type: String,
            required: true,
        },
    },
    departments: [{
        type: String,
        enum: departmentEnum
    }],
    facilities: [{
        type: String,
        enum: facilityEnum
    }],
    isActive: {
        type: Boolean,
        default: true
    },
    bedInfo: [bedInfo],
    createdAt: {
        type: Date,
        default: Date.now
    }
},{ timestamps: true });

module.exports = mongoose.model('Hospital', hospitalSchema);
