import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { emitter } from '../../utils/Emitter';

class ModalUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: '',
        }
        this.dataUserId();
        this.listenToEmitter();
    }

    dataUserId = () => {
        emitter.on('EVENT_UPDATE_USER', async (res) => {
            let data = res.users
            let copyState = { ...this.state };
            copyState = {
                email: data.email,
                firstName: data.firstName,
                lastName: data.lastName,
                address: data.address,
            }
            this.setState({
                ...copyState
            })
        })
    }

    listenToEmitter() {
        emitter.on('EVENT_CLEAR_MODAL_DATA', () => {
            this.setState({
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                address: ''
            })
        })
    }

    componentDidMount() {

    }

    componentWillUnmount() {
        // fix Warning: Can't perform a React state update on an unmounted component
        this.setState = (state, callback) => {
            return;
        };
    }

    toggle = () => {
        this.props.toggleUserModal()
        this.setState({
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: ''
        })
    }

    handleOnChange = (event) => {
        let fieldName = event.target.name;
        let copyState = { ...this.state }
        copyState[fieldName] = event.target.value;
        this.setState({
            ...copyState
        })
    }

    checkValidateInput = (userId) => {
        let isValue = true;
        let arrInput = [];
        if (userId) {
            arrInput = ['email', 'firstName', 'lastName', 'address'];
        } else {
            arrInput = ['email', 'password', 'firstName', 'lastName', 'address'];
        }
        for (let i = 0; i < arrInput.length; i++) {
            if (!this.state[arrInput[i]]) {
                isValue = false;
                alert('Missing parameter: ' + arrInput[i]);
                break;
            }
        }
        return isValue;
    }

    handleAddNewUser = async () => {
        let isValid = this.checkValidateInput(this.props.userId);
        if (this.props.userId) {
            if (isValid) {
                let data = { ...this.state };
                delete data.password;
                this.props.updateUser(data)
            }
            return;
        }
        if (isValid) {
            this.props.createNewUser(this.state);
        }
    }

    render() {
        let { userId } = this.props;
        return (
            <Modal
                isOpen={this.props.isOpenModalUser}
                toggle={this.toggle}
                className={'modal-user-container'}
                size='lg'
            >
                <ModalHeader toggle={this.toggle}>
                    {userId ?
                        'Update user'
                        :
                        'Create new user'
                    }
                </ModalHeader>
                <ModalBody>
                    <div className='modal-user-body'>
                        <div className='input-container'>
                            <label>Email</label>
                            <input type='text'
                                placeholder='Email'
                                name='email'
                                onChange={this.handleOnChange}
                                value={this.state.email}
                                readOnly={userId ? true : false}
                            />
                        </div>
                        <div className='input-container' style={{ visibility: userId ? 'hidden' : 'visible' }}>
                            <label>Password</label>
                            <input
                                type='password'
                                placeholder='Password'
                                name='password'
                                onChange={this.handleOnChange}
                                value={this.state.password}
                                readOnly={userId ? true : false}
                            />
                        </div>
                        <div className='input-container'>
                            <label>First name</label>
                            <input type='text'
                                placeholder='First name'
                                name='firstName'
                                onChange={this.handleOnChange}
                                value={this.state.firstName}
                            />
                        </div>
                        <div className='input-container'>
                            <label>Last name</label>
                            <input
                                type='text'
                                placeholder='Last name'
                                name='lastName'
                                onChange={this.handleOnChange}
                                value={this.state.lastName}
                            />
                        </div>
                        <div className='input-container'>
                            <label>Address</label>
                            <input
                                type='text'
                                placeholder='Address'
                                name='address'
                                onChange={this.handleOnChange}
                                value={this.state.address}
                            />
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" className='px-2' onClick={this.handleAddNewUser}>
                        {userId ?
                            'Save'
                            :
                            'Add new'
                        }
                    </Button>{' '}
                    <Button color="secondary" className='px-2' onClick={this.toggle}>
                        Close
                    </Button>
                </ModalFooter>
            </Modal>
        )
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);
