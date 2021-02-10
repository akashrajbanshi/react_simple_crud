import React, { Component } from "react";
import EmployeeDataService from "../services/employee.service";
import { Link } from "react-router-dom";

class EmployeeList extends Component {
    constructor(props) {
        super(props);
        this.retrieveEmployees = this.retrieveEmployees.bind(this);
        this.setActiveEmployee = this.setActiveEmployee.bind(this);

        this.state = {
            employees: [],
            currentEmployee: null,
            currentIndex: -1,
        };
    }

    componentDidMount() {
        this.retrieveEmployees();
    }

    retrieveEmployees() {
        EmployeeDataService.getAll().then(
            response => {
                this.setState({
                    employees: response.data
                })
            }
        ).catch(
            e => {
                console.log(e);
            }
        );
    }

    setActiveEmployee(employee, index) {
        this.setState({
            currentEmployee: employee,
            currentIndex: index
        });
    }

    render() {
        const { employees, currentEmployee, currentIndex } = this.state;
        return (
            <div className="list row">
                <div className="col-md-6">
                    <h4>Employee List</h4>

                    <ul className="list-group">
                        {employees &&
                            employees.map((employee, index) => (
                                <li
                                    className={
                                        "list-group-item " +
                                        (index === currentIndex ? "active" : "")
                                    }
                                    onClick={() => this.setActiveEmployee(employee, index)}
                                    key={index}
                                >
                                    {employee.name}
                                </li>
                            ))}
                    </ul>
                </div>
                <div className="col-md-6">
                    {currentEmployee ? (
                        <div>
                            <h4>Employee</h4>
                            <div>
                                <label>
                                    <strong>Name:</strong>
                                </label>{" "}
                                {currentEmployee.name}
                            </div>
                            <div>
                                <label>
                                    <strong>Position:</strong>
                                </label>{" "}
                                {currentEmployee.position}
                            </div>

                            <Link
                                to={"/employees/" + currentEmployee.id}
                                className="badge badge-warning">
                                Edit
                  </Link>
                        </div>
                    ) : (
                            <div>
                                <br />
                                <p>Please click on a Employee...</p>
                            </div>
                        )}
                </div>
            </div>
        );
    }
}

export default EmployeeList;