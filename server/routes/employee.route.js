module.exports = app => {
    const employee = require('../controllers/employee.controller');

    app.post('/api/employee', employee.create);

    app.get('/api/employees', employee.getAll);

    app.get('/api/employees/:id', employee.findById);

    app.put('/api/employees/:id', employee.update);

    app.delete('/api/employees/:id', employee.delete);
}