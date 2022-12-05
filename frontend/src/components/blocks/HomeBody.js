import axios from 'axios'
import { useNavigate } from "react-router-dom"
import Navbar from "./Navbar"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faUserAlt, faUserTie } from '@fortawesome/free-solid-svg-icons'
import { faSpinner, faCircleNotch } from '@fortawesome/free-solid-svg-icons'

const HomeBody = () => {
    const navigate = useNavigate()

    async function submitthis() {
    const res = await axios.post('/test', {
        name : "ali"
    })
    const myData = await res.data
    console.log(myData)
}
  
    return (
        <div>
            <Navbar />
            <button onClick={submitthis}>click</button>
            <h3><FontAwesomeIcon icon={faSpinner} color="blue" spin/></h3>
            <h3><FontAwesomeIcon icon={faCircleNotch} color="red" spin/></h3>
            <div className="container grid md:grid-cols-2 gap-10 p-5  md:m-0 md:mt-20 mt-5" >
                 <div className="city md:flex justify-end">
                      <div className="inner relative bg-yellow-400 h-48 md:w-72 w-full rounded-md shadow-lg cursor-pointer hover:bg-yellow-700 hover:text-white"
                       onClick={() => navigate('/city/login')}>
                              <i className='text-4xl absolute top-10 left-32'><h1> <FontAwesomeIcon icon={faUserAlt} color="blue" /> </h1></i>
                              <h1 className=" text-center absolute top-28 left-3 text-3xl">Login As City Admin</h1>
                      </div>
                 </div>
                 <div className="super md:flex justify-start">
                       <div className="iner relative  hover:bg-blue-400 h-48 md:w-72 w-full rounded-md shadow-lg cursor-pointer bg-blue-700 text-white" 
                       onClick={() => navigate('/super/login')}>
                              <i className='text-4xl absolute top-10 left-32'><h1> <FontAwesomeIcon icon={faUserTie} color="white" /> </h1></i>
                              <h1 className="text-center absolute top-28 left-3 text-3xl">Login As Super Admin</h1>
                       </div> 
                 </div>
            </div>
        </div>
    )
}

export default HomeBody