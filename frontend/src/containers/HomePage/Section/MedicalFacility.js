import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from "react-slick";
import { FormattedMessage } from 'react-intl';

class MedicalFacility extends Component {

    render() {
        return (
            <div className='section-share section-medical-facility'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span>Cơ sở y tế nổi bật</span>
                        <button className='btn-section'>Xem thêm</button>
                    </div>
                    <div className='section-body'>
                        <Slider {...this.props.settings}>
                            <div className='section-customize'>
                                <div className='bg-image section-medical-facility' ></div>
                                <span>Bệnh viện Chợ Rẫy 1</span>
                            </div>
                            <div className='section-customize'>
                                <div className='bg-image section-medical-facility' ></div>
                                <span>Bệnh viện Chợ Rẫy 2</span>
                            </div>
                            <div className='section-customize'>
                                <div className='bg-image section-medical-facility' ></div>
                                <span>Bệnh viện Chợ Rẫy 3</span>
                            </div>
                            <div className='section-customize'>
                                <div className='bg-image section-medical-facility' ></div>
                                <span>Bệnh viện Chợ Rẫy 4</span>
                            </div>
                            <div className='section-customize'>
                                <div className='bg-image section-medical-facility' ></div>
                                <span>Bệnh viện Chợ Rẫy 5</span>
                            </div>
                            <div className='section-customize'>
                                <div className='bg-image section-medical-facility' ></div>
                                <span>Bệnh viện Chợ Rẫy 6</span>
                            </div>
                        </Slider>
                    </div>
                </div>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(MedicalFacility);
