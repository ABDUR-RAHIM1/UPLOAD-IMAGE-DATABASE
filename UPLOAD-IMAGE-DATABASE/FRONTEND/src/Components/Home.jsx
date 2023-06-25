import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'

function Home() {
    const [post , setPost] = useState([])
    const [img, setImg] = useState()
    const [user, setUser] = useState({
        name: '',
        email: "",
        image: "",

    })


    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append("file", img)
        formData.append("upload_preset", "shopUp")
        formData.append("cloud_name", "dhivoejt4")

        const res = await fetch("https://api.cloudinary.com/v1_1/dhivoejt4/image/upload", {
            method: "POST",
            body: formData
        })
        const data = await res.json();
         const newImageUrl = data.secure_url;
         ///   update user state and set image link 
        setUser((prevUser) => ({
            ...prevUser,
            image: newImageUrl
        }));
        ///  calll api and post databse
        
        const backendRes = await fetch("http://localhost:9000/upload", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        });
         if (backendRes.ok) {
             console.log("post addedd suuces fully")
         }else{
             console.log("cannot post at this moment")
         }
        

    }
    /// get post 
    useEffect( ()=>{
        fetch("http://localhost:9000/getImg")
        .then(res => res.json())
        .then(data => setPost(data.image))
    } , [])
    return (
        <div className='container m-auto'>
            <h2>Post here</h2>
            <form onSubmit={handleSubmit}>
                <input onChange={handleChange} type="text" name='name' className='form-control' />
                <input onChange={handleChange} type="email" name='email' className='form-control' />

                <input onChange={(e) => {
                    setImg(e.target.files[0])
                }} type="file" name='img' className='form-control mb-3' />

                <button className='btn btn-success mt-2' type='submit'>Submit</button>
            </form>

   <br /> <br /> <br />
            <div className="outputArea mt-4 d-flex align-items-center justify-content-between flex-wrap"> 
              {
                  post.map( post => {
                      return(
                          <div style={{width:"300px", color :"red"}} key={post._id}>
                            <h5>Name : {post.name}</h5>
                            <h5>Email : {post.email}</h5>
                            <img style={{height:"300px"}} src={post.image} alt="" />
                          </div>
                      )
                  })
              }
            </div>
        </div>
    )
}

export default Home