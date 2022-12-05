import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPhoneAlt,
        faUserCircle,
        faChevronRight, 
        faMailBulk, 
        faIdCard, 
        faLaptopFile, 
        faCircle, 
        faClock, 
        faMountainCity,
        faFlag,
        faMoneyBill,
        faCheckDouble,
        faTimesCircle
    } from "@fortawesome/free-solid-svg-icons"
const StudentDetails = ({student}) => {
    return (
        <div className="detail  grid md:grid-cols-2 md:gap-10 gap-5 p-5 md:mt-28 rounded-md   md:m-5 bg-gray-300">
          
        <div>
    
            <h1> <span className="font-bold text-blue-700">  <FontAwesomeIcon icon={faPhoneAlt} color="blue" /> Phone NO</span>
             <span> <FontAwesomeIcon icon={faChevronRight} /> </span>   <span> { student.phoneNo }</span> </h1>
             <br />
             <h1> <span className="font-bold text-blue-700">  <FontAwesomeIcon icon={faUserCircle} color="blue" /> Father Name</span>
             <span> <FontAwesomeIcon icon={faChevronRight} /> </span>   <span> { student.fathername }</span> </h1>
            <br />
            <h1> <span className="font-bold text-blue-700">  <FontAwesomeIcon icon={faMailBulk} color="blue" /> Email </span>
             <span> <FontAwesomeIcon icon={faChevronRight} /> </span>   <span> { student.email }</span> </h1>
             <br />
             <h1> <span className="font-bold text-blue-700">  <FontAwesomeIcon icon={faIdCard} color="blue" /> CNIC </span>
             <span> <FontAwesomeIcon icon={faChevronRight} /> </span>   <span> { student.CNIC }</span> </h1>
             <br />
             <h1> <span className="font-bold text-blue-700">  <FontAwesomeIcon icon={faLaptopFile} color="blue" /> Course </span>
             <span> <FontAwesomeIcon icon={faChevronRight} /> </span>   <span> { student.course }</span> </h1>
        </div>
        <div>
        <h1> <span className="font-bold text-blue-700">  <FontAwesomeIcon icon={faCircle} color="blue" /> Training </span>
             <span> <FontAwesomeIcon icon={faChevronRight} /> </span>   <span> { student.training }</span> </h1>
             <br />
             <h1> <span className="font-bold text-blue-700">  <FontAwesomeIcon icon={faClock} color="blue" /> Duration </span>
             <span> <FontAwesomeIcon icon={faChevronRight} /> </span>   <span> { student.duration }</span> </h1>
             <br />
             <h1> <span className="font-bold text-blue-700">  <FontAwesomeIcon icon={faMountainCity} color="blue" /> City </span>
             <span> <FontAwesomeIcon icon={faChevronRight} /> </span>   <span> { student.city }</span> </h1>
             <br />  
             <h1> <span className="font-bold text-blue-700">  <FontAwesomeIcon icon={faFlag} color="blue" /> Country </span>
             <span> <FontAwesomeIcon icon={faChevronRight} /> </span>   <span> { student.country }</span> </h1>
            <br />
            <h1> <span className="font-bold text-blue-700">  <FontAwesomeIcon icon={faMoneyBill} color="blue" /> Fee </span>
             <span> <FontAwesomeIcon icon={faChevronRight} /> </span>
                <span> { student.feePaid ? <FontAwesomeIcon className="text-red-800" icon={faCheckDouble} /> : <FontAwesomeIcon icon={faTimesCircle} /> } </span>
             </h1>
        </div>

    </div>
    )
}

export default StudentDetails