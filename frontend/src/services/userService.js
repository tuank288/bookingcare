import axios from "../axios";

//viết tắt
// const handleLogin = (email, password) => {
//     return axios.post('/api/login', { email, password })
// }

const handleLogin = (userEmail, userPassword) => {
    return axios.post('/api/login', { email: userEmail, password: userPassword })
}

const getAllUsers = (id) => {
    return axios.get(`/api/get-all-users?id=${id}`)
}

const createNewUserService = (data) => {
    return axios.post('/api/create-new-user', data)
}

const deleteUserService = (userId) => {
    return axios.delete('/api/delete-user', {
        data: { id: userId }
    })
}

const editUserService = (data) => {
    return axios.put('/api/edit-user', data)
}

const getAllCodeService = (type) => {
    return axios.get(`/api/allcode?type=${type}`)
}

const getTopDoctorHomeService = (limit) => {
    return axios.get(`/api/top-doctor-home?limit=${limit}`)
}

const getAllDoctors = () => {
    return axios.get(`/api/get-all-doctors`)
}

const saveDetailDoctorService = (data) => {
    return axios.post('/api/save-infor-doctor', data)
}

const getDetailInforDoctor = (id) => {
    return axios.get(`/api/get-detail-doctor-by-id?id=${id}`)
}

const saveScheduleDoctorService = (data) => {
    console.log(data, 'checkddata');
    return axios.post('/api/save-schedule-doctor', data)
}

export {
    handleLogin,
    getAllUsers,
    createNewUserService,
    deleteUserService,
    editUserService,
    getAllCodeService,
    getTopDoctorHomeService,
    getAllDoctors,
    saveDetailDoctorService,
    getDetailInforDoctor,
    saveScheduleDoctorService
};