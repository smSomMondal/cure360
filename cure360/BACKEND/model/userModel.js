import mongoose from "mongoose";
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            unique:true,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        role: {
            type: String,
            default: "patient",
            enum :["hospital","doctor","patient"]
        },
        address: {
            type: String,
            validate: {
                validator: function(value) {
                    if (this.role === "user" && !value) {
                        return false;
                    }
                    return true;
                },
                message: 'Address is required for users.'
            }
        },
        typeId:{
            type: mongoose.Schema.ObjectId
        },
        pic:{
            type:String,
            default:"https://icon-library.com/images/no-profile-picture-icon/no-profile-picture-icon-27.jpg"
        },
    },
    {
        timestamps: true
    }
);
userSchema.pre("save", async function(next){
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});
userSchema.methods.comparePassword = async function(pass){
    return await bcrypt.compare(pass, this.password);
}
module.exports = mongoose.model("User", userSchema);