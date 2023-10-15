import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import './HomeHeader.scss';

class HomeHeader extends Component {

    render() {
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
                                <div><b>Chuyên khoa</b></div>
                                <div className='subs-title'>Tìm bác sĩ theo chuyên khoa</div>
                            </div>
                            <div className='child-content'>
                                <div><b>Cơ sở y tế</b></div>
                                <div className='subs-title'>Chọn bệnh viện phòng khám</div>
                            </div>
                            <div className='child-content'>
                                <div><b>Bác sĩ</b></div>
                                <div className='subs-title'>Chọn bác sĩ giỏi</div>
                            </div>
                            <div className='child-content'>
                                <div><b>Gói khám</b></div>
                                <div className='subs-title'>Khám sức khỏe tổng quát</div>
                            </div>
                        </div>
                        <div className='right-content'>
                            <div className='support'>
                                <i className="fas fa-question-circle" />
                                Hỗ trợ
                            </div>
                            <div className='flag'>VN</div>
                        </div>
                    </div>
                </div>
                <div className='home-header-banner'>
                    <div className='content-up'>
                        <div className='title1'>
                            NỀN TẢNG Y TẾ
                        </div>
                        <div className='title2'>
                            CHĂM SÓC SỨC KHỎE TOÀN DIỆN
                        </div>
                        <div className='search'>
                            <i className="fas fa-search" />
                            <input
                                type='text'
                                placeholder='Tìm chuyên khoa khám bệnh'
                            />
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
                                        Khám
                                        <br />
                                        Chuyên khoa
                                    </div>
                                </li>
                                <li>
                                    <div className='option-icon'>
                                        <i class="fas fa-mobile-alt"></i>
                                    </div>
                                    <div className='option-child'>
                                        Khám
                                        <br />
                                        từ xa
                                    </div>
                                </li>
                                <li>
                                    <div className='option-icon'>
                                        <i class="fas fa-procedures"></i>
                                    </div>
                                    <div className='option-child'>
                                        Khám
                                        <br />
                                        tổng quát
                                    </div>
                                </li>
                                <li>
                                    <div className='option-icon'>
                                        <i class="fas fa-vial"></i>
                                    </div>
                                    <div className='option-child'>
                                        Xét nghiệm
                                        <br />
                                        y học
                                    </div>
                                </li>
                                <li>
                                    <div className='option-icon'>
                                        <i class="fas fa-user-md"></i>
                                    </div>
                                    <div className='option-child'>
                                        Sức khỏe
                                        <br />
                                        tinh thần
                                    </div>
                                </li>
                                <li>
                                    <div className='option-icon'>
                                        <i class="fas fa-stethoscope"></i>
                                    </div>
                                    <div className='option-child'>
                                        Khám
                                        <br />
                                        nha khoa
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
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
