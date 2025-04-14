import Doctor from '../model/doctorModel.js';
import User from '../model/userModel.js' // Adjust the path based on your structure

// Create a new patient
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

export { addDoctor };