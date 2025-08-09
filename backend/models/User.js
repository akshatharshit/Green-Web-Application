import mongoose from "mongoose"

const userSchema= new mongoose.Schema({
    username: {
        type: String,
    },
    email: {
        type: String,
        required: [true, "Email is required"]
    },
    password:{
        type: String,
        required: [true, "Password is required"],
    }
});

const User = mongoose.model("User", userSchema);
export default User;