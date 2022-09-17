import companyImage from '../images/company.jpeg'
import {useState} from "react";
import axios from 'axios'
import {useAuth} from "../hooks/auth";

const Register =  () => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [address, setAddress] = useState('')
    const [role, setRole] = useState('')
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
        if (firstname && email && username && password) {
            setIsLoading(true)
            axios.post('/api/auth/register', {firstname, lastname, email, username, password, address, role})
                .then(res => {
                    auth.setCurrentUser(res.data)
                }).catch(err => {
                if (err.response) {
                    setError(err.response.data.message)
                } else {
                    setError(err.message)
                }
            }).finally(() => setIsLoading(false))
        }
    }
    return (
        <section className="py-5" style={backgroundImageStyle}>
            <div className="row justify-content-center">
                <div className="col-lg-7">
                    <form className="px-4 py-5" onSubmit={onSubmit} style={{backgroundColor:'white'}}>
                        <h2 className="mb-5">Registration Form</h2>
                        <h5 className="mb-4">Register a new account</h5>
                        {error && (
                            <div className="alert alert-danger" role="alert">
                                {error}
                            </div>
                        )}
                        <div className="mb-3">
                            <label htmlFor="firstname" className="form-label">First name</label>
                            <input type="text" className="form-control" id="firstname"
                                   onChange={e => setFirstname(e.target.value)}
                                   placeholder="first name" required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="lastname" className="form-label">Last name</label>
                            <input type="text" className="form-control" id="lastname"
                                   onChange={e => setLastname(e.target.value)}
                                   placeholder="last name"
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input type="email" className="form-control" id="email"
                                   onChange={e => setEmail(e.target.value)}
                                   placeholder="email" required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="address" className="form-label">Address</label>
                            <input type="text" className="form-control" id="address"
                                   onChange={e => setAddress(e.target.value)}
                                   placeholder="address"
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="role" className="form-label">Role</label>
                            <input type="text" className="form-control" id="role"
                                   onChange={e => setRole(e.target.value)}
                                   placeholder="role"
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="username" className="form-label">Username</label>
                            <input type="text" className="form-control" id="username"
                                   onChange={e => setUsername(e.target.value)}
                                   placeholder="username" required
                            />
                        </div>
                        <div className="mb-5">
                            <label htmlFor="password" className="form-label">Password</label>
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
                        <p className="card-text">Already have an account?
                            <a href="/login" className="text-decoration-none"> Login here</a>
                        </p>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default Register