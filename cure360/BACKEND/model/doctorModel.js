import mongoose from 'mongoose';

const activeAppointment = new mongoose.Schema({
    patientId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    appointmentDate: {
        type: Date,
        required: true
    },
    nextAppointmentDate: {
        type: Date,
    },
    problem: {
        type: String,
        required: true
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
    department: {
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
    listAppointment: [activeAppointment]
}, { timestamps: true });

module.exports = mongoose.model("Doctor", doctorSchema);
