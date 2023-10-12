import userService from "../services/userService";

let handleLogin = async (req, res) => {
    let { email, password } = req.body;

    if (!email || !password) {
        return res.status(500).json({
            errorCode: 1,
            message: 'Missing inputs parammeter!'
        })
    }

    let userData = await userService.handleUserLogin(email, password);

    return res.status(200).json({
        errCode: userData.errCode,
        message: userData.errMessage,
        user: userData.user ? userData.user : {}
    })
}

module.exports = {
    handleLogin: handleLogin
}