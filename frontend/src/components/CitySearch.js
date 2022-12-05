import { useParams } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCheck, faTimes, faUsers, faArrowAltCircleLeft } from "@fortawesome/free-solid-svg-icons"
import {useState, useEffect} from 'react'
import { useNavigate } from "react-router-dom"
import axios from "axios"

const CitySearch = () => {
    const {term} = useParams()
    const [students, setStudents] = useState([])
    const [noResult, setNoResult] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        async function fetchStudents () {
           const res = await axios.get(`/search/students/${term}`,{
            headers : {
                'token' : localStorage.getItem("token")
             }
           })
           const data = await res.data
           console.log(data)
           if(data.noResult) {
            return setNoResult(data.noResult)
           }
           setStudents(data.students)
        }
        fetchStudents()
    }, [term])
    return (
       <div className="grid md:grid-cols-3 ">
           <div className="searchside w-full  text-white">
               <div className="m-5 p-3">
                     <h1 className="md:my-5 my-2 text-3xl cursor-pointer" onClick={() => navigate('/city/dashboard')}> <FontAwesomeIcon icon={faArrowAltCircleLeft} color="yellow" /> </h1>
                    <h1 className="text-3xl font-bold">Your Search Results For The Name</h1>
                    <br />
                    <h1 className="text-center text-2xl md:text-7xl text-yellow-400 font-bold md:my-5">" {term} "</h1>
                    <br />
                    <h1 className="my-5">These Results Are Based On Search Term Matching With The Name Of Each Student</h1>
                    <div className="md:my-8  hover:bg-blue-800 md:p-5 p-2 rounded-md shadow-lg  bg-red-600 " >
                  
                           <h1 className="font-bold ">       <FontAwesomeIcon icon={faUsers} color="yellow" />  Matching Students</h1>
                          <br />
                          <h1 className="font-bold ">{students.length}</h1>
                    </div>
               </div>
           </div>
          {noResult ? <div className="m-5 p-5 w-full noResult">

             <div className="text-center text-3xl  bg-blue-700 text-white p-5 rounded-md ">
                <h1>No Student Found With This Name</h1>
             </div>
          </div> :   <div className="search col-span-2 ">
         
         <div>
    
        <div className="flex flex-col shadow-md">
            
        <div className="overflow-x-auto">
          <div className="p-1.5 w-full inline-block align-middle">
            <div className="overflow-hidden border rounded-lg">
           
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-4 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                    >
                      Roll No
                    </th>
                    <th
                      scope="col"
                      className="px-1 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-1 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                    >
                      Training
                    </th>
                    <th
                      scope="col"
                      className=" py-3 text-xs font-bold text-left  text-gray-500 uppercase "
                    >
                      Fee
                    </th>
                    <th
                      scope="col"
                      className="px-2 py-3 text-xs font-bold text-center text-gray-500 uppercase "
                    >
                      Operations
                    </th>
                    
                  </tr>
                </thead>
                <tbody className="devided-y divide-gray-200">
                    {students && 
                      students.map((student) => 
                        <tr key={student.id}>
                            <td className="px-4 py-4 text-sm font-medium text-gray-800 whitespace-nowrap" >
                                {student.rollno}
                            </td>
                            <td className="px-2 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                                 {student.name}
                            </td>
                            <td className="px-2 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                                 {student.training}
                            </td>
                            <td className="px-2 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                                 {student.feePaid ? <FontAwesomeIcon icon={faCheck} color="red" /> : <FontAwesomeIcon icon={faTimes} color="black" />}
                            </td>
                            <td className="px-2 text-center py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                                 {
                                    <button
                                     onClick={() => navigate(`/student/profile/${student._id}`)}
                                    className="bg-blue-700 text-white px-10 rounded-md hover:bg-red-600 ">View </button>
                                 }
                            </td>
                        </tr>
                      )
                    }
                
                </tbody>
              </table>
        
            </div>
          </div>
        </div>
       
               <div></div>
      </div>
      </div>
        </div>}
       </div> 
    )
}
  
export default CitySearch