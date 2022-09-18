import {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";
import {useAuth} from "../hooks/auth";

const EditEmployee = () => {

    const navigate = useNavigate()
    const {id} = useParams()
    const auth = useAuth()
    const [employee, setEmployee] = useState({})
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [address, setAddress] = useState('')
    const [role, setRole] = useState('')
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        axios.get(`/api/employees/${id}`, {headers: {Authorization: `Bearer ${auth.user.token}`}})
            .then(resp => {
                console.log(resp.data)
                setEmployee(resp.data)
                setUsername(resp.data.username)
                setEmail(resp.data.email)
                setFirstname(resp.data.firstname)
                setLastname(resp.data.lastname)
                setAddress(resp.data.address)
                setRole(resp.data.role)
            }).catch(err => {
                if (err.response.status === 401) {
                    auth.setCurrentUser(null)
                } else if (err.response) {
                    setError(err.response.data.message)
                } else {
                    setError(err.message)
                }
        })
    }, [id])

    const onSubmit = (e) => {
        e.preventDefault()
        setError('')
        const updatedFields = {firstname, lastname, email, role, address, username}
        if (password !== '') updatedFields.password = password

        if (updatedFields.firstname) {
            setIsLoading(true)
            axios.post(
                `/api/employees/${employee.id}`,
                updatedFields,
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
            <h1 className="mt-4 mb-5">Edit an Employee</h1>
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
                           onChange={e => setFirstname(e.target.value)} value={firstname}
                           placeholder="first name" required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="lastname" className="form-label">Last name</label>
                    <input type="text" className="form-control" id="lastname"
                           onChange={e => setLastname(e.target.value)} value={lastname}
                           placeholder="last name"
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" className="form-control" id="email"
                           onChange={e => setEmail(e.target.value)} value={email}
                           placeholder="email"
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="address" className="form-label">Address</label>
                    <input type="text" className="form-control" id="address"
                           onChange={e => setAddress(e.target.value)} value={address}
                           placeholder="address"
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="role" className="form-label">Role</label>
                    <input type="text" className="form-control" id="role"
                           value={role} onChange={e => setRole(e.target.value)}
                           placeholder="role"
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">Username</label>
                    <input type="text" className="form-control" id="username"
                           onChange={e => setUsername(e.target.value)} value={username}
                           placeholder="username" required
                    />
                </div>
                <div className="mb-5">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" placeholder="********"
                           id="password" onChange={e => setPassword(e.target.value)} value={password}
                    />
                </div>
                <div className="d-grid mb-4">
                    {!isLoading ?
                        (<button type="submit" className="btn btn-primary">Save</button>)
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

export default EditEmployee
