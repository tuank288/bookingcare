import React from "react";
import { connect } from 'react-redux';
import { push } from "connected-react-router";
import * as actions from "../../store/actions";
import { FormattedMessage } from 'react-intl';
import './Login.scss';
import { handleLogin } from "../../services/userService";

class Login extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
            isShowHidePassword: false,
            errMessage: ''
        }
    }

    handleInputChange = (event) => {
        let copyState = { ...this.state };
        let fieldName = event.target.name;
        copyState[fieldName] = event.target.value;
        this.setState({
            ...copyState
        });
    }

    handleLogin = async () => {
        this.setState({
            errMessage: ''
        })
        try {
            let data = await handleLogin(this.state.username, this.state.password)
            if (data && data.errCode !== 0) {
                this.setState({
                    errMessage: data.message
                })
            }
            if (data && data.errCode === 0) {
                this.props.userLoginSuccess(data.user)
            }
        } catch (error) {
            if (error.response) {
                if (error.response.data) {
                    this.setState({
                        errMessage: error.response.data.message
                    })
                }
            }
        }
    }

    handleShowHidePassword = () => {
        this.setState({
            isShowHidePassword: !this.state.isShowHidePassword
        })
    }

    render() {

        let { isShowHidePassword } = this.state
        return (
            <div className="login-background">
                <div className="login-container">
                    <div className="login-content row">
                        <div className="col-12 text-center text-login">
                            Login
                        </div>
                        <div className="col-12 form-group login-input">
                            <label>Username</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Username"
                                value={this.state.username}
                                name="username"
                                onChange={this.handleInputChange}
                            />
                        </div>
                        <div className="col-12 form-group login-input">
                            <label>Password</label>
                            <div className="custom-input-password">
                                <input
                                    type={!isShowHidePassword ? 'password' : 'text'}
                                    className="form-control"
                                    placeholder="Password"
                                    name="password"
                                    value={this.state.password}
                                    onChange={this.handleInputChange}
                                />
                                <span
                                    onClick={this.handleShowHidePassword}
                                    style={{ display: this.state.password ? 'block' : 'none' }}
                                >
                                    {!isShowHidePassword
                                        ?
                                        <i className="fa fa-eye-slash" />
                                        :
                                        <i className="fa fa-eye" />
                                    }
                                </span>
                            </div>
                        </div>
                        <div className="col-12" style={{ color: 'red' }}>
                            {this.state.errMessage}
                        </div>
                        <div className="col-12">
                            <button
                                className="btn-login"
                                onClick={this.handleLogin}
                            >
                                Login
                            </button>
                        </div>
                        <div className="col-12 mt-2">
                            <span className="forgot-password">Forgot your password ?</span>
                        </div>
                        <div className="col-12 text-center order-login mt-3">
                            <span className="">Or Login with:</span>
                        </div>
                        <div className="col-12 social-login">
                            <i className="fab fa-google-plus-g" />
                            <i className="fab fa-facebook-f" />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        // userLoginFail: () => dispatch(actions.adminLoginFail()),
        userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
