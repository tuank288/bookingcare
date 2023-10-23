import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { getAllCodeService } from '../../../services/userService';
import { LANGUAGES } from '../../../utils';
import * as actions from '../../../store/actions';

class UserRedux extends Component {
    constructor(props) {
        super(props);
        this.state = {
            genderArr: [],
            positionArr: [],
            roleArr: []
        }
    }

    async componentDidMount() {
        this.props.getGenderStart();
        // try {
        //     let addCodeArr = ['gender', 'position', 'role'];
        //     let stateArr = ['genderArr', 'positionArr', 'roleArr']
        //     for (let i = 0; i < addCodeArr.length; i++) {
        //         let res = await getAllCodeService(addCodeArr[i]);
        //         if (res && res.errCode === 0) {
        //             this.setState({
        //                 [stateArr[i]]: res.data
        //             })
        //         }
        //     }
        // } catch (e) {
        //     console.log(e);
        // }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.genders !== this.props.genders || prevProps.positions !== this.props.positions || prevProps.roles !== this.props.roles) {
            this.setState({
                genderArr: this.props.genders,
                positionArr: this.props.positions,
                roleArr: this.props.roles
            })
        }
    }

    render() {
        let { genderArr, positionArr, roleArr } = this.state;
        let language = this.props.language;
        return (
            <div className='user-redux-container'>
                <div className='title'>
                    User Redux
                </div>
                <div className="user-redux-body" >
                    <div className='container'>
                        <div className='row'>
                            <div className="row g-3">
                                <div className='col-12'><FormattedMessage id='manage-user.add' /></div>
                                <div className="col-md-3">
                                    <label className="form-label"><FormattedMessage id='manage-user.email' /></label>
                                    <FormattedMessage id='manage-user.enter-email'>
                                        {placeholder =>
                                            <input type="email" className="form-control" placeholder={placeholder} />
                                        }
                                    </FormattedMessage>
                                </div>
                                <div className="col-md-3">
                                    <label className="form-label"><FormattedMessage id='manage-user.password' /></label>
                                    <FormattedMessage id='manage-user.enter-password'>
                                        {placeholder =>
                                            <input type="password" className="form-control" placeholder={placeholder} />
                                        }
                                    </FormattedMessage>
                                </div>
                                <div className="col-md-3">
                                    <label className="form-label"><FormattedMessage id='manage-user.first-name' /></label>
                                    <FormattedMessage id='manage-user.enter-first-name'>
                                        {placeholder =>
                                            <input type="text" className="form-control" placeholder={placeholder} />
                                        }
                                    </FormattedMessage>
                                </div>
                                <div className="col-md-3">
                                    <label className="form-label"><FormattedMessage id='manage-user.last-name' /></label>
                                    <FormattedMessage id='manage-user.enter-last-name'>
                                        {placeholder =>
                                            <input type="text" className="form-control" placeholder={placeholder} />
                                        }
                                    </FormattedMessage>
                                </div>
                                <div className="col-md-3">
                                    <label className="form-label"><FormattedMessage id='manage-user.phone-number' /></label>
                                    <FormattedMessage id='manage-user.enter-phone-number'>
                                        {placeholder =>
                                            <input type="text" className="form-control" placeholder={placeholder} />
                                        }
                                    </FormattedMessage>
                                </div>
                                <div className="col-9">
                                    <label className="form-label"><FormattedMessage id='manage-user.address' /></label>
                                    <FormattedMessage id='manage-user.enter-address'>
                                        {placeholder =>
                                            <input type="text" className="form-control" placeholder={placeholder} />
                                        }
                                    </FormattedMessage>
                                </div>
                                <div className="col-md-3">
                                    <label className="form-label"><FormattedMessage id='manage-user.gender' /></label>
                                    <select className="form-select">
                                        {genderArr && genderArr.length > 0 &&
                                            genderArr.map((item, index) => {
                                                return (
                                                    <option key={index}>{language === LANGUAGES.VI ? item.valueVi : item.valueEn}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                                <div className="col-md-3">
                                    <label className="form-label"><FormattedMessage id='manage-user.role' /></label>
                                    <select className="form-select">
                                        {roleArr && roleArr.length > 0 &&
                                            roleArr.map((item, index) => {
                                                return (
                                                    <option key={index}>{language === LANGUAGES.VI ? item.valueVi : item.valueEn}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                                <div className="col-md-3">
                                    <label className="form-label"><FormattedMessage id='manage-user.position' /></label>
                                    <select className="form-select">
                                        {positionArr && positionArr.length > 0 &&
                                            positionArr.map((item, index) => {
                                                return (
                                                    <option key={index}>{language === LANGUAGES.VI ? item.valueVi : item.valueEn}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                                <div className="col-md-3">
                                    <label className="form-label"><FormattedMessage id='manage-user.image' /></label>
                                    <input type="text" className="form-control" />
                                </div>
                                <div className="col-12">
                                    <button type="submit" className="btn btn-primary"><FormattedMessage id='manage-user.save' /></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genders: state.admin.genders,
        positions: state.admin.positions,
        roles: state.admin.roles
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart())
        // processLogout: () => dispatch(actions.processLogout()),
        // changeLanguageApp: (language) => dispatch(actions.changeLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
