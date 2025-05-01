import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const notify = mongoose.Schema({
    info:{
        type:String
    }
},{timestamps:true})
const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            unique: true,
            required: true,
        },
        phone: {
            type: String,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            default: "patient",
            enum: ["admin", "hospital", "doctor", "patient"],
        },
        dateOfBirth: {
            type: Date,
        },
        verified: {
            type: Boolean,
            default: false,
        },
        notificationHistory:[notify],
        typeId: {
            type: mongoose.Schema.ObjectId,
        },
    },
    {
        timestamps: true,
    }
);
userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});
userSchema.methods.comparePassword = async function (pass) {
    return await bcrypt.compare(pass, this.password);
};
export default mongoose.model("User", userSchema);
