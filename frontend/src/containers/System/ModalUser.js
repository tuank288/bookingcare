import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class ModalUser extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount() {
    }

    toggle = () => {
        this.props.toggleUserModal()
    }


    render() {
        console.log('check props', this.props);
        console.log('check open modal', this.props.isOpenModalUser);
        return (
            <Modal
                isOpen={this.props.isOpenModalUser}
                toggle={() => this.toggle()}
                className={'modal-user-container'}
                size='lg'
            >
                <ModalHeader toggle={() => this.toggle()}>
                    Create new user
                </ModalHeader>
                <ModalBody>
                    <div className='modal-user-body'>
                        <div className='input-container'>
                            <label>Email</label>
                            <input type='text'
                                placeholder='Email'
                            />
                        </div>
                        <div className='input-container'>
                            <label>Password</label>
                            <input
                                type='password'
                                placeholder='Password'
                            />
                        </div>
                        <div className='input-container'>
                            <label>First name</label>
                            <input type='text'
                                placeholder='First name'
                            />
                        </div>
                        <div className='input-container'>
                            <label>Last name</label>
                            <input
                                type='text'
                                placeholder='Last name'
                            />
                        </div>
                        <div className='input-container'>
                            <label>Address</label>
                            <input
                                type='text'
                                placeholder='Address'
                            />
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" className='px-2' onClick={() => this.toggle()}>
                        Save changes
                    </Button>{' '}
                    <Button color="secondary" className='px-2' onClick={() => this.toggle()}>
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
