import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCheck, faTimes} from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from "react-router-dom"
const CityStudentsTable = ({students}) => {
   const navigate = useNavigate()
    return (
    <div>
    
        <div className="flex flex-col  shadow-2xl rounded-lg">
            
        <div className="overflow-x-auto  ">
          <div className="p-1.5 w-full inline-block align-middle">
            <div className="overflow-hidden  rounded-lg">
           
              <table className="min-w-full divide-y divide-gray-600 student-table">
                <thead className="bg-gray-600">
                  <tr>
                    <th
                      scope="col"
                      className="px-4 py-3 text-xs font-bold text-left text-black uppercase "
                    >
                      Roll No 
                    </th>
                    <th
                      scope="col"
                      className="px-1 py-3 text-xs font-bold text-left text-black placeholder:uppercase "
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-1 py-3 text-xs font-bold text-left text-black uppercase "
                    >
                      Training
                    </th>
                    <th
                      scope="col"
                      className=" py-3 text-xs font-bold text-left  text-black uppercase "
                    >
                      Fee
                    </th>
                    <th
                      scope="col"
                      className="px-2 py-3 text-xs font-bold text-center text-black uppercase "
                    >
                      Operations
                    </th>
                    
                  </tr>
                </thead>
                <tbody className="">
                    { 
                      students.map((student) => 
                        <tr key={student._id}>
                            <td className="px-4 py-4 text-sm font-medium  whitespace-nowrap" >
                                {student.rollno}
                            </td>
                            <td className="px-2 py-4 text-sm font-medium  whitespace-nowrap">
                                 {student.name}
                            </td>
                            <td className="px-2 py-4 text-sm font-medium  whitespace-nowrap">
                                 {student.training}
                            </td>
                            <td className="px-2 py-4 text-sm font-medium whitespace-nowrap">
                                 {student.feePaid ? <FontAwesomeIcon icon={faCheck} color="yellow" /> : <FontAwesomeIcon icon={faTimes} color="black" /> }
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
    )
  }

  export default CityStudentsTable