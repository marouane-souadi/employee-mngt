import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import {useAuth} from "../hooks/auth";
import CommentsList from "../components/CommentsList";
import AddComment from "../components/AddComment";
import profilePicture from "../images/profile.png"

const EmployeeDetail = () => {

    const {id} = useParams()
    const auth = useAuth()
    const [error, setError] = useState('')
    const [employee, setEmployee] = useState({})
    const [comments, setComments] = useState([])

    useEffect(() => {
        axios.get(`/api/employees/${id}`, {headers: {Authorization: `Bearer ${auth.user.token}`}})
            .then(resp => {
                setEmployee(resp.data)
            }).catch(err => {
            if (err.response.status === 401) {
                auth.setCurrentUser(null)
            } else if (err.response) {
                setError(err.response.data.message)
            } else {
                setError(err.message)
            }
        })
        axios.get(`/api/employees/${id}/comments`, {headers: {Authorization: `Bearer ${auth.user.token}`}})
            .then(resp => {
                setComments(resp.data)
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

    const onAddComment = async (comment) => {
        return axios.post(`/api/employees/${id}/comments`,
            {text: comment},
            {headers: {Authorization: `Bearer ${auth.user.token}`}}
        ).then(resp => {
            console.log(resp)
            setComments([resp.data, ...comments])
        }).catch(err => {
            if (err.response && err.response.status === 401) {
                auth.setCurrentUser(null)
            } else if (err.response) {
                setError(err.response.data.message)
            } else {
                setError(err.message)
            }
        })
    }

    return (
        <section className="py-4 px-3">
            <h1 className="mt-4 mb-5">Employee Detail</h1>
            <div className="d-flex align-items-center p-3">
                <img src={profilePicture} style={{width: '5rem'}} alt="..."/>
                <h3 className="ms-3">{`${employee.firstname} ${employee.lastname}`}</h3>
            </div>
            <p className="mb-3"><strong><i className="bi bi-person-lines-fill"/> Role: </strong>{employee.role}</p>
            <p><strong><i className="bi bi-geo-alt"/> Address: </strong> {employee.address}</p>
            <p><strong><i className="bi bi-envelope"/> Email: </strong> {employee.email}</p>
            <p><strong><i className="bi bi-person"/> Username: </strong> {employee.username}</p>
            <div className="mt-5" style={{maxWidth: '40rem'}}>
                <h3><i className="bi bi-card-text"/> Comments</h3>
                <AddComment onAdd={onAddComment}/>
                <CommentsList comments={comments}/>
            </div>
        </section>
    )
}

export default EmployeeDetail