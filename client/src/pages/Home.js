import {useEffect, useState} from "react";
import {useAuth} from "../hooks/auth";
import EmployeesList from "../components/EmployeesList";
import axios from "axios";
import {Link} from "react-router-dom";

const Home = () => {
    const [employees, setEmployees] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')
    const auth = useAuth()

    const onDelete = (id) => {
        const confirm = window.confirm('Are you sure to delete this employee')
        if (confirm) {
            setIsLoading(true)
            axios.delete(`api/employees/${id}`, {
                headers: {
                    Authorization: `Bearer ${auth.user.token}`
                }
            }).then(() => {
                setEmployees(employees.filter(employee => employee.id !== id))
            }).catch((err) => {
                if (err && err.response && err.response.status === 401) {
                    auth.setCurrentUser(null)
                } else if (err.response) {
                    setError(err.response.data.message)
                } else {
                    setError(err.message)
                }
            }).finally(() => setIsLoading(false))

        }
    }

    useEffect(() => {
        setIsLoading(true)
        fetchEmployees()
            .catch(err => {
                console.log(err)
                if (err.response && err.response.status === 401) {
                    auth.setCurrentUser(null)
                }
            })
            .finally(() => setIsLoading(false))

    }, [])

    const fetchEmployees = async () => {
        const response = await axios.get('/api/employees', {
            headers: {
                Authorization: `Bearer ${auth.user.token}`
            }
        })
        setEmployees(response.data)
    }

    return (
        <section className="py-4 px-3">
            <div className="mt-4 mb-5 d-flex align-items-center">
                <h1>Employees List</h1>
                <Link className="ms-5 btn btn-primary" to="/employees/add">Add an employee</Link>
                <Link className="ms-5 btn btn-secondary" to="/employees/import-csv">Import CSV</Link>
            </div>
            {error && (
                <div className="alert alert-danger" role="alert">
                    {error}
                </div>
            )}
            {
                isLoading ? (
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                ) : (employees.length === 0 ? <h3>Empty</h3> : <EmployeesList employees={employees} onDelete={onDelete}/>)
            }

        </section>
    )
}

export default Home