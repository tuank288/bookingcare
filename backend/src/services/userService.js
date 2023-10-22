import db from "../models"
import bcrypt from 'bcryptjs';

var salt = bcrypt.genSaltSync(10);

let handleUserLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};
            let isExit = await checkUserEmail(email);
            if (isExit) {
                let user = await db.User.findOne({
                    where: { email: email },
                    attributes: ['email', 'roleId', 'password', 'firstName', 'lastName'],
                    raw: true
                })
                if (user) {
                    let check = bcrypt.compareSync(password, user.password);
                    if (check) {
                        userData.errCode = 0;
                        userData.errMessage = 'OK';
                        delete user.password;
                        userData.user = user;
                    } else {
                        userData.errCode = 3;
                        userData.errMessage = 'Wrong password'
                    }
                } else {
                    userData.errCode = 2;
                    userData.errMessage = `User's isn't not found`
                }
            } else {
                userData.errCode = 1;
                userData.errMessage = `Your's Email isn't exits in your system. Plz try orther email`
            }
            resolve(userData)
        } catch (e) {
            reject(e)
        }
    })
}

let checkUserEmail = (userEmail) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { email: userEmail }
            })
            if (user) {
                resolve(true)
            } else {
                resolve(false)
            }
        } catch (e) {
            reject(e)
        }
    })
}

let getAllUser = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = '';
            if (userId === 'ALL') {
                users = db.User.findAll({
                    attributes: {
                        exclude: ['password']
                    }
                })
            }
            if (userId && userId !== 'ALL') {
                users = await db.User.findOne({
                    where: { id: userId },
                    attributes: {
                        exclude: ['password']
                    }
                })
            }
            resolve(users);
        } catch (e) {
            reject(e)
        }
    })
}

let createNewUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let { email, password, firstName, lastName, address, phoneNumber, gender, roleId } = data;

            let check = await checkUserEmail(email);
            if (check) {
                resolve({
                    errCode: 1,
                    errMessage: 'Your email is already is used, Plz try another email'
                })
            } else {
                let hashUserPasswordFromBcrypt = await hashUserPassword(password);
                await db.User.create({
                    email: email,
                    password: hashUserPasswordFromBcrypt,
                    firstName: firstName,
                    lastName: lastName,
                    address: address,
                    phoneNumber: phoneNumber,
                    gender: gender === '1' ? true : false,
                    roleId: roleId,
                })
                resolve({
                    errCode: 0,
                    message: 'OK',
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}

let hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashUserPassword = await bcrypt.hashSync(password, salt);
            resolve(hashUserPassword)
        } catch (e) {
            reject(e)
        }
    })
}

let deleteUser = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: userId },
                raw: false
            })
            console.log('data login', user);
            if (user) {
                await user.destroy();
                resolve({
                    errCode: 0,
                    message: `The user isn't delete`
                })
            } else {
                resolve({
                    errCode: 2,
                    errMessage: `The user isn't exist`
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}

let editUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let { firstName, lastName, address } = data;
            let user = await db.User.findOne({
                where: { id: data.id },
                raw: false
            })
            if (user) {
                await user.update({
                    firstName: firstName,
                    lastName: lastName,
                    address: address
                })
                resolve({
                    errCode: 0,
                    message: 'Update the user succeeds!'
                })
            } else {
                resolve({
                    errCode: 1,
                    errMessage: `User's not found!`
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}

let getAllCodeService = (type) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!type) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameters!'
                })
            } else {
                let res = {};
                let allcode = await db.Allcode.findAll({
                    where: {
                        type
                    }
                });
                res.errCode = 0;
                res.data = allcode;
                resolve(res)
            }
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    handleUserLogin: handleUserLogin,
    getAllUser: getAllUser,
    createNewUser: createNewUser,
    deleteUser: deleteUser,
    editUser: editUser,
    getAllCodeService: getAllCodeService
}