import { useParams, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPencilSquare, faArrowAltCircleLeft } from "@fortawesome/free-solid-svg-icons"
import axios from 'axios'
const CityUpdateStudent = () => {
    const navigate = useNavigate()
    const { id } = useParams()
    
    const [name, setName] = useState("")
    const [fathername, setFathername] = useState("")
    const [email, setEmail] = useState("")
    const [phoneNo, setPhoneno] = useState(0)
    const [training, setTraining] = useState("")
    const [course, setCourse] = useState("")
    const [duration, setDuration] = useState("")
    const [city, setCity] = useState("")
    const [country, setCountry] = useState("")
    const [CNIC, setCNIC] = useState("")
    const [feePaid, setfeepaid] = useState("")
    const [rollno, setRollno] = useState(0)
    const [msg, setMsg] = useState("")

    async function putStudent (e) {
        e.preventDefault()
        let studentFee = true;
        if(feePaid !== "yes") {
            studentFee = false
        }
        console.log(name)
       
        const res = await axios.put(`/update/student/${id}`, {
            name,
            fathername,
            email,
            phoneNo,
            training,
            course,
            duration,
            city,
            country,
            rollno,
            feePaid : studentFee,
            CNIC
        }, {
            headers : {
                "token" : localStorage.getItem("token")
            }
        })
        const data = await res.data
        if(data.error) {
            setMsg(data.error)
        }
        setMsg(data.msg)
    }
    useEffect(() => {
        async function fetchStudent () {
          const res = await axios.get(`/student/${id}`, {
            headers : {
                'token' : localStorage.getItem("token")
            }
          })
          const data = await res.data
          if(data.error) {
            console.log(data.error)
          }
          const student = data.student
          setName(student.name)
          setEmail(student.email)
          setFathername(student.fathername)
          setPhoneno(student.phoneNo)
          setDuration(student.duration)
          setCity(student.city)
          setCountry(student.country)
          setCNIC(student.CNIC)
          setCourse(student.course)
          setTraining(student.training)
          setRollno(student.rollno)
          
        }
        fetchStudent()
    }, [id])
    return ( 
        <div>
            <div className="grid md:grid-cols-3 ">
                <div>
                    <div className="back m-5">
                        <h1> <FontAwesomeIcon onClick={() => navigate(`/student/profile/${id}`)} icon={faArrowAltCircleLeft} className="text-4xl hover:text-yellow-500 cursor-pointer text-blue-800" /> </h1>
                    </div>
                </div>
                <div className="form bg-gray-300 rounded-md p-5 m-5 shadow-md">
                    <div className="head m-3">
                         <h1 className="text-center"> <FontAwesomeIcon icon={faPencilSquare} className="text-blue-800 text-5xl" />  </h1>
                    </div>
                    <div className="notification">
                    {
                        msg &&   <div className="notification w-full p-2 relative  font-bold">
                        <p>{msg}  <i className="absolute right-2 cursor-pointer text-2xl" onClick={() => setMsg("")}>&times;</i></p>
                     
                              </div>
                      }

                    </div>
                    <div className="inputData">
                        <form onSubmit={putStudent}>
                          
                          <label>Name</label> <br />
                                      <input
                                       onChange={(e) => setName(e.target.value)}
                                       value={name}
                                       required type="text" className="input rounded-md w-full h-10 text-black p-2" placeholder="Enter Name" />
                                      <label>Email</label> <br />
                                      <input
                                      onChange={(e) => setEmail(e.target.value)}
                                      value={email}
                                      required type="email" className="input rounded-md w-full h-10 text-black p-2" placeholder="Enter Email" />
                                      <label>Father Name</label> <br />
                                      <input 
                                      onChange={(e) => setFathername(e.target.value)}
                                      value={fathername}
                                      required type="text" className="input rounded-md w-full h-10 text-black p-2" placeholder="Enter Father Name" />
                                      <label>Phone No</label> <br />
                                      <input
                                       onChange={(e) => setPhoneno(e.target.value)} 
                                       value={phoneNo}
                                       required type="Number" className="input rounded-md w-full h-10 text-black p-2" placeholder="Enter Phone No" />
                                      <label>Training</label> <br />
                                      <select onChange={(e) => setTraining(e.target.value)} required className="input w-full rounded-md h-10 text-black p-2" >
                                        <option selected value="onsite" >onsite</option>
                                        <option value="online">online</option>
                                      </select>
                                      <label>Course</label> <br />
                                      <input
                                       onChange={(e) => setCourse(e.target.value)} 
                                       value={course}
                                       required type="text" className="input rounded-md w-full h-10 text-black p-2" placeholder="Enter Course" />
                                    <label>Duration</label> <br />
                            <input
                             onChange={(e) => setDuration(e.target.value)}
                             value={duration}
                            required type="text" className="input rounded-md w-full h-10 text-black p-2" placeholder="Enter Duration" />
                            <label>City</label> <br />
                            <input 
                            onChange={(e) => setCity(e.target.value)}
                            value={city}
                            required type="text" className="input rounded-md w-full h-10 text-black p-2" placeholder="Enter City" />
                            <label>Country</label> <br />
                            <input
                            onChange={(e) => setCountry(e.target.value)}
                            value={country}
                            required type="text" className="input rounded-md w-full h-10 text-black p-2" placeholder="Enter Country" />
                            <label>CNIC</label> <br />
                            <input
                            onChange={(e) => setCNIC(e.target.value)}
                            value={CNIC}
                            required type="text" className="input rounded-md w-full h-10 text-black p-2" placeholder="Enter CNIC" />
                            <div className="mt-3">
                                <label> Is Fee Fully Paid</label>
                                <select className="input w-full rounded-md h-10 text-black p-2" onChange={(e) => setfeepaid(e.target.value)}>
                                    <option value="yes">yes</option>
                                    <option value="no">no</option>
                                </select>
                                </div>
                            <button type="submit" className="w-full h-10 py-2 bg-blue-700 text-white font-bold rounded-md mt-3">Update</button>    
                        </form>
                    </div>
                </div>
                <div></div>
            </div>
        </div>
    )
}

export default CityUpdateStudent