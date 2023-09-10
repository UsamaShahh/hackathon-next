import mongoose from "mongoose";

const blogSchema = mongoose.Schema({

    title: String,
    discription: String,
    fullName: String,
    email: String,
    user_id: String,
    userImg: String
  
},{
    timestamps:true
});

export const BLOGMODEL = mongoose.models.userblogs || mongoose.model("userblogs", blogSchema)