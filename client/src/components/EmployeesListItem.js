import profileImage from '../images/profile.png'
import {Link, useNavigate} from "react-router-dom";

const EmployeeListItem = ({employee, onDelete}) => {
    const navigate = useNavigate()
    const show = () => {
        navigate(`/employees/${employee.id}`)
    }
    return (
        <div className="col">
            <div className="card h-100">
                <div className="row g-0">
                    <div className="col-2" style={{cursor: 'pointer'}} onClick={show}>
                        <img src={profileImage} className="p-2 img-fluid rounded-start" alt="..."/>
                    </div>
                    <div className="col-9">
                        <div className="d-flex justify-content-space-between align-items-center">
                            <div className="card-body" style={{cursor: 'pointer'}} onClick={show}>
                                <h5 className="card-title">{`${employee.firstname} ${employee.lastname}`}</h5>
                                <p className="card-text"><small className="text-muted">{employee.email}</small></p>
                            </div>
                            <div className="">
                                <Link className="d-block btn btn-success" to={`/employees/${employee.id}/edit`}><i className="bi bi-pencil"/></Link>
                                <button className="d-block btn btn-danger mt-1" onClick={() => onDelete(employee.id)}><i className="bi bi-trash"/></button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EmployeeListItem