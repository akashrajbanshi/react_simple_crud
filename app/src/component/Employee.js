import React, { Component } from "react";
import EmployeeDataService from "../services/employee.service";

export default class Employee extends Component {
    constructor(props) {
        super(props);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangePosition = this.onChangePosition.bind(this);
        this.getEmployee = this.getEmployee.bind(this);
        this.updateEmployee = this.updateEmployee.bind(this);
        this.deleteEmployee = this.deleteEmployee.bind(this);


        this.state = {
            currentEmployee: {
                id: null,
                name: "",
                position: ""
            },
            message: ""
        }
    }

    componentDidMount() {
        this.getEmployee(this.props.match.params.id);
    }

    onChangeName(e) {
        const name = e.target.value;
        this.setState(prevState => ({
            currentEmployee: {
                ...prevState.currentEmployee,
                name: name
            }
        }));
    }

    onChangePosition(e) {
        const position = e.target.value;
        this.setState(prevState => ({
            currentEmployee: {
                ...prevState.currentEmployee,
                position: position
            }
        }));
    }

    getEmployee(id) {
        EmployeeDataService.get(id).then(response => {
            this.setState({
                currentEmployee: response.data
            })
        }).catch(e => {
            console.log(e);
        });
    }

    updateEmployee() {
        EmployeeDataService.update(this.state.currentEmployee.id, this.state.currentEmployee).then(response => {
            this.setState({
                message: "The Employee was updated successfully!"
            });
        })
            .catch(e => {
                console.log(e);
            });
    }

    deleteEmployee() {
        EmployeeDataService.delete(this.state.currentEmployee.id).then(response => {
            this.props.history.push('/employees')
        })
            .catch(e => {
                console.log(e);
            });
    }

    render() {
        const { currentEmployee } = this.state;

        return (
            <div>
                {currentEmployee ? (
                    <div className="edit-form">
                        <h4>Employee</h4>
                        <form>
                            <div className="form-group">
                                <label htmlFor="name">Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="name"
                                    value={currentEmployee.name}
                                    onChange={this.onChangeName}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="position">Position</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="position"
                                    value={currentEmployee.position}
                                    onChange={this.onChangePosition}
                                />
                            </div>
                        </form>

                        <button
                            className="badge badge-danger mr-2"
                            onClick={this.deleteEmployee}
                        >
                            Delete
                </button>

                        <button
                            type="submit"
                            className="badge badge-success"
                            onClick={this.updateEmployee}
                        >
                            Update
                </button>
                        <p>{this.state.message}</p>
                    </div>
                ) : (
                        <div>
                            <br />
                            <p>Please click on an Employee...</p>
                        </div>
                    )}
            </div>
        );
    }
}