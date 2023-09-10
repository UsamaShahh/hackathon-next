'use client'
import '../../../style.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Link from 'next/link';
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation'


export default function Page() {

    const route = useRouter()

    let [user, setuser] = useState({
        email: "",
        password: "",

    })


    // let [email, setEmail] = useState("");
    // let [password, setPassword] = useState("");

    const handleChange = (e) => {
        // console.log(e.target.name)
        setuser({ ...user, [e.target.name]: e.target.value })


    }


    const signInUser = async _ => {

        console.log(user.email, user.password)

        const axios = require('axios');

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'http://localhost:3000/api/user/login',
            headers: {
                'Content-Type': 'application/json'
            },
            data :user
        };

        axios.request(config)
            .then((response) => {
                console.log(response.data.data);
                alert(response.data.message)
                localStorage.setItem("user_id",response.data.data._id)
                route.push(`/Components/blogs/home/${response.data.data._id}`)

            })
            .catch((error) => {
                console.log(error);
            });


    }

    return (

        <div className='signup-bg'>

            {/* NAVBAR START */}

            <div className='navbg'>
                <div className='container'>
                    <h3 className='navTab'>Personal Blogging App</h3>
                    <Link href="/Components/user/signUp" className='navLogin'> <h3>SignUp</h3> </Link>
                </div>
            </div>

            {/* NAVBAR END */}

            {/* SIGNUP HEADER START */}

            <div className='subHeader'>

                <div className='container container-bd'>
                    <h1 className=''> SignIn </h1>
                </div>

            </div>

            {/* SIGNUP HEADER END */}

            {/* SIGNUP FORM START */}

            <div className='form-bg pt-5 pb-5' style={{ marginTop: '70px' }}>

                <input type='email' placeholder='Enter your email' name='email' className='input-field' value={user.email} onChange={(e) => { handleChange(e) }} />
                <input type='password' placeholder='Enter your password' name='password' className='input-field' value={user.password} onChange={(e) => { handleChange(e) }} />
                <button className='signUp-btn' onClick={signInUser}>SignIn</button>

            </div>


            {/* SIGNUP FORM END */}


        </div>

    )
}