import profileImage from '../images/profile.png'

const EmployeeListItem = ({employee}) => {
    return (
        <div className="col">
            <div className="card h-100">
                <div className="row g-0">
                    <div className="col-3">
                        <img src={profileImage} className="p-2 img-fluid rounded-start" alt="..."/>
                    </div>
                    <div className="col-9">
                        <div className="card-body">
                            <h5 className="card-title">{`${employee.firstname} ${employee.lastname}`}</h5>
                            <p className="card-text"><small className="text-muted">{employee.email}</small></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EmployeeListItem