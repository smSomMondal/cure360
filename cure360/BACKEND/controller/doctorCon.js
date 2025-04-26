import Doctor from '../model/doctorModel.js';
import User from '../model/userModel.js' // Adjust the path based on your structure
import Patient from '../model/patientModel.js';
import mongoose from 'mongoose';
// Create a new doctor
const addDoctor = async (req, res) => {
    try {

        if (req.user._id) {
            const {
                name,
                age,
                degree,
                department,
                address,
            } = req.body;

            const newDoctor = new Doctor({
                name,
                age,
                degree,
                department,
                address,
            });

            const saveDocroe = await newDoctor.save();
            const user = await User.findOne({ _id: req.user._id });

            user.typeId = saveDocroe._id;
            await user.save();
            const newUser = await User.findOne({ _id: req.user._id }).select("-password");


            res.status(201).json({
                success: true,
                message: "Patient created successfully",
                data: {saveDocroe,newUser}
            });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: error.message
        });
    }
};

const getDoctor = async (req, res) => {
    try {

        const { city, state, department } = req.body;
        const query = {};
        if (city) query['address.city'] = city;
        if (state) query['address.state'] = state;
        if (department){
            query.specialization = department;
        } else{
            query.specialization = 'General Medicine';
        }

        const doctors = await Doctor.find(query).select('-listAppointment');

        // res.status(200).json(doctors);
        res.status(200).json({
            success: true,
            message: "Doctor list fetched successfully",
            data: doctors
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: error.message
        });
    }
}

const appointList = async (req, res) => {
    try {
        const { doctorId } = req.body;
        if (!doctorId) {
            return res.status(400).json({
                success: false,
                message: "doctorId is required",
            });
        }

        const doctor = await Doctor.findById(doctorId).select('listAppointment');

        if (!doctor) {
            return res.status(404).json({
                success: false,
                message: "Doctor not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Doctor appointment list fetched successfully",
            data: doctor.listAppointment
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: error.message
        });
    }

}

const approvedAppointment = async (req, res) => {
    try {
        const { appointmentId, doctorId } = req.body;
        if (!appointmentId || !doctorId) {
            return res.status(400).json({
                success: false,
                message: "appointmentId and doctorId are required",
            });
        }

        const doctor = await Doctor.findById(doctorId);

        if (!doctor) {
            return res.status(404).json({
                success: false,
                message: "Doctor not found",
            });
        }

        const appointment = doctor.listAppointment.find(app => app._id.toString() === appointmentId);

        if (!appointment) {
            return res.status(404).json({
                success: false,
                message: "Appointment not found",
            });
        }

        appointment.state = "approved";
        await doctor.save();

        let patient = await Patient.findById(appointment.peAppId).select('appointmentRequest');
        if (!patient) {
            return res.status(404).json({
                success: false,
                message: "Patient not found",
            });
        }

        patient.appointmentRequest.state = 'approved';
        await patient.save();

        res.status(200).json({
            success: true,
            message: "Appointment approved successfully",
            data: appointment,
            data2:patient
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: error.message
        });
    }

}

const appointCantList = async (req, res) => {
    try {
        const { appointmentId, doctorId } = req.body;
        if (!appointmentId || !doctorId) {
            return res.status(400).json({
                success: false,
                message: "appointmentId and doctorId are required",
            });
        }

        const doctor = await Doctor.findById(doctorId);

        if (!doctor) {
            return res.status(404).json({
                success: false,
                message: "Doctor not found",
            });
        }

        const appointment = doctor.listAppointment.find(app => app._id.toString() === appointmentId);

        if (!appointment) {
            return res.status(404).json({
                success: false,
                message: "Appointment not found",
            });
        }

        appointment.state = "cancelled";
        await doctor.save();

        let patient = await Patient.findById(appointment.peAppId).select('appointmentRequest');
        if (!patient) {
            return res.status(404).json({
                success: false,
                message: "Patient not found",
            });
        }

        patient.appointmentRequest.state = 'cancelled';
        await patient.save();

        res.status(200).json({
            success: true,
            message: "Appointment approved successfully",
            data: appointment,
            data2:patient
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: error.message
        });
    }

}

export { addDoctor , getDoctor,appointList,approvedAppointment,appointCancel};