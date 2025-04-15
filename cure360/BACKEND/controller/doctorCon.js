import Doctor from '../model/doctorModel.js';
import User from '../model/userModel.js' // Adjust the path based on your structure
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
                data: { saveDocroe, newUser }
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

// const updateDoctor=async (req,res)=>{
//     try{

//     }

// };

export { addDoctor , getDoctor};