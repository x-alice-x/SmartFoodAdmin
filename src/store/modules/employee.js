import axios from "axios";

export default {
    state: {
        employees: [],
        error: null
    },
    mutations: {
        SET_EMPLOYEE(state, data) {
            state.employees = data;
        },
        SET_ERROR(state, data) {
            state.error = data;
        },
        CLEAR_ERROR(state) {
            state.error = null;
        }
    },
    actions: {
        async fetchEmployees({commit}, office_id) {
            commit("CLEAR_ERROR");
            let url = "http://digitalization.student.smartworld.team:2280/api/v2/employee";
            console.log(office_id)
            let reqParams = {
                url: url,
                method: "GET",
                params: {office_id: office_id}
            };
            console.log(reqParams);
            await axios(reqParams).then(
                resp => {
                    console.log(resp);
                    let data = resp.data.data;
                    commit("SET_EMPLOYEE", data);
                },
                err => {
                    console.log(err);
                }
            );
        },
        async changeEmployeeData({commit}, data) {
            commit("CLEAR_ERROR");
            let url = "http://digitalization.student.smartworld.team:2280/api/v2/employee/" + data.item.id;
            console.log(data.oldEmail, data.item.email)
            if (data.oldEmail == data.item.email) {
                let reqParams = {
                    url: url,
                    method: "PUT",
                    params: {name: data.item.name, surname: data.item.surname, middle_name: data.item.middle_name,
                             photo: data.item.photo, office_id: data.item.office_id}
                };
                console.log(reqParams);
                await axios(reqParams).then(
                    resp => {
                        console.log(resp);
                    },
                    err => {
                        console.log(err.response);
                    }
                );      
            } else {
                let reqParams = {
                    url: url,
                    method: "PUT",
                    params: {name: data.item.name, surname: data.item.surname, middle_name: data.item.middle_name,
                            email: data.item.email, photo: data.item.photo, office_id: data.item.office_id}
                };
                console.log(reqParams);
                await axios(reqParams).then(
                    resp => {
                        console.log(resp);
                    },
                    err => {
                        console.log(err.response);
                    }
                );       
            }     
        },
        async addEmployee({commit}, data) {
            commit("CLEAR_ERROR");
            let url = "http://digitalization.student.smartworld.team:2280/api/v2/employee";
            let reqParams = {
                url: url,
                method: "POST",
                params: {name: data.name, surname: data.surname, middle_name: data.middle_name, email: data.email,
                         photo: data.photo, office_id: data.office_id}
            };
            await axios(reqParams).then(
                resp => {
                    console.log(resp);
                },
                err => {
                    console.log(err.response.data);
                    commit("SET_ERROR", err.response.data.message);
                }
            );
        },
        async deleteEmployee({commit}, data) {
            commit("CLEAR_ERROR");
            console.log(data);
            console.log(data.office_id)
            let url = "http://digitalization.student.smartworld.team:2280/api/v2/employee/" + data.id;
            let reqParams = {
                url: url,
                method: "DELETE",
                params: {office_id: data.office_id}
            };
            await axios(reqParams).then(
                resp => {
                    console.log(resp);
                },
                err => {
                    console.log(err.response.data);
                }
            );
        }
    },
    getters: {
        getEmployees(state) {
            return state.employees;
        },
        getError(state) {
            return state.error;
        }
    }
}