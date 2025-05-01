import mongoose from 'mongoose';

const activeAppointment = new mongoose.Schema({
    patientId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Patient'
    },
    PatInfo: {
        name: {
            type: String,
            required: true
        },
        age: {
            type: Number,
            required: true
        },
        gender: {
            type: String,
        }
    },
    appointmentDate: {
        type: Date,
        required: true
    },
    nextDate: {
        type: Date,
    },
    problem: {
        type: String,
        required: true
    },
    appDocId: {
        type: mongoose.Schema.ObjectId,
        ref: "Doctor",
        required: true
    },
    peAppId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    state: {
        type: String,
        default: 'active',
        enum: ['active', 'accept', 'close']
    }
}, { _id: true, timestamps: true });

const doctorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    degree: {
        type: [String],
        required: true,
        default: []
    },
    experience: {
        type: Number,
        required: true
    },
    docLicence: {
        type: String,
        required: true
    },
    docLicenceUrl: {
        type: String,
        required: true
    },
    varification: {
        type: String,
        default: "pending",
        enum: ["pending", "accept", "reject"]
    },
    specialization: {
        type: String,
        required: true,
        enum: [
            "Cardiology",
            "Neurology",
            "Pediatrics",
            "Orthopedics",
            "Gynecology",
            "Oncology",
            "Dermatology",
            "Psychiatry",
            "Radiology",
            "General Medicine",
            "ENT",
            "Urology",
            "Gastroenterology",
            "Nephrology"
        ]
    },
    address: {
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
    },
    listAppointment: [activeAppointment]
}, { timestamps: true });

export default mongoose.model("Doctor", doctorSchema);
