import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faNoteSticky, faTrashAlt, faArrowAltCircleLeft, faPencilAlt, faPlusCircle } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from "react-router-dom"
import {useState} from "react"
import axios from "axios"
const ProfileSidebar = ({student}) => {

    const navigate = useNavigate()
    const [deleting, setDeleting] = useState(false)

    const deleteStudent = async () => {
        const res = await axios.delete(`/delete/student/${student._id}`, {
            headers : {
                'token' : localStorage.getItem("token")
            }
        })
        const data = await res.data
        if(data.error) {
            return
        }
        navigate('/city/dashboard')
    }
    return (
        <div className="side hidden md:block ">
        <div className="header p-3 ">
               <p className="text-yellow-400 text-3xl cursor-pointer"
                onClick={() => navigate('/city/dashboard')}
               > <FontAwesomeIcon icon={faArrowAltCircleLeft} /> </p>

        </div>
        <div className="sideprofile p-5 grid grid-cols-1 gap-10">
            <div>
            {student.feePaid ? 
             <button disabled className="bg-yellow-400 font-bold text-blue-900 px-2 py-2 rounded-md w-full"> <FontAwesomeIcon icon={faPlusCircle} /> Fee Management</button> :
               <button onClick={() => navigate(`/fee/management/${student._id}`)} className="font-bold hover:bg-blue-700 hover:text-white text-blue-700  bg-yellow-400 px-2 py-2 rounded-md w-full"><FontAwesomeIcon icon={faPlusCircle} /> Fee Management </button>}
            </div>
            <div className="links p-3 my-2 rounded-md text-white">
              {
                deleting ?  <div className="p-3 noResult bg-yellow-500 my-2 w-full text-black rounded-md"> Are You Sure ? <br /> <br />
              
               <div className="grid grid-cols-2 gap-5">
                   <div>
                       <button
                         onClick={() => setDeleting(false)}
                       className="hover:bg-gray-200 px-3 rounded-md" >No</button>
                   </div>
                   <div> <button 
                    onClick={deleteStudent}
                   className="bg-red-700 px-3 text-white rounded-md font-bold" >Yes</button> </div>
               </div> 
               
             </div> : <div className="hidden"></div>
              }
             <button  onClick={() => setDeleting(true)} className="csl w-full p-3 rounded-sm hover:bg-blue-600">Delete <span> <FontAwesomeIcon icon={faTrashAlt} /> </span></button>
              <br /> <br />
             <button onClick={() => navigate(`/city/update/student/${student._id}`)} className="csl w-full p-3 hover:bg-blue-600">Update Student <span> <FontAwesomeIcon icon={faPencilAlt} /> </span></button>
       
           </div>
            <div className="links p-3 rounded-md text-gray-300 ">
                <h1> <FontAwesomeIcon icon={faNoteSticky} /> <span className="font-bold">Note</span> : </h1>
                <p> If the student fee is fully paid the above Fee Management button will be disabled  </p>
            </div>
          
          
          
        </div>
    </div>
    )
}

export default ProfileSidebar