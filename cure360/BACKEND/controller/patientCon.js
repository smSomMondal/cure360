import Patient from '../model/patientModel.js';
import User from '../model/userModel.js' // Adjust the path based on your structure

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
                data: {savedPatient,newUser}
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

export { addPatient };