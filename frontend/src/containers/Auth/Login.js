import React from "react";
import './Login.scss';

class Login extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
            isShowHidePassword: false
        }
    }

    handleInputChange = (event) => {
        const fieldName = event.target.name;
        this.setState({
            [fieldName]: event.target.value
        });
    }

    handleLogin = (event) => {
        // event.preventDefault()

        alert(`username: ${this.state.username} password: ${this.state.password}`)

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
                                    onClick={() => this.handleShowHidePassword()}
                                >
                                    {!isShowHidePassword
                                        ?
                                        <i className="fa fa-eye" />
                                        :
                                        <i className="fa fa-eye-slash" />
                                    }
                                </span>
                            </div>
                        </div>
                        <div className="col-12">
                            <button
                                className="btn-login"
                                onClick={(event) => this.handleLogin(event)}
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
                            <i className="fa fa-google-plus" />
                            <i className="fa fa-facebook" />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login;