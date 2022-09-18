import EmployeeListItem from "./EmployeesListItem";

const EmployeesList = ({employees, onDelete}) => {
    return (
        <div className="row row-cols-1 row-cols-md-3 g-4">
            {
                employees.map(employee => <EmployeeListItem key={employee.id} employee={employee} onDelete={onDelete}/>)
            }
        </div>
    )
}

export default EmployeesList