const sql = require('./db');

const Employee = function (employee) {
    this.name = employee.name;
    this.position = employee.position;
};

Employee.create = (newEmployee, result) => {
    sql.query("INSERT INTO employee SET ?", newEmployee, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created employee: ", { id: res.insertId, ...newEmployee });
        result(null, { id: res.insertId, ...newEmployee });
    });
};

Employee.findById = (id, result) => {
    sql.query(`SELECT * FROM employee WHERE id = ?`, [id], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found employee: ", res[0]);
            result(null, res[0]);
            return;
        }

        result({ kind: "not_found" }, null);
    });
};

Employee.getAll = (result) => {
    sql.query("SELECT * FROM employee", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("employee: ", res);
        result(null, res);
    });
};

Employee.update = (id, employee, result) => {
    sql.query(
        "UPDATE employee SET  name = ? , position = ? WHERE id = ?",
        [employee.name, employee.position, id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("updated employee: ", { id: id, ...employee });
            result(null, { id: id, ...employee });
        }
    );
};

Employee.delete = (id, result) => {
    sql.query("DELETE FROM employee WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted employee with id: ", id);
        result(null, res);
    });
};

module.exports = Employee;