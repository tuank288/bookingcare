import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import './HomeHeader.scss';
import { FormattedMessage } from 'react-intl';
import { LANGUAGE } from '../../utils/constant';
import { changeLanguageApp } from '../../store/actions';

class HomeHeader extends Component {

    changeLanguage = (language) => {
        this.props.changeLanguageApp(language)
    }

    render() {
        let language = this.props.language;
        return (
            <>
                <div className='home-header-container'>
                    <div className='home-header-content'>
                        <div className='left-content'>
                            <i className="fas fa-bars" />
                            <div className='header-logo'>

                            </div>
                        </div>
                        <div className='center-content'>
                            <div className='child-content'>
                                <div><b><FormattedMessage id="homeheader.specialty" /></b></div>
                                <div className='subs-title'><FormattedMessage id="homeheader.searchdoctor" /></div>
                            </div>
                            <div className='child-content'>
                                <div><b><FormattedMessage id="homeheader.health-facility" /></b></div>
                                <div className='subs-title'><FormattedMessage id="homeheader.select-rom" /></div>
                            </div>
                            <div className='child-content'>
                                <div><b><FormattedMessage id="homeheader.doctor" /></b></div>
                                <div className='subs-title'><FormattedMessage id="homeheader.select-doctor" /></div>
                            </div>
                            <div className='child-content'>
                                <div><b><FormattedMessage id="homeheader.fee" /></b></div>
                                <div className='subs-title'><FormattedMessage id="homeheader.check-health" /></div>
                            </div>
                        </div>
                        <div className='right-content'>
                            <div className='support'>
                                <i className="fas fa-question-circle" />
                                <span><FormattedMessage id="homeheader.support" /></span>
                            </div>
                            <div className='language'>
                                <div className={language === LANGUAGE.VI ? 'language-vi active' : 'language-vi'}>
                                    <span onClick={() => this.changeLanguage(LANGUAGE.VI)}>VN</span>
                                </div>
                                <div className={language === LANGUAGE.EN ? 'language-en active' : 'language-en'}>
                                    <span onClick={() => this.changeLanguage(LANGUAGE.EN)}>EN</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div >
                <div className='home-header-banner'>
                    <div className='content-up'>
                        <div className='title1'>
                            <FormattedMessage id="banner.title1" />
                        </div>
                        <div className='title2'>
                            <FormattedMessage id="banner.title2" />
                        </div>
                        <div className='search'>
                            <i className="fas fa-search" />
                            <FormattedMessage id="banner.find-specialist">
                                {placeholder =>
                                    <input placeholder={placeholder} />
                                }
                            </FormattedMessage>
                        </div>
                    </div>
                    <div className='content-down'>
                        <div className='option'>
                            <ul>
                                <li>
                                    <div className='option-icon'>
                                        <i className="fas fa-hospital" />
                                    </div>
                                    <div className='option-child'>
                                        <FormattedMessage id="banner.specialist-examination" />
                                    </div>
                                </li>
                                <li>
                                    <div className='option-icon'>
                                        <i className="fas fa-mobile-alt"></i>
                                    </div>
                                    <div className='option-child'>
                                        <FormattedMessage id="banner.remote-consultation" />
                                    </div>
                                </li>
                                <li>
                                    <div className='option-icon'>
                                        <i className="fas fa-procedures"></i>
                                    </div>
                                    <div className='option-child'>
                                        <FormattedMessage id="banner.general-examination" />
                                    </div>
                                </li>
                                <li>
                                    <div className='option-icon'>
                                        <i className="fas fa-flask"></i>
                                    </div>
                                    <div className='option-child'>
                                        <FormattedMessage id="banner.medical-testing" />
                                    </div>
                                </li>
                                <li>
                                    <div className='option-icon'>
                                        <i className="fas fa-user-md"></i>
                                    </div>
                                    <div className='option-child'>
                                        <FormattedMessage id="banner.mental-health" />
                                    </div>
                                </li>
                                <li>
                                    <div className='option-icon'>
                                        <i className="fas fa-stethoscope"></i>
                                    </div>
                                    <div className='option-child'>
                                        <FormattedMessage id="banner.dental-check-up" />
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeLanguageApp: (language) => dispatch(changeLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
