import { useState } from "react"
import axios from "axios"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowAltCircleLeft } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from "react-router-dom"
const AddStudent = () => {
    const navigate = useNavigate()

    //variable's
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
    const [msg, setMsg] = useState("")

    const submitStudent = async (e) => {
        e.preventDefault()
        let studentFee = true;
       if(feePaid !== "yes") {
          studentFee = false
       }
       
        const res = await axios.post('/add/student', {
            name,
            fathername,
            email,
            phoneNo,
            training,
            course,
            duration,
            city,
            country,
            feePaid : studentFee,
            CNIC
        }, {
            headers : {
                'token' : localStorage.getItem("token")
            }
        })
       const data = await res.data
       if(data.student) {
        setMsg("student has been added")
       }
       console.log(data)
    }
    return (
        <div>
               <div className="addstudent ">
                    <div className="p-5 text-2xl cursor-pointer  md:pl-10">
                        <FontAwesomeIcon icon={faArrowAltCircleLeft} color="blue" onClick={() => navigate('/city/dashboard')} />
                    </div>
                    <div className="add shadow-lg bg-cyan-800 rounded-md p-5 md:m-10 md:my-2">
                      {
                        msg &&   <div className="notification w-full p-2 relative text-white font-bold">
                        <p>{msg}  <i className="absolute right-2 cursor-pointer text-2xl" onClick={() => setMsg("")}>&times;</i></p>
                     
                              </div>
                      }

                        <form 
                        onSubmit={submitStudent}
                        className="p-3 text-white">
                            <div className="grid md:grid-cols-2 gap-5">
                                  <div>
                                  <label>Name</label> <br />
                                      <input
                                       onChange={(e) => setName(e.target.value)}
                                       required type="text" className="input rounded-md w-full h-10 text-black p-2" placeholder="Enter Name" />
                                      <label>Email</label> <br />
                                      <input
                                      onChange={(e) => setEmail(e.target.value)}
                                      required type="email" className="input rounded-md w-full h-10 text-black p-2" placeholder="Enter Email" />
                                      <label>Father Name</label> <br />
                                      <input onChange={(e) => setFathername(e.target.value)} required type="text" className="input rounded-md w-full h-10 text-black p-2" placeholder="Enter Father Name" />
                                      <label>Phone No</label> <br />
                                      <input onChange={(e) => setPhoneno(e.target.value)} required type="Number" className="input rounded-md w-full h-10 text-black p-2" placeholder="Enter Phone No" />
                                      <label>Training</label> <br />
                                      <select onChange={(e) => setTraining(e.target.value)} required className="input w-full rounded-md h-10 text-black p-2" >
                                        <option value="onsite" selected>onsite</option>
                                        <option value="online">online</option>
                                      </select>
                                      <label>Course</label> <br />
                                      <input onChange={(e) => setCourse(e.target.value)} required type="text" className="input rounded-md w-full h-10 text-black p-2" placeholder="Enter Course" />
                                  </div>
                                  <div>
                                  <label>Duration</label> <br />
                            <input
                             onChange={(e) => setDuration(e.target.value)}
                            required type="text" className="input rounded-md w-full h-10 text-black p-2" placeholder="Enter Duration" />
                            <label>City</label> <br />
                            <input 
                            onChange={(e) => setCity(e.target.value)}
                            required type="text" className="input rounded-md w-full h-10 text-black p-2" placeholder="Enter City" />
                            <label>Country</label> <br />
                            <input
                            onChange={(e) => setCountry(e.target.value)}
                            required type="text" className="input rounded-md w-full h-10 text-black p-2" placeholder="Enter Country" />
                            <label>CNIC</label> <br />
                            <input
                            onChange={(e) => setCNIC(e.target.value)}
                            required type="text" className="input rounded-md w-full h-10 text-black p-2" placeholder="Enter CNIC" />
                            <div className="mt-3">
                                <label> Is Fee Fully Paid</label>
                                <select className="input w-full rounded-md h-10 text-black p-2" onChange={(e) => setfeepaid(e.target.value)}>
                                    <option value="yes">yes</option>
                                    <option value="no">no</option>
                                </select>
{/*                               
                            <input onChange={handleCheckbox} required type="checkbox" id="toggle" className="toggle-item" />
                            <label htmlFor="toggle"></label> */}
                            </div>
                                  </div>
                            </div>
                            <button type="submit" className="bg-green-600 my-5 w-full h-10 hover:bg-cyan-600 ">Submit</button>
                        </form>
                    </div>
                    
               </div>
        </div>
    )
}

export default AddStudent