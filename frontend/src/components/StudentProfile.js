import { useParams, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlusCircle,  faPencilAlt, faTrashCan} from "@fortawesome/free-solid-svg-icons"
import axios  from 'axios'
import StudentDetails from "./blocks/StudentDetails"
import ProfileSidebar from "./blocks/ProfileSidebar"
import ProfileJumbo from "./blocks/ProfileJumbo"
const StudentProfile = () => {
   const {id} = useParams()
   const [student, setStudent] = useState({})
   const navigate = useNavigate()

   useEffect(() => {
    async function fetchStudent () {
        const res =  await axios.get(`/student/${id}`, {
            headers : {
                'token' : localStorage.getItem("token")
            }
        })
        const data = await res.data
        setStudent(data.student)
    }
      fetchStudent()
   },[id])
    return (
        <div className="j-b">
            
        <div className="grid grid-cols-6">
               <ProfileSidebar student={student} />
             
             <div className="md:col-span-5 col-span-6">
                
                <ProfileJumbo student={student} />
                <div className="block md:hidden mt-20 mb-5 ">
                     { student.feePaid ? <button disabled className="bg-yellow-400 shadow-md px-5 py-1"> <FontAwesomeIcon icon={faPlusCircle} /> Manage Fee </button> : 
                        <button className="bg-yellow-400 hover:bg-black hover:text-white shadow-md px-5 py-1"> <FontAwesomeIcon icon={faPlusCircle} /> Manage Fee </button>
                     } 
                     <button 
                      onClick={() => navigate(`/city/update/student/${id}`)}
                     className="hover:bg-blue-900 shadow-md px-3 py-1 bg-black  "> <FontAwesomeIcon className=" text-white" icon={faPencilAlt} /> </button>
                    <button className="bg-red-600 px-3 py-1  text-white hover:bg-black shadow-md"> <FontAwesomeIcon icon={faTrashCan} /> </button>
                 </div>
                
               <StudentDetails student={student} />
                 
             </div>
             
        </div>
        </div>
    )
}

export default StudentProfile