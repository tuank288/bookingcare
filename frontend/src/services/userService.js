import axios from "../axios";

//viết tắt
// const handleLogin = (email, password) => {
//     return axios.post('/api/login', { email, password })
// }

const handleLogin = (userEmail, userPassword) => {
    return axios.post('/api/login', { email: userEmail, password: userPassword })
}


export { handleLogin };