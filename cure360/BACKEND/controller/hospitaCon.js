import Hospital from "../models/hospitalModel.js";
import expressAsyncHandler from "express-async-handler";

const addHospital = expressAsyncHandler(async (req, res) => {   
    try {
        const {
            name,
            registrationNumber,
            contactNumber,
            email,
            address,
        } = req.body;

        // Basic validation
        if (!name || !registrationNumber || !contactNumber || !email) {
            return res.status(400).json({
                success: false,
                message: "Missing required fields: name, registrationNumber, contactNumber, or email"
            });
        }

        if (!address || !address.street || !address.city || !address.state || !address.country || !address.pincode || !address.landmark) {
            return res.status(400).json({
                success: false,
                message: "Incomplete address information"
            });
        }

        const newHospital = new Hospital({
            name,
            registrationNumber,
            contactNumber,
            email,
            address,
            isActive:false,
        });

        const savedHospital = await newHospital.save();
        res.status(201).json({
            success: true,
            message: "Hospital created successfully",
            data: savedHospital
        });

    } catch (error) {
        console.error("Error creating hospital:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
});

const addMultipleBedsToHospital = expressAsyncHandler(async (req, res) => {
    try {
        const { hospitalId } = req.params;
        const { beds } = req.body; // expecting an array of beds

        if (!Array.isArray(beds) || beds.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Request must include a non-empty array of beds"
            });
        }

        // Validate each bed
        for (let bed of beds) {
            const { Type, bedNumber, maxCapacity } = bed;
            if (!Type || !bedNumber || !maxCapacity) {
                return res.status(400).json({
                    success: false,
                    message: "Each bed must include Type, bedNumber, and maxCapacity"
                });
            }
        }

        const hospital = await Hospital.findById(hospitalId);
        if (!hospital) {
            return res.status(404).json({
                success: false,
                message: "Hospital not found"
            });
        }

        // Add all new beds
        hospital.bedInfo.push(...beds);
        await hospital.save();

        res.status(200).json({
            success: true,
            message: "Beds added successfully",
            data: hospital.bedInfo
        });

    } catch (error) {
        console.error("Error adding multiple beds:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
});


const updateMultipleBedNumbers = expressAsyncHandler(async (req, res) => {
    try {
        const { hospitalId } = req.params;
        const { updates } = req.body;

        if (!Array.isArray(updates) || updates.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Request must include a non-empty array of updates"
            });
        }

        const hospital = await Hospital.findById(hospitalId);
        if (!hospital) {
            return res.status(404).json({
                success: false,
                message: "Hospital not found"
            });
        }

        let updatedCount = 0;

        updates.forEach(({ bedId, newBedNumber }) => {
            const bed = hospital.bedInfo.id(bedId);
            if (bed && newBedNumber) {
                bed.bedNumber = newBedNumber;
                updatedCount++;
            }
        });

        if (updatedCount === 0) {
            return res.status(404).json({
                success: false,
                message: "No beds were updated. Check bed IDs or data format."
            });
        }

        await hospital.save();

        res.status(200).json({
            success: true,
            message: `${updatedCount} bed(s) updated successfully.`,
            data: hospital.bedInfo
        });

    } catch (error) {
        console.error("Error updating bed numbers:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
});

const updateHospitalStatus = expressAsyncHandler(async (req, res) => {
    try {
        const { hospitalId } = req.params;
        const { isActive } = req.body;

        if (typeof isActive !== 'boolean') {
            return res.status(400).json({
                success: false,
                message: "`isActive` must be a boolean value (true or false)"
            });
        }

        const updatedHospital = await Hospital.findByIdAndUpdate(
            hospitalId,
            { isActive },
            { new: true }
        );

        if (!updatedHospital) {
            return res.status(404).json({
                success: false,
                message: "Hospital not found"
            });
        }

        res.status(200).json({
            success: true,
            message: `Hospital status updated to ${isActive ? "active" : "inactive"}`,
            data: updatedHospital
        });

    } catch (error) {
        console.error("Error updating hospital status:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
});

const getBedsByLocation = expressAsyncHandler(async (req, res) => {
    try {
        const { state, city } = req.query;

        if (!state || !city) {
            return res.status(400).json({
                success: false,
                message: "Both state and city are required in query parameters"
            });
        }

        const hospitals = await Hospital.find({
            "address.state": state,
            "address.city": city
        });

        if (hospitals.length === 0) {
            return res.status(404).json({
                success: false,
                message: `No hospitals found in ${city}, ${state}`
            });
        }

        res.status(200).json({
            success: true,
            data: hospitals
        });

    } catch (error) {
        console.error("Error fetching beds by location:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
});

export {addHospital, addMultipleBedsToHospital, updateMultipleBedNumbers, updateHospitalStatus, getBedsByLocation};