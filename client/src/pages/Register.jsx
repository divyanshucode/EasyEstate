import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios';

export default function Register() {
  const[name,setName] = useState('');
  const[email,setEmail] = useState('');
  const[password,setPassword] = useState('');


  async function registerUser(e){
    e.preventDefault();
    try{
      await axios.post('/register',{
        name,
        email,
        password,
      });
      alert('Registered successfully');
    }catch (e){
      alert('Registered failed. Please try again');   
    }
  }
  return (
    <div className='mt-4 grow flex items-center justify-around'>
      <div className='mb-64'>
      <h1 className='text-4xl text-center mb-4'>
        Register
      </h1>
      <form action="" className='max-w-md mx-auto' onSubmit={registerUser}>
        <input type='text' 
              placeholder='John Doe'  
              value={name} 
              onChange={e=>setName(e.target.value)}/>
        <input type='email' 
              placeholder='your@gmail.com' 
              value={email} 
              onChange={e=>setEmail(e.target.value)} />
        <input type='password' 
              placeholder='password' 
              value={password} 
              onChange={e=>setPassword(e.target.value)} />
        <button className='primary'>Register</button>
        <div className='text-center py-2 text-gray-500 '>Already have an account ? <Link to='/login' className='underline text-blue-500'>Login</Link>
          
        </div>

      </form>
    </div>
    </div>
  )
}