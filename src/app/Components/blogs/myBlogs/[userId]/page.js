'use client'
import '../../../../style.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Link from 'next/link';
import { useState, useEffect } from "react";
// import { useRouter } from 'next/navigation'

export default function Page({params}) {

    console.log(params.userId)

    let id = params.userId;
    let [userData,SetUserData] = useState([]);
    let [data, setData] = useState([]);
    let loginUser = userData[0];
    let [currentUser, setCurrentUser] = useState([]);
    let [userImg,setUserImg] = useState("")
    let [userEdit,setUserEdit] = useState(false);

    let [user, setuser] = useState({
        title: "",
        discription: ""

    })


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

                let crntUser = response.data.result.filter((item)=>item.user_id == id)
                setCurrentUser(crntUser)
                console.log(crntUser)

            })
            .catch((error) => {
                console.log(error);
            });

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
              setUserImg(userId[0].userImg)
            })
            .catch((error) => {
              console.log(error);
            });
            

    }, [user])


    const publishBlog = async _ => {

        console.log(user.title, user.discription)

        let userBlog ={

            title: user.title,
            discription: user.discription,
            fullName: `${loginUser.firstName} ${loginUser.lastName}`,
            email: loginUser.email,
            user_id: id,
            userImg: "https://assets.stickpng.com/images/585e4bf3cb11b227491c339a.png"

        }

        const axios = require('axios');
        let data = JSON.stringify({});

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'http://localhost:3000/api/blogs/MyBlogs',
            headers: {
                'Content-Type': 'application/json'
            },
            data: userBlog
        };

        axios.request(config)
            .then((response) => {
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
            });

            setuser({title:"",discription:""})

    }

    const handleChange = (e) => {
        // console.log(e.target.name)
        setuser({ ...user, [e.target.name]: e.target.value })

    }


    const editBlog = (id , index) => {

        // for(let i = 0; i <= currentUser.length; i++)
        // {
        //     setUserEdit(false)
        // }        
        // setUserEdit
        // console.log(index,userEdit)
        

    }
    const deleteBlog = _ => {

    }


    return (
        <div className='signup-bg'>

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
                    <h1 className=''> Dashboard / <Link href={`/Components/blogs/home/${id}`} className='subHeading'>Home</Link> </h1>
                </div>

            </div>

            {/* SUBHEADER END */}

            {/* BODY SECTION START */}

            {/* ----- ADD BLOGS START------ */}
            <div className='container mt-4'>

                <div className='pt-5 pb-5 add-item'>
                    <input type='text' className='input-title' placeholder='Enter Title' name='title' value={user.title} onChange={(e) => { handleChange(e) }} />
                    <textarea cols={92} rows={5} className='dicription-field' placeholder='What is in your mind' name='discription' value={user.discription} onChange={(e) => { handleChange(e) }} />
                    <button className='publish-btn' onClick={publishBlog}>Publish blog</button>
                </div>

            </div>
            {/* ----- ADD BLOGS END -----*/}

            {/* ----- BLOGS List START------ */}
            <div className='container mt-5 '>

                <h5>My Blogs</h5>

                {
                    currentUser.map((v, i) => {

                        return (

                            <div key={i} className='mt-3 pt-3 pb-3 blog-list row'>
                                <div className='col-lg-1'> <img src={userImg} height={60} /> </div>
                                {
                                    currentUser[0] == null ?
                                    <div className='col-lg-4'> {v.title} <br/> <p className='blogs-fonts'> - {v.createdAt} </p> </div>
                                    :
                                    <div className='col-lg-4'> {v.title} <br/> <p className='blogs-fonts'> {currentUser[0].fullName} - {v.createdAt} </p> </div>
                                }
                                <div className='mt-3 col-lg-12 blogs-fonts'>
                                    <p> {v.discription} </p>
                                </div>
                                <div>
                                    <em className='btn-list' onClick={editBlog(v._id , i)}>edit</em>
                                    <em className='btn-list' onClick={deleteBlog(v._id , i)}>delete</em>
                                </div>

                            </div>


                        )
                    })

                }

            </div>
            {/* ----- BLOGS list START----- */}

            {/* BODY SECTION END */}

                <br/><br/>

        </div>
    )
}