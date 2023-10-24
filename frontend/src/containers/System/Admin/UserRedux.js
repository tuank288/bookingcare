import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { LANGUAGES } from '../../../utils';
import * as actions from '../../../store/actions';
import './UserRedux.scss';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

class UserRedux extends Component {
    constructor(props) {
        super(props);
        this.state = {
            genderArr: [],
            positionArr: [],
            roleArr: [],
            previewImgUrl: '',
            isOpen: false
        }
    }

    async componentDidMount() {
        this.props.getGenderStart();
        this.props.getPositionStart();
        this.props.getRoleStart();
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

    handleOnchangeImage = (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let objectUrl = URL.createObjectURL(file)
            this.setState({
                previewImgUrl: objectUrl
            })
        }
    }

    openPreviewImage = () => {
        if (!this.state.previewImgUrl) return;
        this.setState({
            isOpen: true,
        })
    }

    render() {
        let { genderArr, positionArr, roleArr } = this.state;
        let { language, isLoading } = this.props;
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
                                            <div className='preview-img-container'>
                                                <input
                                                    type="file"
                                                    id='image'
                                                    placeholder='file'
                                                    onChange={(event) => this.handleOnchangeImage(event)}
                                                    hidden />
                                                <label className='label-upload' htmlFor='image'>Tải ảnh <i className="fas fa-upload" /></label>
                                                <div className='preview-image'
                                                    style={{ backgroundImage: `url(${this.state.previewImgUrl})` }}
                                                    onClick={() => this.openPreviewImage()}
                                                >
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <button type="submit" className="btn btn-primary"><FormattedMessage id='manage-user.save' /></button>
                                        </div>
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
        isLoading: state.admin.isLoading
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
        getPositionStart: () => dispatch(actions.fetchPositionStart()),
        getRoleStart: () => dispatch(actions.fetchRoleStart())
        // processLogout: () => dispatch(actions.processLogout()),
        // changeLanguageApp: (language) => dispatch(actions.changeLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
