import {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../hooks/auth";

const AddEmployee = () => {

    const navigate = useNavigate()
    const auth = useAuth()

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [address, setAddress] = useState('')
    const [role, setRole] = useState('')
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)


    const onSubmit = (e) => {
        e.preventDefault()
        setError('')
        if (firstname && email && username && password) {
            setIsLoading(true)
            axios.post(
                '/api/employees',
                {firstname, lastname, email, username, password, role, address},
                {
                    headers: {
                        Authorization: `Bearer ${auth.user.token}`
                    }
                }
            ).then(res => {
                navigate('/')
            }).catch(err => {
                if (err.response && err.response.status === 401) {
                    auth.setCurrentUser(null)
                }
                if (err.response) {
                    setError(err.response.data.message)
                } else {
                    setError(err.message)
                }
            }).finally(() => setIsLoading(false))
        }
    }
    return (
        <section className="py-4 px-3">
            <h1 className="mt-4 mb-5">Add an Employee</h1>
            <form className="px-4 pb-5" onSubmit={onSubmit}>
                <h5 className="mb-4">Please fill the form below</h5>
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
                           placeholder="email"
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
                    {!isLoading ?
                        (<button type="submit" className="btn btn-primary">Submit</button>)
                        : (
                            <button type="submit" className="btn btn-primary" disabled>
                                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"/>
                            </button>
                        )
                    }
                </div>
            </form>
        </section>
    )
}

export default AddEmployee
