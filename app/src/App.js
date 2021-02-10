import React, { Component } from "react";
import { Link, Route, Switch } from 'react-router-dom'
import EmployeeList from './component/EmployeeList';
import AddEmployee from './component/AddEmployee';
import Employee from './component/Employee';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";

class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand">
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/employees"} className="nav-link">
                Employees
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Add
              </Link>
            </li>
          </div>
        </nav>
        <div>
          <Switch>
            <Route exact path={["/", "/employees"]} component={EmployeeList} />
            <Route exact path="/add" component={AddEmployee} />
            <Route path="/employees/:id" component={Employee} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;