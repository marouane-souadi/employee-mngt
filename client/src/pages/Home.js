import {useEffect, useState} from "react";
import {useAuth} from "../hooks/auth";
import EmployeesList from "../components/EmployeesList";
import axios from "axios";

const Home = () => {
    const [employees, setEmployees] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const auth = useAuth()

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
            <h1 className="mt-4 mb-5">Employees List</h1>
            {
                isLoading ? (
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                ): (employees.length === 0 ? <h3>Empty</h3>: <EmployeesList employees={employees}/>)
            }

        </section>
    )
}

export default Home