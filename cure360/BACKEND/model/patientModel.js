import mongoose from 'mongoose';

const appointment = new mongoose.Schema({
    petientId: {
        type: mongoose.Schema.ObjectId,
        ref: "Patient",
        required: true
    },
    ApplDate: {
        type: Date,
        require: true
    },
    vesiteDate: {
        type: Date,
    },
    nextDate: {
        type: Date,
    },
    appDocId: {
        type: mongoose.Schema.ObjectId,
        ref: "Doctor",
        required: true
    },
    state: {
        type: String,
        default: 'active',
        enum: ['active', 'accept', 'cancel', 'close']
    }
}, { _id: true, timestamps: true });

const patientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    weight: {
        type: Number,
        required: true
    },
    gender: {
        type: String,
        required: true,
        default: 'male',
        enum: ['male', 'female', 'other']
    },
    height: {
        type: Number,
        required: true
    },
    address: {
        street: {
            type: String,
        },
        city: {
            type: String,
        },
        state: {
            type: String,
        },
        country: {
            type: String,
        },
        pincode: {
            type: String,
        },
    },
    appointmentRequest: appointment,
    pastAppointment: [appointment],

}, { timestamps: true });

export default mongoose.model("Patient", patientSchema);
