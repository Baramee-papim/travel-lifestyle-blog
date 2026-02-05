import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useParams } from "react-router-dom";
const ViewPostPage = () => {
    const { id } = useParams(); 
    return (
        <div>
            <Navbar />
            <h1>View Post Page {id}</h1>
            <Footer />
        </div>
    )
}
export default ViewPostPage;