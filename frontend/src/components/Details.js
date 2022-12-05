import { useParams } from "react-router-dom";

const Details = ({ details }) => {
    const { id } = useParams();
return (
    <div className="container">
        <div className="details"> Details </div>
    <p>{id}</p>
    </div>
)
}

export default Details;