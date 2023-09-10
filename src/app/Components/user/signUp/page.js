'use client'
import '../../../style.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Link from 'next/link';
import { useState, useEffect } from "react";

export default function Page() {

    let [user, setuser] = useState({

        firstName: "",
        lastName: "",
        email: "",
        password: "",
        repeatPassword: "",
        userImg: "https://assets.stickpng.com/images/585e4bf3cb11b227491c339a.png"

    })


    // let [firstName, setFirstName] = useState("");
    // let [lastName, setLastName] = useState("");
    // let [email, setEmail] = useState("");
    // let [password, setPassword] = useState("");
    // let [repeatPassword, setRepeatPassword] = useState("");

    const handleChange = (e) => {
        // console.log(e.target.name)
        setuser({ ...user, [e.target.name]: e.target.value })


    }


    const signUpUser = async _ => {

        console.log(user.firstName, user.lastName, user.email, user.password, user.repeatPassword, user.userImg)

        const axios = require('axios');

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'http://localhost:3000/api/user/signUp',
            headers: {
                'Content-Type': 'application/json'
            },
            data: user
        };

        axios.request(config)
            .then((response) => {
                console.log(response.data.data);
                alert(response.data.message)
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
                    <Link href="/Components/user/login" className='navLogin'> <h3>Login</h3> </Link>
                </div>
            </div>

            {/* NAVBAR END */}

            {/* SIGNUP HEADER START */}

            <div className='subHeader'>

                <div className='container container-bd'>
                    <h1 className=''> SignUp </h1>
                </div>

            </div>

            {/* SIGNUP HEADER END */}

            {/* SIGNUP FORM START */}

            <div className='form-bg pt-5 pb-5' style={{ marginTop: '70px' }}>

                <input type='text' placeholder='Enter your first name' name='firstName' className='input-field' value={user.firstName} onChange={(e) => { handleChange(e) }} />
                <input type='text' placeholder='Enter your last name' name='lastName' className='input-field' value={user.lastName} onChange={(e) => { handleChange(e) }} />
                <input type='email' placeholder='Enter your email' name='email' className='input-field' value={user.email} onChange={(e) => { handleChange(e) }} />
                <input type='password' placeholder='Enter your password' name='password' className='input-field' value={user.password} onChange={(e) => { handleChange(e) }} />
                <input type='password' placeholder='Re-enter your Password' name='repeatPassword' className='input-field' value={user.repeatPassword} onChange={(e) => { handleChange(e) }} />
                <button className='signUp-btn' onClick={signUpUser}>SignUp</button>

            </div>


            {/* SIGNUP FORM END */}


        </div>

    )
}
export const Input = ({ type, placeholder, value, name, handleChange }) => {
    return (
        <input className='border-2 '
            value={value}
            onChange={(e) => handleChange(e)}
            type={type} placeholder={placeholder} name={name} />
    )
}
