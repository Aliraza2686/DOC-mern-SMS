import React from 'react'
import Navbar from './blocks/Navbar'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLock, faArrowCircleLeft } from '@fortawesome/free-solid-svg-icons'

const SuperLogin = () => {
      const [email, setEmail] = useState('')
      const [password, setPassword] = useState('')
      const [msg, setMsg] = useState('')
      const navigate = useNavigate()

   
    async function submitForm (e) {
        console.log(email, password, msg)
        e.preventDefault()
       const res = await axios.post('/super/admin/login', {
        email,
        password
       })
       const data = await res.data
       if(data.error) {
        setMsg(data.error)
       }
       else {
        const token = data.token
        localStorage.setItem("token", token)
        navigate('/super/dashboard')
       }
    }
    const removeMsg = () => {
      setMsg('')
    }
  return (
    <div>
        <Navbar />
           <div className="container md:m-5 md:p-5 grid md:grid-cols-3">
                 <div className="first">
                   <h3 className='text-4xl cursor-pointer hover:text-yellow-500' onClick={() => navigate('/')}> <FontAwesomeIcon icon={faArrowCircleLeft} color="blue" /> </h3>
                 </div>
                 <div className="mid">
                   <div className=' bg-blue-600 mt-10 md:mt-0 text-white p-5 h-full'>
                   <div className="form">
                         <h1 className='text-center text-4xl'>Login <i><FontAwesomeIcon icon={faLock} color="yellow" /></i> </h1>
                       { msg &&
                              <div className="notification relative top-1 p-3">
                              <p>{msg} <i className='absolute right-3 cursor-pointer hover:text-yellow-400' onClick={removeMsg}>&times;</i> </p>
                              
                          </div>
                       }
                         <form className='m-3' onSubmit={submitForm}>
                            <label > Email</label>
                            <input type="email" required className='h-10 w-full p-2 text-black'  placeholder='Please Enter Email'
                             onChange={(e) => setEmail(e.target.value)}
                            /><br />
                            <label> Password</label>
                            <input type="password" required   className='h-10 text-black w-full p-2' placeholder='Please Enter Password'
                             onChange={(e) => setPassword(e.target.value)}
                            /><br />
                            <button className='w-full bg-yellow-400 text-blue-800 py-2 mt-4 hover:bg-blue-200 ' type='submit'>Login</button>
                         </form>
                     </div>
                   </div>
                  
                 </div>
                 <div className="last"></div>
           </div>
       </div>
  )
}

export default SuperLogin