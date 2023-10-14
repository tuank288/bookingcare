import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss';
import {
    getAllUsers,
    createNewUserService,
    deleteUserService,
    editUserService
} from '../../services/userService';

import ModalUser from './ModalUser';
import { emitter } from '../../utils/Emitter';


class UserManage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            arrUser: [],
            isOpenModalUser: false,
            userId: ''
        }
    }
    async componentDidMount() {
        await this.getAllUserFromReact();
    }

    getAllUserFromReact = async () => {
        let response = await getAllUsers('ALL')
        if (response && response.errCode === 0) {
            this.setState({
                arrUser: response.users,
            })
        }
    }

    handleAddNewUser = () => {
        this.setState({
            isOpenModalUser: true,
        })
    }

    toggleUserModal = (id) => {
        this.setState({
            isOpenModalUser: !this.state.isOpenModalUser,
            userId: id
        })
    }

    createNewUser = async (data) => {
        try {
            let response = await createNewUserService(data);
            if (response && response.errCode !== 0) {
                alert(response.errMessage)
            } else {
                await this.getAllUserFromReact();
                this.setState({
                    isOpenModalUser: !this.state.isOpenModalUser,
                })
                emitter.emit('EVENT_CLEAR_MODAL_DATA')
            }
            // console.log(response);
        } catch (error) {
            console.log(error);
        }
    }


    handleDeleteUser = async (id) => {
        try {
            let response = await deleteUserService(id)
            console.log('response', response);
            if (response && response.errCode !== 0) {
                alert(response.errMessage)
                await this.getAllUserFromReact();
            } else {
                await this.getAllUserFromReact();
            }
        } catch (error) {
            console.log(error);
        }
    }

    handleEditUser = async (id) => {
        this.toggleUserModal(id);
        let response = await getAllUsers(id)
        emitter.emit('EVENT_UPDATE_USER', response)
    }

    updateUser = async (data) => {
        try {
            let userData = { ...data }
            userData = {
                id: this.state.userId,
                ...data
            }
            let response = await editUserService(userData)
            console.log('check data', userData);
            if (response && response.errCode !== 0) {
                alert(response.errMessage)
            } else {
                await this.getAllUserFromReact();
                this.setState({
                    isOpenModalUser: !this.state.isOpenModalUser,
                    userId: ''
                })
                emitter.emit('EVENT_CLEAR_MODAL_DATA')
            }
        } catch (error) {
            console.log(error);
        }
    }

    render() {
        let { arrUser } = this.state;
        return (
            <div className="user-container">
                <ModalUser
                    isOpenModalUser={this.state.isOpenModalUser}
                    toggleUserModal={this.toggleUserModal}
                    createNewUser={this.createNewUser}
                    userId={this.state.userId}
                    updateUser={this.updateUser}
                />
                <div className='title text-center'>Manage user</div>
                <div className='mx-1'>
                    <button
                        className='btn btn-primary px-1'
                        onClick={this.handleAddNewUser}>
                        <i className="fas fa-plus px-1"></i>
                        Add new users
                    </button>
                </div>
                <div className='user-table mt-3 mx-1'>
                    <table id="customers">
                        <tbody>
                            <tr>
                                <th>Email</th>
                                <th>First name</th>
                                <th>Last name</th>
                                <th>Address</th>
                                <th>Action</th>
                            </tr>
                            {arrUser && arrUser.length > 0 &&
                                arrUser.map(item => {
                                    return (
                                        <tr key={item.id}>
                                            <td>{item.email}</td>
                                            <td>{item.firstName}</td>
                                            <td>{item.lastName}</td>
                                            <td>{item.address}</td>
                                            <td>
                                                <button
                                                    className='btn-edit'
                                                    onClick={() => this.handleEditUser(item.id)}
                                                >
                                                    <i className="far fa-edit" />
                                                </button>
                                                <button
                                                    className='btn-delete'
                                                    onClick={() => this.handleDeleteUser(item.id)}
                                                >
                                                    <i className="far fa-trash-alt"
                                                    />
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
