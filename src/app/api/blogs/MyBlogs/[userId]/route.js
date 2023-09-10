import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { ConnectLink } from '../../../../lib/db';
import { USERMODEL } from '../../../../lib/Model/userSchema';
import { BLOGMODEL } from '../../../../lib/Model/blogSchema';

export async function GET()
{
    let userId = []

    try{

        await mongoose.connect(ConnectLink);
        userId = await USERMODEL.find()
    
        return NextResponse.json({result: userId, success: true}, {status:200})    

    }
    catch(error){
        return NextResponse.json({result: error.message, success: false}, {status:400})    
    }

}
export async function PUT(request, content)
{
    let userData = [];

    await mongoose.connect(ConnectLink)
    userData = await BLOGMODEL.find({user_id: content.params.userId})
    console.log(userData)
    

    let payload = await request.json();
    let payloadId = content.params.userId;

    console.log(payloadId)

    if(!payload.title || !payload.discription)
    {
        return NextResponse.json({result:"fields should'nt be empty", success:false},{status:400})
    }
    else
    {
        return NextResponse.json({result:payload, success:true},{status:200})
    }

}
export function DELETE(request, content)
{
    let id = content.params.id;

    if(id)
    {
        return NextResponse.json({result:"User deleted",success:true},{status:200})
    }
    else
    {
        return NextResponse.json({result:"internal error found", success:false},{status:400})
    }
}