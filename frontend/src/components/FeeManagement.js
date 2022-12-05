import { useParams } from "react-router-dom"

const FeeManagement = () => {
    const { id } = useParams()
    return (
        <div>{id}</div>
    )
}
export default FeeManagement