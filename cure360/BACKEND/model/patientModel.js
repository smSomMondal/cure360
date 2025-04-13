import mongoose from 'mongoose';

const appointment = new mongoose.Schema({
    doctorId: {
        type: mongoose.Schema.ObjectId,
        ref: "Doctor",
        required: true
    },
    date: {
        type: Date,
        require: true
    },
    appDocId:{
        type: mongoose.Schema.ObjectId,
        ref: "Doctor",
        required: true
    },
    state: {
        type: String,
        default: 'active',
        enum: ['active', 'accept', 'cancel', 'close']
    }
}, { _id:true,timestamps: true });

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
    appointmentRequest: activeAppointment,
    pastAppointment:[activeAppointment],

}, { timestamps: true });

module.exports = mongoose.model("Patient", patientSchema);
