import Patient from '../model/patientModel.js';
import User from '../model/userModel.js' 
import Doctor from '../model/doctorModel.js' 

// Create a new patient
const addPatient = async (req, res) => {
    try {

        if (req.user._id) {
            const {
                name,
                age,
                weight,
                gender,
                height,
                address,
            } = req.body;

            const newPatient = new Patient({
                name,
                age,
                weight,
                gender,
                height,
                address,
            });

            const savedPatient = await newPatient.save();
            const user = await User.findOne({ _id: req.user._id });

            user.typeId = savedPatient._id;
            await user.save();
            const newUser = await User.findOne({ _id: req.user._id }).select("-password");


            res.status(201).json({
                success: true,
                message: "Patient created successfully",
                data: { savedPatient, newUser }
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


export const addAppointmentRequest = async (req, res) => {
    try {
        const { patientId, appDocId, ApplDate, vesiteDate, PatInfo,problem } = req.body;

        if (!patientId || !appDocId || !ApplDate || !vesiteDate || !PatInfo || !problem) {
            return res.status(400).json({
                success: false,
                message: "patientId, appDocId, ApplDate, vesiteDate and PatInfo are required",
            });
        }

        const appointmentRequest = {
            petientId: patientId,
            appDocId,
            ApplDate,
            vesiteDate,
            state: "active",
        };

        const updatedPatient = await Patient.findByIdAndUpdate(
            { _id: patientId },
            { $set: { appointmentRequest } },
            { new: true, runValidators: true }
        );

        if (!updatedPatient) {
            return res.status(404).json({ success: false, message: "Patient not found" });
        }

        const listAppointment = {
            patientId: patientId,
            PatInfo,
            appointmentDate: ApplDate,
            appDocId: appDocId,
            problem,
            peAppId: updatedPatient.appointmentRequest._id,
            state: "active",
        };
        const updatedDocror = await Doctor.findByIdAndUpdate(
            { _id: appDocId },
            { $push: { listAppointment } },
            { new: true, runValidators: true }
        );
        if (!updatedDocror) {
            return res.status(404).json({ success: false, message: "Doctor not found" });
        }
        res.status(200).json({
            success: true,
            message: "Appointment request added successfully",
            data1: updatedPatient,
            data2: updatedDocror,
        });

    } catch (error) {
        console.error("Error adding appointmentRequest:", error);
        res.status(500).json({
            success: false,
            message: "Server error while adding appointment request" + error.message,
        });
    }
};


export { addPatient ,addAppointmentRequest};