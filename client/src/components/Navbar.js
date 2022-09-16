import {Link, useLocation, useNavigate} from "react-router-dom";
import {useAuth} from "../hooks/auth";
import companyLogo from "../images/company-logo.png"

const NavBar = () => {
    let navigate = useNavigate()
    const {pathname} = useLocation()

    const auth = useAuth()

    const onLogout = () => {
        auth.setCurrentUser(null)
        navigate('/')
    }

    return (
        <nav className="navbar navbar-expand-lg bg-light">
            <div className="container-fluid">
                <a className="navbar-brand" href="/">
                    <img src={companyLogo} alt="Logo" width="30" height="24"
                         className="d-inline-block align-text-top me-2"/>
                    Badumts GmbH
                </a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"/>
                </button>
                {!auth.user ? (
                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className={'nav-link ' + (pathname !== '/login' ? 'active': '')} to="/login">Login</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={'nav-link ' + (pathname !== '/register' ? 'active': '')} to="/register">Register</Link>
                            </li>
                        </ul>
                    </div>
                ) : (
                    <div className="collapse navbar-collapse">
                        <span className="navbar-text ms-auto me-4">{auth.user.firstname + ' ' + auth.user.lastname}</span>
                        <ul className="navbar-nav  mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link active" onClick={onLogout} href="#">Logout</a>
                            </li>
                        </ul>
                    </div>
                )}

            </div>
        </nav>
    )
}

export default NavBar