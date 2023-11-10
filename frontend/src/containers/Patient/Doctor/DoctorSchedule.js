import React, { Component } from 'react';
import { connect } from "react-redux";
import './DoctorSchedule.scss';
import { getScheduleDoctorByDate } from '../../../services/userService';
import { LANGUAGES } from '../../../utils';
import moment from 'moment';
import localization from 'moment/locale/vi';


class DoctorSchedule extends Component {

    constructor(props) {
        super(props)
        this.state = {
            allDays: [],
            allAvailableTime: []
        }
    }

    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    setArrDays = (language) => {
        let arrDates = [];
        for (let i = 0; i < 7; i++) {
            let object = {};
            if (language === LANGUAGES.VI) {
                let labelVi = moment(new Date()).add(i, 'days').format('dddd - DD/MM')
                object.label = this.capitalizeFirstLetter(labelVi)
            } else {
                object.label = moment(new Date()).add(i, 'days').locale('en').format('ddd - DD/MM')
            }
            object.value = moment(new Date()).add(i, 'days').startOf('day').valueOf();
            arrDates.push(object)
        }
        this.setState({
            allDays: arrDates
        })
    }

    componentDidMount() {
        let { language } = this.props;
        this.setArrDays(language);
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
            this.setArrDays(this.props.language);
        }
    }

    handleOnchangeSelect = async (event) => {
        if (this.props.doctorIdFromParent && this.props.doctorIdFromParent !== -1) {
            let doctorId = this.props.doctorIdFromParent
            let date = event.target.value;
            let res = await getScheduleDoctorByDate(doctorId, date)
            if (res && res.errCode === 0) {
                this.setState({
                    allAvailableTime: res.data
                })
            }
        }

    }

    render() {
        let { allDays, allAvailableTime } = this.state;
        let { language } = this.props
        console.log(this.state);
        return (
            <div className='doctor-schedule-container'>
                <div className='all-schedule'>
                    <select onChange={this.handleOnchangeSelect}>
                        {allDays && allDays.length > 0 &&
                            allDays.map((item, index) => {
                                return (
                                    <option value={item.value} key={index}>
                                        {item.label}
                                    </option>
                                )
                            })
                        }
                    </select>
                </div>
                <div className='all-available-time'>
                    <div className='text-calendar'>
                        <span><i className='fas fa-calendar-alt' />Lịch khám</span>
                    </div>
                    <div className='time-content'>
                        {allAvailableTime && allAvailableTime.length > 0 ?
                            allAvailableTime.map((item, index) => {
                                let timeTypeData = language === LANGUAGES.VI ?
                                    item.timeTypeData.valueVi : item.timeTypeData.valueEn;
                                return (
                                    <button key={index}>
                                        {timeTypeData}
                                    </button>
                                )
                            })
                            :
                            <span>Không có lịch hẹn trong thời gian này, vui lòng chọn thời gian khác</span>
                        }

                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
