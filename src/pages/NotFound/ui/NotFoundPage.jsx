import {useNavigate} from "react-router-dom";

function NotFoundPage() {
    const navigate = useNavigate();
    return (
        <>
            <h1>Page Not Fount</h1>
            <button onClick={() => navigate("/")}>Главная</button>
        </>
    )
}

export default NotFoundPage();