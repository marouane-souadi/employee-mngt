import EmployeeListItem from "./EmployeesListItem";

const EmployeesList = ({employees}) => {
    return (
        <div className="row row-cols-1 row-cols-md-3 g-4">
            {
                employees.map(employee => <EmployeeListItem key={employee.id} employee={employee}/>)
            }
        </div>
    )
}

export default EmployeesList