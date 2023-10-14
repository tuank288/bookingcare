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
    // console.log('check data', data);
    return axios.post('/api/create-new-user', data)
}

export { handleLogin, getAllUsers, createNewUserService };