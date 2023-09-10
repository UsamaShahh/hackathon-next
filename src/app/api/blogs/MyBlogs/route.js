import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { ConnectLink } from '../../../lib/db'
import { BLOGMODEL } from '../../../lib/Model/blogSchema'

export async function POST(request, content) {

    await mongoose.connect(ConnectLink).then((val) => {
        console.log("test connect")
    })

    let body = await request.json()


    if (!body.title || !body.discription) {

        return NextResponse.json({
            message: "Missing Required Field"
        })

    }
    else {

        let res = BLOGMODEL(body)
        await res.save()

        return NextResponse.json({
            message: "add new res",
            data: res
        })


    }


    // return NextResponse.json({
    //     message: "test",
    // })

}
export async function GET()
{
    let data = []
 
    try{
        await mongoose.connect(ConnectLink);
        data = await BLOGMODEL.find();
        return NextResponse.json({result:data, success:true},{status:200})

    
    }
    catch(error){

        return NextResponse.json({result: error.message, success:false},{status:400})

    }

}




