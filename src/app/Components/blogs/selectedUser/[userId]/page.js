'use client'
import './../../../../style.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Link from 'next/link';
import { useState, useEffect } from "react";
// import { useRouter } from 'next/navigation'

export default function Page({ params }) {

    let id = params.userId;
    console.log(id)

    let [userName, setUserName] = useState("");
    let [userEmail, setUserEmail] = useState("");
    let [userImg,setUserImg] = useState("")
    let [userData, SetUserData] = useState([]);
    let [data, setData] = useState([]);

    useEffect(() => {

        const axios = require('axios');

        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'http://localhost:3000/api/blogs/MyBlogs',
            headers: {}
        };

        axios.request(config)
            .then((response) => {
                console.log(response.data.result);
                setData(response.data.result)

                let selectedUser = response.data.result.filter((item) => item.user_id == id)

                SetUserData(selectedUser);
                setUserName(selectedUser[0].fullName);
                setUserEmail(selectedUser[0].email);
                setUserImg(selectedUser[0].userImg);

            })
            .catch((error) => {
                console.log(error);
            });

        const axioss = require('axios');

        let configs = {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'http://localhost:3000/api/blogs/MyBlogs/usersId',
            headers: {}
        };

        axioss.request(configs)
            .then((response) => {
                console.log(response.data.result);

            })
            .catch((error) => {
                console.log(error);
            });


    }, [])


    return (

        <div className='signup-bg'>

            {/* NAVBAR START */}

            <div className='navbg'>
                <div className='container'>
                    <h3 className='navTab'>Personal Blogging App</h3>
                    <Link href="/Components/user/login" className='navLogin'> <h3>Login</h3> </Link>
                </div>
            </div>

            {/* NAVBAR END */}

            {/* SUBHEADER START */}

            <div className='subHeader'>

                <div className='container container-bd'>
                    <h1 className=''> <Link href={"http://localhost:3000/"} className='see-more'> {"<"} Back to all blogs </Link> </h1>
                </div>

            </div>

            {/* SUBHEADER END */}

            {/* BODY SECTION START */}

            <div className='' style={{ width: 350, float: 'right', marginTop: 60, padding:30 }}>
                <h5 className='' style={{textAlign:'right'}}> <u> {userEmail} </u> </h5>
                <h1 className='see-more' style={{textAlign:'right'}}> {userName} </h1>
                <img src={userImg} style={{width:250, float: 'right'}} />
            </div>


            <div className='container'>

                <h4 className='mt-2 pt-3 pb-3'> All from {userName} </h4>

            </div>

            <div className='container mt-2 '>

                {
                    userData.map((v, i) => {
                        return (

                            <div key={i} className='mt-3 pt-3 pb-3 blog-list row'>
                                <div className='col-lg-1'> <img src={v.userImg} height={60} /> </div>
                                {
                                    userData[0] == null ?
                                        <div className='col-lg-4'> {v.title} <br /> <p className='blogs-fonts'> {v.fullName} - {v.createdAt} </p> </div>
                                        :
                                        <div className='col-lg-4'> {v.title} <br /> <p className='blogs-fonts'> {v.fullName} - {v.createdAt} </p> </div>
                                }
                                <div className='mt-3 col-lg-12 blogs-fonts'>
                                    <p> {v.discription} </p>
                                </div>

                            </div>


                        )
                    })

                }


            </div> <br /><br /><br />
            {/* ----- BLOGS list START----- */}


            {/* BODY SECTION END */}



        </div>


    )
}