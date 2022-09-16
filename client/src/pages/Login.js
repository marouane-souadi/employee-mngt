import companyImage from '../images/company.jpeg'
import {useState} from "react";
import axios from 'axios'
import {useAuth} from "../hooks/auth";
import {Link} from "react-router-dom";


const Login = () => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const auth = useAuth()

    const backgroundImageStyle = {
        backgroundImage: `url(${companyImage})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        width: '100%',
        height: '100%'
    }

    const onSubmit = (e) => {
        e.preventDefault()
        setError('')
        if (username && password) {
            setIsLoading(true)
            axios.post('/api/auth/login', {username, password})
                .then(res => {
                    auth.setCurrentUser(res.data)
                }).catch(err => {
                if (err.response) {
                    setError(err.response.data.message)
                } else {
                    setError(err.message)
                }
                console.log(err)
            }).finally(() => setIsLoading(false))
        }
    }
    return (
        <section className="py-5" style={backgroundImageStyle}>
            <div className="row justify-content-center">
                <div className="col-lg-7">
                    <form className=" mx-3 px-4 py-5" onSubmit={onSubmit} style={{backgroundColor: 'white'}}>
                        <h2 className="mb-5">Login</h2>
                        <h5 className="mb-4">Sign into your account</h5>
                        {error && (
                            <div className="alert alert-danger" role="alert">
                                {error}
                            </div>
                        )}
                        <div className="mb-3">
                            <label htmlFor="exampleFormControlInput1" className="form-label">Username</label>
                            <input type="text" className="form-control" id="username"
                                   onChange={e => setUsername(e.target.value)}
                                   placeholder="username" required
                            />
                        </div>
                        <div className="mb-5">
                            <label htmlFor="exampleFormControlInput1" className="form-label">Password</label>
                            <input type="password" className="form-control" placeholder="********"
                                   id="password" required onChange={e => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="d-grid mb-4">
                            { !isLoading ?
                                (<button type="submit" className="btn btn-primary">Submit</button>)
                                : (
                                    <button type="submit" className="btn btn-primary" disabled>
                                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"/>
                                    </button>
                                )
                            }
                        </div>
                        <p className="card-text">Don't have an account?
                            <Link to="/register" className="text-decoration-none"> Register here</Link>
                        </p>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default Login