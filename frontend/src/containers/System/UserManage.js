import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss';
import { getAllUsers, createNewUserService } from '../../services/userService';
import ModalUser from './ModalUser';


class UserManage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            arrUser: [],
            isOpenModalUser: false,
            clearState: false
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

    toggleUserModal = () => {
        this.setState({
            isOpenModalUser: !this.state.isOpenModalUser
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
            }
            // console.log(response);
        } catch (error) {
            console.log(error);
        }
    }

    clearStateValue = (value) => {
        this.setState({
            clearState: value
        })
    }


    handleDeleteUser = () => {

    }

    render() {
        let { arrUser } = this.state;
        return (
            <div className="user-container">
                <ModalUser
                    isOpenModalUser={this.state.isOpenModalUser}
                    toggleUserModal={this.toggleUserModal}
                    createNewUser={this.createNewUser}
                    clearState={this.state.clearState}
                    clearStateValue={this.clearStateValue}
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
                                                    onClick={() => this.handleDeleteUser(item.id)}
                                                >
                                                    <i className="far fa-edit" />
                                                </button>
                                                <button className='btn-delete'>
                                                    <i className="far fa-trash-alt" />
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
