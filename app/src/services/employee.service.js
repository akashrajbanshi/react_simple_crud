import http from '../http-common';

class EmployeeDataService {
    getAll() {
        return http.get("/employees");
    }

    get(id) {
        return http.get(`/employees/${id}`);
    }

    create(data) {
        return http.post("/employee", data);
    }

    update(id, data) {
        return http.put(`/employees/${id}`, data);
    }

    delete(id) {
        return http.delete(`/employees/${id}`);
    }
}

export default new EmployeeDataService();