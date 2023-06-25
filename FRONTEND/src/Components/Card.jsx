import React from 'react'
import "./Style.css"

function Card(props) {
    const {name ,email ,image} = props.post;
  return (
    <div className='card'>
         <h5>Name : {name}</h5>
         <p>Email : {email}</p>
         <img className='cardImg' src={image} alt="" />
    </div>
  )
}

export default Card