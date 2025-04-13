import mongoose from "mongoose";

const testSchema = new mongoose.Schema(
    {
        testType: {
            type: String,
            required: true,
            enum: [
                "Blood Test",
                "Urine Test",
                "Stool Test",
                "Biopsy",
                "Culture Test",
                "X-Ray",
                "MRI",
                "CT Scan",
                "Ultrasound",
                "ECG",
                "Liver Function Test (LFT)",
                "Kidney Function Test (KFT)",
                "Thyroid Function Test (TFT)",
                "Lipid Profile",
                "CBC",
                "COVID-19 Test",
                "Hormone Test",
                "Allergy Test",
                "Tumor Marker",
                "Genetic Test",
                "Histopathology",
                "Cytology",
            ],
        },
        price: {
            type: Number, // ✅ Should be Number
            required: true,
        },
    },
    { _id: false }
);

const testListSchema = new mongoose.Schema(
    {
        patientId: {
            type: mongoose.Schema.ObjectId,
            required: true,
            ref: "Patient",
        },
        testInfo: {
            testType: {
                type: String,
                required: true,
                enum: [
                    "Blood Test",
                    "Urine Test",
                    "Stool Test",
                    "Biopsy",
                    "Culture Test",
                    "X-Ray",
                    "MRI",
                    "CT Scan",
                    "Ultrasound",
                    "ECG",
                    "Liver Function Test (LFT)",
                    "Kidney Function Test (KFT)",
                    "Thyroid Function Test (TFT)",
                    "Lipid Profile",
                    "CBC",
                    "COVID-19 Test",
                    "Hormone Test",
                    "Allergy Test",
                    "Tumor Marker",
                    "Genetic Test",
                    "Histopathology",
                    "Cytology",
                ],
            },
            description: {
                type: String,
                required: true,
            },
        },
        report: {
            type: String,
        },
        status: {
            type: String,
            default: "pending",
            enum: ["pending", "completed", "cancelled", "accepted"],
        },
        reportDate: {
            type: Date,
            default: Date.now,
        },
    },
    { _id: true, timestamps: true } 
);

const pathologySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        regId: {
            type: String,
            required: true,
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
        contact: {
            type: String,
            required: true,
        },
        tests: [testSchema],
        testList: [testListSchema],
    },
    { timestamps: true }
);

export default mongoose.model("Pathology", pathologySchema);
