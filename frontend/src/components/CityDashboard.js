import CitySidebar from "./blocks/CitySidebar"
import CityStudentsTable from "./blocks/CityStudentsTable"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {Bar} from "react-chartjs-2"
import { Chart as ChartJS } from "chart.js/auto"

import { 
        faForwardFast,
        faBackwardFast,
        faForward,
        faBackward,
        faUsers,
        faCheckCircle,
        faSearch,
        faCircleNotch,
        faUserCircle,
        faMountainCity,
        faChevronDown,
        faChair,
        faShoppingCart,
        faSpinner 
       } from "@fortawesome/free-solid-svg-icons"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import axios from 'axios'


const CityDashboard = () => {
    const navigate = useNavigate()
    const [searchTerm, setSearchTerm] = useState("")
    //toggle sidebar
    const [sidebar, setSidebar] = useState(false)
    const [admin, setAdmin] = useState({})
   
    const [students, setStudents] = useState([])
    const [pageNo, setPage] = useState(1)
    const [totalStudents, setTotalStudents] = useState(0)
    const [totalPages, setTotalPages] = useState(0)
    const [allStudents, setAllStudents] = useState([])
    const [spinner, setSpinner] = useState(false)


    //functions
    const toggleSidebar = () => {
        setSidebar(!sidebar)
    }

    const onlineStudents = allStudents.filter((student) => student.training === "online")
    const feePaidBy = allStudents.filter((student) => student.feePaid === true)
    const onsiteStudents = allStudents.filter((student) => student.training !== "online")
    const feeNotPaid = allStudents.filter((st) => st.feePaid !== true)
  
    useEffect(() => {



       async function fetchdata () {
          const res = await axios.get('/current/admin', {
            headers : {
                'token' : localStorage.getItem("token")
            }
          })
          const data = await res.data
          setAdmin(data.admin)
        }


      async  function fetchStudents () {

         setSpinner(true)
          const response = await axios.get(`/all/students/${pageNo}`, {
            headers : {
                'token' : localStorage.getItem("token")
            }
          })
          const data = await response.data
          console.log(data)
          setStudents(data.students)
          setTotalStudents(data.total)
          console.log(data.total)
          setTotalPages(Math.ceil(parseInt(data.total) / 7))
          setAllStudents(data.totalStudents)
          console.log(totalPages)
          setSpinner(false)
        }
        fetchdata()
        fetchStudents()
    }, [pageNo, totalPages])

    const fetchMore = async () => {
      const res = await axios.get(`/all/students/${pageNo}`, {
        headers : {
          'token' : localStorage.getItem("token")
        }
      })
      const data = await res.data
      setStudents(data.students)
      setTotalPages(Math.ceil(parseInt(data.total) / 7))
    }
     // pagination functions 
     const previous = () => {
      console.log('previous')
      let currentPage = pageNo - 1
      setPage(currentPage)
      fetchMore()
     }
     const next = () => {
       console.log('next')
       let currentPage = pageNo + 1
       setPage(currentPage)
       fetchMore()
     }
     const first = () => {
       console.log('first')
       const currentPage = 1
       setPage(currentPage)
       fetchMore()
     }
     const last = () => {
      console.log('last')
      const currentPage = totalPages
      setPage(currentPage)
      fetchMore()
     }
    const goToSearch = (e) => {
      e.preventDefault()
      navigate(`/city/search/${searchTerm}`)
    }
    return (
        <div className="">
            {sidebar && 
              
            <CitySidebar toggleSidebar={toggleSidebar}  />
            }
            <div className="navbar shadow-2xl">
                <div className="navitems grid grid-cols-3 gap-10 p-3 py-3">
                   <div>
                      <h1  className="text-yellow-400 hover:text-yellow-800 cursor-pointer" onClick={toggleSidebar}> 
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M12 17.25h8.25" />
                      </svg>

                      </h1>
                   </div>
                   <div className="">
                      <div className="l">
                         <div className="mylogo mx-2 py-1 px-2 rounded-2xl w-48"> <span className="text-xl text-red-700"> <FontAwesomeIcon icon={faShoppingCart} /> </span> <span className="companyName"> DOC </span> </div>
                      </div>
                   </div>
                   <div className="relative">
                      <div className="prof absolute right-2 hidden md:block">
                      <span className="citymain  shadow-md mx-2 rounded-md px-2 py-2"> <span><FontAwesomeIcon icon={faChair} color="blue" /> </span> <span className="font-bold"> {admin.position} </span>  </span>
                         <span className="citymain shadow-md mr-4 rounded-md px-2 py-2"> <span><FontAwesomeIcon icon={faMountainCity} color="blue" /> </span> <span className="font-bold"> {admin.city} </span>  </span>
                         <span> <span className="mt-2"><FontAwesomeIcon icon={faUserCircle}  className="text-3xl myUser" /></span>  <span className="text-white">{admin.name} <FontAwesomeIcon icon={faChevronDown} className="mx-1" />  </span>  </span>
                      </div>
                   </div>
                </div>
            </div> 
           <div className="content flex flex-col md:grid md:grid-cols-3 gap-10 p-5 ">
               <div className="md:col-span-2 ">
           <div className="grid md:grid-cols-2 gap-10">
              <div className="md:block hidden text-white font-bold">
                {pageNo}/{totalPages}
              </div>
              <div>
              <div className=" flex md:justify-end">
      <form onSubmit={goToSearch}>
         <input onChange={(e) => setSearchTerm(e.target.value)} type="text" required className=" citySearch p-2 rounded-md h-10 w-72" placeholder="Enter Search Term" />
         <button  className="px-8 hover:bg-red-600 py-2 bg-blue-800 text-white rounded-md ml-2"> <FontAwesomeIcon className="text-lg" icon={faSearch} /> </button>
      </form>
    </div>
              </div>
           </div>
            {
            spinner ? <div className="text-center text-red-700 text-3xl p-10"><FontAwesomeIcon icon={faSpinner} spin /></div> : 

              <CityStudentsTable students={students}  />
         
            }
               <div className="pagination p-3 grid grid-cols-3 ">
                 <div></div>
                   <div>
                      <div className="grid grid-cols-4 w-48 text-center ">
                         
                    
                          <div className="text-2xl">
                             {
                              pageNo !== 1 ?  <button onClick={first}><FontAwesomeIcon icon={faBackwardFast} color="blue" /></button> : 
                              <button disabled ><FontAwesomeIcon icon={faBackwardFast} color="white" /></button> 
                             }
                             </div>
              
                          <div className="text-2xl"> 
                            {
                              pageNo <=1 ? <button className="bg-grey-200" onClick={previous} disabled><FontAwesomeIcon icon={faBackward} color="white" /> </button> :
                              <button  onClick={previous}><FontAwesomeIcon icon={faBackward} color="white" /> </button>
                            }

                          </div>
                          <div className="text-2xl">
                            
                            {
                              pageNo >= totalPages ? <button  onClick={next} disabled><FontAwesomeIcon icon={faForward} color="white" /> </button> : 
                              <button  onClick={next}><FontAwesomeIcon icon={faForward} color="white" /> </button>
                           
                            }
                             </div>

                  <div className="text-2xl"> 
                       {
                        pageNo === totalPages ? <button disabled><FontAwesomeIcon icon={faForwardFast} color="white" /></button> : 
                        <button onClick={last}><FontAwesomeIcon icon={faForwardFast} color="white" /></button>
                       }
                   </div>
                          
                     </div>
                   </div>
               </div>
               </div>
               <div className="order-first md:order-last p-3 sideContent shadow-lg  text-white rounded-md">
                   <div className="grid grid-cols-2 gap-5">
                      <div className="hover:bg-blue-600 p-3 noResult rounded-md shadow-lg bg-red-600">
                         <h1>
                          <FontAwesomeIcon icon={faUsers} color="yellow" />
                        <span className="ml-2 font-bold"> Total Students</span> </h1>
                          <h1 className="text-center font-bold">{totalStudents}</h1>
                      </div>
                      <div className="hover:bg-blue-600 rightAnim p-3 rounded-md shadow-lg bg-red-600">
                         <h1>
                          <FontAwesomeIcon icon={faUsers} color="yellow" />
                        <span className="ml-2 font-bold"> Online Students</span> </h1>
                          <h1 className="text-center font-bold">{onlineStudents.length}</h1>
                      </div>
                      <div className="hover:bg-blue-600 p-3 leftAnim rounded-md shadow-lg bg-red-600">
                         <h1>
                          <FontAwesomeIcon icon={faCircleNotch} color="yellow" />
                        <span className="ml-2 font-bold"> Onsite Students</span> </h1>
                          <h1 className="text-center font-bold">{onsiteStudents.length}</h1>
                      </div>
                      <div className="hover:bg-blue-600 p-3 rightAnim rounded-md shadow-lg bg-red-600">
                         <h1>
                          <FontAwesomeIcon icon={faCheckCircle} color="yellow" />
                        <span className="ml-2 font-bold"> Fee Paid By</span> </h1>
                          <h1 className="text-center font-bold">{feePaidBy.length}</h1>
                      </div>
                      
                   </div>
                   <div className="char">
                     
                     <div className="mychar  rounded-md shadow-lg p-3 text-white md:mt-10">
                 
                      
                        <Bar data={ {
                          labels : ["feePaid", "UnPaid", "Online", "OnSite"],
                          datasets: [
                            {
                              label: "Details",
                              data: [feePaidBy.length , feeNotPaid.length, onlineStudents.length, onsiteStudents.length],
                              backgroundColor: [
                                "blue",
                                "yellow",
                                "blue",
                              
                                "yellow",
                              ],
                              borderWidth: 2
                              
                            },
                          ],
                        } }/> 
                       
                     </div>

                   </div>
               </div>
           </div>
        </div>
    )
}

export default CityDashboard