import { useNavigate } from "react-router-dom"
const About = () => {
    const navigate = useNavigate();
    return (
        <div>
           <button onClick={() => navigate('/')} className="px-10 py-5 bg-yellow-500 rounded-md ">Go back</button>
        </div>
    )
}

export default About