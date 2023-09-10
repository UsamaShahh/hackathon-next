'use client'
import '../../../../../style.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Link from 'next/link';
import { useState, useEffect } from "react";
// import { useRouter } from 'next/navigation'

export default function Page({params}) {

    let id = params.userId;
    let [userData,SetUserData] = useState([]);

    useEffect(()=>{

        const axioss = require('axios');

        let configs = {
          method: 'get',
          maxBodyLength: Infinity,
          url: 'http://localhost:3000/api/blogs/MyBlogs/usersId',
          headers: { }
        };
        
        axioss.request(configs)
        .then((response) => {
          console.log(response.data.result);

          let userId = response.data.result.filter((item)=>item._id==id)
          console.log(userId)

          SetUserData(userId)
        })
        .catch((error) => {
          console.log(error);
        });


    })

    return (

        <div>

            {/* NAVBAR START */}

            <div className='navbg'>
                <div className='container'>
                    <h3 className='navTab'>Personal Blogging App</h3>
                    <Link href="/Components/user/login" className='navLogin mt-3'> <h5>Logout</h5> </Link>
                    {
                        userData[0] == null ?
                            <h5></h5>
                            :
                            <Link href={`/Components/blogs/myBlogs/${id}/profile`} className='navLogin mt-3'> <p>{userData[0].firstName}</p> </Link>
                    }
                </div>
            </div>

            {/* NAVBAR END */}

            {/* SUBHEADER START */}

            <div className='subHeader'>

                <div className='container container-bd'>
                    <h1 className=''> Profile  </h1>
                </div>

            </div>

            {/* SUBHEADER END */}


        </div>

    )
}