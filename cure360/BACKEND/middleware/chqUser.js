import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../model/userModel.js";
import Patient from "../model/patientModel.js";
import Doctor from "../model/doctorModel.js";
import Hospital from "../model/hospitalModel.js";
import expressAsyncHandler from "express-async-handler";
dotenv.config();

const chqProtectedUser = expressAsyncHandler(async (req, res, next) => {
    try {
        let token;

        if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
            try {
                //req.headers.authorization="Bearer" "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2OTE2ZDYzM2YzZDI1MjcyNzAxODk0YyIsImlhdCI6MTcyMDgwNjg3NCwiZXhwIjoxNzIzMzk4ODc0fQ.EnYqKS5FK3F6Pb81P5kyGHWdCeKJSxP_9TiimzORt7Q"
                token = req.headers.authorization.split(" ")[1];
                // console.log(token);

                const decoded = jwt.verify(token, process.env.JWT_SECRET);
                req.user = await User.findById(decoded.id).select("-password");
                next();
            }
            catch (err) {
                res.status(401).json({ message: "Not authorized, token failed" + err.message });
            }
        }
        if (!token) {
            res.status(401).json({ message: "Not authorized, no token" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });

    }

});

const chqProtectedPatient = expressAsyncHandler(async (req, res, next) => {
    try {
        let token;

        if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
            try {
                //req.headers.authorization="Bearer" "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2OTE2ZDYzM2YzZDI1MjcyNzAxODk0YyIsImlhdCI6MTcyMDgwNjg3NCwiZXhwIjoxNzIzMzk4ODc0fQ.EnYqKS5FK3F6Pb81P5kyGHWdCeKJSxP_9TiimzORt7Q"
                token = req.headers.authorization.split(" ")[1];
                console.log(token);
                const decoded = jwt.verify(token, process.env.JWT_SECRET);
                let data = await User.findById(decoded.id).select("-password");
                //console.log(data.typeId._id);

                if (data.role !== 'patient') {
                    return res.status(400).json({
                        massage: "not a patient"
                    })
                }
                data = await Patient.findById(data.typeId);
                //console.log(data);

                req.user = data
                next();
            }
            catch (err) {
                res.status(401).json({ message: "Not authorized, token failed" + err.message });
            }
        }
        if (!token) {
            res.status(401).json({ message: "Not authorized, no token" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });

    }

});

const chqProtectedDoctor = expressAsyncHandler(async (req, res, next) => {
    try {
        let token;

        if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
            try {
                //req.headers.authorization="Bearer" "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2OTE2ZDYzM2YzZDI1MjcyNzAxODk0YyIsImlhdCI6MTcyMDgwNjg3NCwiZXhwIjoxNzIzMzk4ODc0fQ.EnYqKS5FK3F6Pb81P5kyGHWdCeKJSxP_9TiimzORt7Q"
                token = req.headers.authorization.split(" ")[1];
                const decoded = jwt.verify(token, process.env.JWT_SECRET);
                req.user = await Doctor.findById(decoded.id).select("-password");
                next();
            }
            catch (err) {
                res.status(401).json({ message: "Not authorized, token failed" + err.message });
            }
        }
        if (!token) {
            res.status(401).json({ message: "Not authorized, no token" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });

    }

});

const chqProtectedHospital = expressAsyncHandler(async (req, res, next) => {
    try {
        let token;

        if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
            try {
                //req.headers.authorization="Bearer" "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2OTE2ZDYzM2YzZDI1MjcyNzAxODk0YyIsImlhdCI6MTcyMDgwNjg3NCwiZXhwIjoxNzIzMzk4ODc0fQ.EnYqKS5FK3F6Pb81P5kyGHWdCeKJSxP_9TiimzORt7Q"
                token = req.headers.authorization.split(" ")[1];
                const decoded = jwt.verify(token, process.env.JWT_SECRET);
                let data = await User.findById(decoded.id).select("-password");
                //console.log(data.typeId._id);

                if (data.role !== 'hospital') {
                    return res.status(400).json({
                        massage: "not a patient"
                    })
                }
                //data = await Hospital.findById(data.typeId);
                //console.log(data);

                req.user = data
                next();
            }
            catch (err) {
                res.status(401).json({ message: "Not authorized, token failed" + err.message });
            }
        }
        if (!token) {
            res.status(401).json({ message: "Not authorized, no token" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });

    }

});
export { chqProtectedUser, chqProtectedPatient, chqProtectedDoctor, chqProtectedHospital };