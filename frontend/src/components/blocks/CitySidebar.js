import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUserCircle, faPowerOff, faPlusCircle} from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"

const CitySidebar = ({toggleSidebar}) => {
    const navigate = useNavigate()
    const [admin, setAdmin] = useState({})
    //functions
    const logout = () => {
        localStorage.setItem("token", "")
        navigate('/')
    }

    useEffect(() => {
       async function fetchAdmin () {
           const res = await axios.get('/current/admin', {
            headers : {
                'token' : localStorage.getItem("token")
            }
           })
           const data = await res.data
           setAdmin(data.admin)
        }
        fetchAdmin()
    })
  return (
    <div  className="citysidebar fixed  w-full md:w-60 text-white h-full">
        <div className="container">
            <div className="admin p-1">
           
            
          
                <div className="grid grid-cols-3 gap-10">
                 <div>
                 <i className="text-5xl"> <FontAwesomeIcon icon={faUserCircle} color="yellow" /></i>
                 </div>
                     <div className="mt-5">
                        <h1>{admin.name}</h1>
                     </div>
                     <div className="mt-5 cursor-pointer hover:text-blue-500 text-yellow-500" onClick={toggleSidebar}>
                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M3 4.5h14.25M3 9h9.75M3 13.5h9.75m4.5-4.5v12m0 0l-3.75-3.75M17.25 21L21 17.25" />
</svg>

                     </div>
                     </div>
                     
            </div>
             <div className="line">
                
             </div>
            <div className="links p-3 rounded-md m-2  grid gap-5">
                <div
                 onClick={() => navigate('/city/add/student')}
                className="bg-yellow-500 rounded-md text-black p-3 hover:bg-blue-500 hover:text-white cursor-pointer">
                    <h1> <FontAwesomeIcon icon={faPlusCircle} />  Add Student</h1>
                </div>
                <div className="csl rounded-md text-white p-3 hover:bg-blue-500 hover:text-white cursor-pointer ">
                    <h1>Link 1</h1>
                </div>
                <div className="csl rounded-md text-white p-3 hover:bg-blue-500 hover:text-white cursor-pointer">
                    <h1>Link 1</h1>
                </div>
                <div className="csl rounded-md text-white p-3 hover:bg-blue-500 hover:text-white cursor-pointer">
                    <h1>Link 1</h1>
                </div>
                <div className="csl rounded-md text-white p-3 hover:bg-blue-500 hover:text-white cursor-pointer">
                    <h1>Link 1</h1>
                </div>
                <div className="csl rounded-md text-white p-3 hover:bg-blue-500 hover:text-white cursor-pointer">
                    <h1>Link 1</h1>
                </div>
                <div className="csl rounded-md text-white p-3 hover:bg-blue-500 hover:text-white cursor-pointer">
                    <h1>Link 1</h1>
                </div>
            </div>
            <div className="logout  p-3">
                <div className="bg-red-500 p-3 rounded-md text-white text-center hover:bg-blue-500 cursor-pointer" onClick={logout}>
                    <h1>
                        <i> <FontAwesomeIcon icon={faPowerOff} color="white" /> </i>
                        Logout</h1>
                </div>
            </div>
        </div>
    </div>
  )
}

export default CitySidebar
