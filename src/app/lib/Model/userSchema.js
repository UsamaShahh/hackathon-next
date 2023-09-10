import mongoose from "mongoose";

const userSchema = mongoose.Schema({

    firstName: String,
    lastName: String,
    email: String,
    password: String,
    repeatPassword: String,
    userImg: String

});

export const USERMODEL = mongoose.models.users || mongoose.model("users", userSchema)