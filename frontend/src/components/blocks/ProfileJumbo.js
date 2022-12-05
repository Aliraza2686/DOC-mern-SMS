import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleChevronRight } from "@fortawesome/free-solid-svg-icons"
const ProfileJumbo = ({student}) => {
    return (
        <div className="profile relative w-full ">
        <div className=" absolute top-20 md:left-10 left-2 grid grid-cols-2 gap-5 md:gap-10 ">
          <div>
              
        <img src="/giphy.gif" alt="" className="w-48 picture shadow-xl rounded-md h-48" srcset="" />
        
          </div>
          <div className="relative">
             <p className="absolute bottom-24"> <button  className="bg-blue-600 j-b  px-3 md:px-5 py-3 shadow-lg "><FontAwesomeIcon icon={faCircleChevronRight} className="text-yellow-300 text-2xl" /> <span className="text-white  font-bold">{student.name}</span></button> </p>
          </div>
        </div>
       
   </div>
    )
}

export default ProfileJumbo