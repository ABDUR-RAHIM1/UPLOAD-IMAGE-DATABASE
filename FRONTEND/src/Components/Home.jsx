import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import Card from './Card'
import "./Style.css"

function Home() {
    const [post , setPost] = useState([])
    const [user, setUser] = useState({
        name: '',
        email: "",
        image: "",

    })
    const handleFiileChange = async(e)=>{
        const file = e.target.files[0];
        console.log(file)
        const formData = new FormData()
        formData.append("file", file)
        formData.append("upload_preset", "shopUp")
        formData.append("cloud_name", "dhivoejt4")

        const res = await fetch("https://api.cloudinary.com/v1_1/dhivoejt4/image/upload", {
            method: "POST",
            body: formData
        })
        const data  = await res.json()
         const imgUrl = data.secure_url
        setUser((prevUser) => ({
            ...prevUser,
            image : imgUrl
        }))
    }

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => { 
        if (!user.image) {
           console.log("Field is required ")
        }else{
        
            fetch("http://localhost:9000/upload" , {
                method :"POST",
                headers : {
                    "Content-Type" : "application/json"
                },
                body : JSON.stringify(user)
            })
            .then(res => res.json())
            .then( data => console.log((data)))
        }
        e.preventDefault()
    }
 

    //   fetcch api 


    useEffect(()=>{
        fetch("http://localhost:9000/getImg")
        .then(res =>res.json())
        .then(data => setPost(data.post))
    } ,[post])
    return (
        <div className='container m-auto'>
          
            <h2>Post here</h2>
            <form onSubmit={handleSubmit}>
                <input onChange={handleChange} type="text" name='name' className='form-control mb-3' />
                <input onChange={handleChange} type="email" name='email' className='form-control mb-3' />

                <input onChange={handleFiileChange} type="file" name='img' className='form-control mb-3' />

        <button className='btn btn-success mt-2' type='submit'>Submit</button> 
 
            </form>
 
     <div className="postArea">
          {
              post.map(post => <Card post={post}/>)
          }
     </div>


        </div>
    )
}

export default Home