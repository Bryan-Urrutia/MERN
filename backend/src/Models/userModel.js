import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    google_id: { type: String },
    microsoft_id: { type: String },
    name: { type: String, required: true, minlength: 3, maxlength: 30 },
    email: { type: String, require: true, minlength: 3, maxlength: 200, unique: true },
    password: { type: String, require: true, minlength: 3, maxlength: 1024 },
}, { timestamps: true })

const userModel = mongoose.model("User", userSchema);

export default userModel;