import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { LANGUAGES, CRUD_ACTIONS } from '../../../utils';
import * as actions from '../../../store/actions';
import './UserRedux.scss';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import TableManageUser from './TableManageUser';

class UserRedux extends Component {
    constructor(props) {
        super(props);
        this.state = {
            genderArr: [],
            positionArr: [],
            roleArr: [],
            previewImgUrl: '',
            isOpen: false,
            nameImg: '',
            action: '',
            user: {
                id: '',
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                phoneNumber: '',
                address: '',
                gender: '',
                position: '',
                role: '',
                avatar: ''
            }
        }
    }

    async componentDidMount() {
        this.props.getGenderStart();
        this.props.getPositionStart();
        this.props.getRoleStart();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.genders !== this.props.genders) {
            let arrGender = this.props.genders;
            this.setState({
                genderArr: this.props.genders,
                user: {
                    ...this.state.user,
                    gender: arrGender && arrGender.length > 0 ? arrGender[0].key : ''
                }
            })
        }

        if (prevProps.positions !== this.props.positions) {
            let arrPosition = this.props.positions;
            this.setState({
                positionArr: this.props.positions,
                user: {
                    ...this.state.user,
                    position: arrPosition && arrPosition.length > 0 ? arrPosition[0].key : ''
                }
            })
        }

        if (prevProps.roles !== this.props.roles) {
            let arrRole = this.props.roles;
            this.setState({
                roleArr: this.props.roles,
                user: {
                    ...this.state.user,
                    role: arrRole && arrRole.length > 0 ? arrRole[0].key : ''
                }
            })
        }

        if (prevProps.users !== this.props.users) {
            let arrGender = this.props.genders;
            let arrPosition = this.props.positions;
            let arrRole = this.props.roles;
            this.setState({
                action: CRUD_ACTIONS.CREATE,
                user: {
                    id: '',
                    email: '',
                    password: '',
                    firstName: '',
                    lastName: '',
                    phoneNumber: '',
                    address: '',
                    gender: arrGender && arrGender.length > 0 ? arrGender[0].key : '',
                    position: arrPosition && arrPosition.length > 0 ? arrPosition[0].key : '',
                    role: arrRole && arrRole.length > 0 ? arrRole[0].key : '',
                    avatar: ''
                }
            })
        }

    }

    handleOnchangeImage = (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let objectUrl = URL.createObjectURL(file)
            this.setState({
                previewImgUrl: objectUrl,
                nameImg: file.name,
                avatar: file
            })
        }
    }

    openPreviewImage = () => {
        if (!this.state.previewImgUrl) return;
        this.setState({
            isOpen: true,
        })
    }

    onChangeInput = (event) => {
        let copyState = { ...this.state.user };
        let fieldName = event.target.name;
        copyState[fieldName] = event.target.value;
        this.setState({
            user: {
                ...copyState
            }
        })

    }

    checkValidateInput = () => {
        let isValid = true;
        let arrCheck = [];
        if (this.state.action) {
            arrCheck = ['firstName', 'lastName', 'phoneNumber', 'address'];
        } else {
            arrCheck = ['email', 'password', 'firstName',
                'lastName', 'phoneNumber', 'address'];
        }
        for (let i = 0; i < arrCheck.length; i++) {
            if (!this.state.user[arrCheck[i]]) {
                isValid = false;
                alert('Missing param ' + arrCheck[i])
                break;
            }
        }

        return isValid;
    }

    handleSaveUser = () => {
        let isValid = this.checkValidateInput();
        if (!isValid) return;
        let { id, email, password, firstName, lastName,
            address, phoneNumber, gender, role, position, avatar
        } = this.state.user;
        if (this.state.action === CRUD_ACTIONS.EDIT) {
            this.props.editUser({
                id: id,
                firstName: firstName,
                lastName: lastName,
                address: address,
                phoneNumber: phoneNumber,
                gender: gender,
                role: role,
                position: position,
                avatar: avatar
            })
        } else {
            this.props.createNewUser({
                email: email,
                password: password,
                firstName: firstName,
                lastName: lastName,
                address: address,
                phoneNumber: phoneNumber,
                gender: gender,
                role: role,
                position: position,
                avatar: avatar
            })
        }

        this.props.fetchUserRedux();
    }

    handleEditUserFromParent = (user) => {
        this.setState({
            action: CRUD_ACTIONS.EDIT,
            user: {
                id: user.id,
                email: user.email,
                password: '',
                firstName: user.firstName,
                lastName: user.lastName,
                phoneNumber: user.phoneNumber,
                address: user.address,
                gender: user.gender,
                position: user.positionId,
                role: user.roleId,
                avatar: user.image
            }
        })
    }

    cancelUser = () => {
        let arrGender = this.props.genders;
        let arrPosition = this.props.positions;
        let arrRole = this.props.roles;
        this.setState({
            action: CRUD_ACTIONS.CREATE,
            user: {
                id: '',
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                phoneNumber: '',
                address: '',
                gender: arrGender && arrGender.length > 0 ? arrGender[0].key : '',
                position: arrPosition && arrPosition.length > 0 ? arrPosition[0].key : '',
                role: arrRole && arrRole.length > 0 ? arrRole[0].key : '',
                avatar: ''
            }
        })
    }

    render() {
        let { genderArr, positionArr, roleArr } = this.state;
        let { language, isLoading } = this.props;
        let { email, password, firstName, lastName, phoneNumber,
            address, gender, position, role, avatar
        } = this.state.user;
        return (
            <div className='user-redux-container'>
                <div className='title'>
                    User Redux
                </div>
                {isLoading
                    ?
                    <div className="text-center  m-5">
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                    :
                    <>
                        <div className="user-redux-body" >
                            <div className='container'>
                                <div className='row'>
                                    <div className="row g-3">
                                        <h4 className='col-12'>
                                            {this.state.action === CRUD_ACTIONS.CREATE ?
                                                <FormattedMessage id='manage-user.add' />
                                                :
                                                <FormattedMessage id='manage-user.edit' />
                                            }
                                        </h4>
                                        <div className="col-md-3" >
                                            <label className="form-label"><FormattedMessage id='manage-user.email' /></label>
                                            <FormattedMessage id='manage-user.enter-email'>
                                                {placeholder =>
                                                    <input
                                                        type="email"
                                                        className="form-control"
                                                        value={email}
                                                        placeholder={placeholder}
                                                        name='email'
                                                        onChange={this.onChangeInput}
                                                        disabled={this.state.action === CRUD_ACTIONS.EDIT ? true : false}
                                                    />
                                                }
                                            </FormattedMessage>
                                        </div>

                                        <div className="col-md-3" style={{ display: this.state.action === CRUD_ACTIONS.EDIT ? 'none' : '' }}>
                                            <label className="form-label"><FormattedMessage id='manage-user.password' /></label>
                                            <FormattedMessage id='manage-user.enter-password'>
                                                {placeholder =>
                                                    <input
                                                        type="password"
                                                        className="form-control"
                                                        placeholder={placeholder}
                                                        value={password}
                                                        name='password'
                                                        onChange={this.onChangeInput}
                                                    />
                                                }
                                            </FormattedMessage>
                                        </div>
                                        <div className="col-md-3">
                                            <label className="form-label"><FormattedMessage id='manage-user.first-name' /></label>
                                            <FormattedMessage id='manage-user.enter-first-name'>
                                                {placeholder =>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder={placeholder}
                                                        value={firstName}
                                                        name='firstName'
                                                        onChange={this.onChangeInput}
                                                    />
                                                }
                                            </FormattedMessage>
                                        </div>
                                        <div className="col-md-3">
                                            <label className="form-label"><FormattedMessage id='manage-user.last-name' /></label>
                                            <FormattedMessage id='manage-user.enter-last-name'>
                                                {placeholder =>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder={placeholder}
                                                        value={lastName}
                                                        name='lastName'
                                                        onChange={this.onChangeInput}
                                                    />
                                                }
                                            </FormattedMessage>
                                        </div>
                                        <div className="col-md-3">
                                            <label className="form-label"><FormattedMessage id='manage-user.phone-number' /></label>
                                            <FormattedMessage id='manage-user.enter-phone-number'>
                                                {placeholder =>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder={placeholder}
                                                        value={phoneNumber}
                                                        name='phoneNumber'
                                                        onChange={this.onChangeInput}
                                                    />
                                                }
                                            </FormattedMessage>
                                        </div>
                                        <div className="col-9">
                                            <label className="form-label"><FormattedMessage id='manage-user.address' /></label>
                                            <FormattedMessage id='manage-user.enter-address'>
                                                {placeholder =>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder={placeholder}
                                                        value={address}
                                                        name='address'
                                                        onChange={this.onChangeInput}
                                                    />
                                                }
                                            </FormattedMessage>
                                        </div>
                                        <div className="col-md-3">
                                            <label className="form-label"><FormattedMessage id='manage-user.gender' /></label>
                                            <select
                                                className="form-select"
                                                name='gender'
                                                onChange={this.onChangeInput}
                                                value={gender}
                                            >
                                                {genderArr && genderArr.length > 0 &&
                                                    genderArr.map((item, index) => {
                                                        return (
                                                            <option
                                                                key={index}
                                                                value={item.key}
                                                            >
                                                                {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                                            </option>
                                                        )
                                                    })
                                                }
                                            </select>
                                        </div>
                                        <div className="col-md-3">
                                            <label className="form-label"><FormattedMessage id='manage-user.role' /></label>
                                            <select className="form-select"
                                                name='role'
                                                onChange={this.onChangeInput}
                                                value={role}
                                            >
                                                {roleArr && roleArr.length > 0 &&
                                                    roleArr.map((item, index) => {
                                                        return (
                                                            <option
                                                                key={index}
                                                                value={item.key}
                                                            >
                                                                {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                                            </option>
                                                        )
                                                    })
                                                }
                                            </select>
                                        </div>
                                        <div className="col-md-3">
                                            <label className="form-label"><FormattedMessage id='manage-user.position' /></label>
                                            <select className="form-select"
                                                name='position'
                                                onChange={this.onChangeInput}
                                                value={position}
                                            >
                                                {positionArr && positionArr.length > 0 &&
                                                    positionArr.map((item, index) => {
                                                        return (
                                                            <option
                                                                key={index}
                                                                value={item.key}
                                                            >
                                                                {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                                            </option>
                                                        )
                                                    })
                                                }
                                            </select>
                                        </div>
                                        <div className="col-md-3">
                                            <label className="form-label"><FormattedMessage id='manage-user.image' /></label>
                                            <div className='preview-img-container'>
                                                <input
                                                    type="file"
                                                    id='image'
                                                    placeholder='file'
                                                    onChange={(event) => this.handleOnchangeImage(event)}
                                                    hidden
                                                />
                                                <label className='label-upload' htmlFor='image'>
                                                    <span><FormattedMessage id='manage-user.uploadImg' /></span>
                                                    <i className="fas fa-upload" />
                                                </label>
                                                <label
                                                    className='preview-image'
                                                    title={this.state.nameImg}
                                                    onClick={this.openPreviewImage}
                                                >
                                                    {this.state.nameImg}
                                                </label>
                                                {/* <div className='preview-image'
                                                    style={{ backgroundImage: `url(${this.state.previewImgUrl})` }}
                                                    onClick={() => this.openPreviewImage()}
                                                >
                                                </div> */}
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <button
                                                type="submit"
                                                className={this.state.action === CRUD_ACTIONS.EDIT ? "btn btn-warning" : "btn btn-primary"}
                                                onClick={this.handleSaveUser}
                                            >
                                                {this.state.action === CRUD_ACTIONS.EDIT ?
                                                    <FormattedMessage id='manage-user.upload' />
                                                    :
                                                    <FormattedMessage id='manage-user.save' />
                                                }
                                            </button>
                                            {this.state.action === CRUD_ACTIONS.EDIT &&
                                                <button
                                                    type="button"
                                                    className='btn btn-info'
                                                    onClick={this.cancelUser}
                                                >
                                                    <FormattedMessage id='manage-user.cancel' />
                                                </button>
                                            }
                                        </div>
                                    </div>

                                    <div className='col-12 mb-5'>
                                        <TableManageUser
                                            handleEditUserFromParent={this.handleEditUserFromParent}
                                            isEditUser={this.state.isEditUser}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>


                        {this.state.isOpen &&
                            <Lightbox
                                mainSrc={this.state.previewImgUrl}
                                onCloseRequest={() => this.setState({ isOpen: false })}
                            />
                        }
                    </>
                }
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genders: state.admin.genders,
        positions: state.admin.positions,
        roles: state.admin.roles,
        isLoading: state.admin.isLoading,
        users: state.admin.users
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
        getPositionStart: () => dispatch(actions.fetchPositionStart()),
        getRoleStart: () => dispatch(actions.fetchRoleStart()),
        createNewUser: (data) => dispatch(actions.createNewUser(data)),
        fetchUserRedux: () => dispatch(actions.fetchAllUserStart()),
        editUser: (data) => dispatch(actions.editUser(data))
        // processLogout: () => dispatch(actions.processLogout()),
        // changeLanguageApp: (language) => dispatch(actions.changeLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
