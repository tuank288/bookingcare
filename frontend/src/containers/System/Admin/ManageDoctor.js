import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';
import './ManageDoctor.scss';

import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import Select from 'react-select';
import { CRUD_ACTIONS, LANGUAGES } from '../../../utils';
import { getDetailInforDoctor } from '../../../services/userService';
import { toast } from 'react-toastify';
import _ from 'lodash'


const mdParser = new MarkdownIt(/* Markdown-it options */);

const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
];

class ManageDoctor extends Component {

    constructor(props) {
        super(props)
        this.state = {
            //save to Mardown table
            contentMarkdown: '',
            contentHTML: '',
            selectedDoctor: '',
            description: '',
            listDoctors: [],
            hasOldData: false,

            //save to doctor-infor table
            listPrice: [],
            listPayment: [],
            listProvince: [],
            selectedPrice: '',
            selectedPayment: '',
            selectedProvince: '',
            nameClinic: '',
            addressClinic: '',
            note: ''
        }
    }

    componentDidMount() {
        this.props.fetchAllDoctors();
        this.props.getRequireDoctorInfor()
    }

    buildDataInputSelect = (data, type) => {
        let result = [];
        let { language } = this.props;
        if (data && data.length > 0) {
            if (type === 'USERS') {
                data.map((item, index) => {
                    let object = {};
                    let labelVi = `${item.lastName} ${item.firstName}`;
                    let labelEn = `${item.firstName} ${item.lastName}`;
                    object.label = language === LANGUAGES.VI ? labelVi : labelEn
                    object.value = item.id
                    result.push(object)
                })
            }
            if (type === 'PRICE') {
                data.map((item, index) => {
                    let object = {};
                    let labelVi = `${item.valueVi}`;
                    let labelEn = `${item.valueEn} USD`;
                    object.label = language === LANGUAGES.VI ? labelVi : labelEn
                    object.value = item.keyMap
                    result.push(object)
                })
            }
            if (type === 'PAYMENT' || type === 'PROVINCE') {
                data.map((item, index) => {
                    let object = {};
                    object.label = language === LANGUAGES.VI ? item.valueVi : item.valueEn
                    object.value = item.keyMap
                    result.push(object)
                })
            }
        }
        return result;
    }

    async componentDidUpdate(prevProps, prevState) {
        if (prevProps.allDoctors !== this.props.allDoctors) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors, 'USERS')
            this.setState({
                listDoctors: dataSelect
            })
        }

        if (prevProps.allRequiredDoctorInfor !== this.props.allRequiredDoctorInfor) {
            let { resPayment, resPrice, resProvince } = this.props.allRequiredDoctorInfor;
            let dataSelectPayment = this.buildDataInputSelect(resPayment, 'PAYMENT')
            let dataSelectPrice = this.buildDataInputSelect(resPrice, 'PRICE')
            let dataSelectProvince = this.buildDataInputSelect(resProvince, 'PROVINCE')

            this.setState({
                listPrice: dataSelectPrice,
                listPayment: dataSelectPayment,
                listProvince: dataSelectProvince,
            })

        }

        if (prevProps.language !== this.props.language) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors, 'USERS')
            let { resPayment, resPrice, resProvince } = this.props.allRequiredDoctorInfor;
            let dataSelectPayment = this.buildDataInputSelect(resPayment, 'PAYMENT')
            let dataSelectPrice = this.buildDataInputSelect(resPrice, 'PRICE')
            let dataSelectProvince = this.buildDataInputSelect(resProvince, 'PROVINCE')

            this.setState({
                listDoctors: dataSelect,
                listPrice: dataSelectPrice,
                listPayment: dataSelectPayment,
                listProvince: dataSelectProvince,
            })
        }
    }

    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentMarkdown: text,
            contentHTML: html
        })
    }

    handleSaveContentDoctor = () => {
        let { hasOldData } = this.state;
        let { contentHTML, contentMarkdown, description, selectedDoctor,
            selectedPrice, selectedPayment, selectedProvince, nameClinic,
            addressClinic, note
        } = this.state;

        if (!contentHTML || !contentMarkdown || !selectedDoctor || !selectedPrice
            || !selectedPayment || !selectedProvince || !nameClinic || !addressClinic
            || !note) {
            toast.error('Missing parameter')
            return
        } else {
            this.props.saveDetailDoctor({
                contentHTML: contentHTML,
                contentMarkdown: contentMarkdown,
                description: description,
                doctorId: selectedDoctor.value,
                action: hasOldData ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE,
                selectedPrice: selectedPrice.value,
                selectedPayment: selectedPayment.value,
                selectedProvince: selectedProvince.value,
                nameClinic: nameClinic,
                addressClinic: addressClinic,
                note: note
            })

            this.setState({
                contentMarkdown: '',
                contentHTML: '',
                selectedDoctor: '',
                description: '',
                hasOldData: false,
                selectedPrice: '',
                selectedPayment: '',
                selectedProvince: '',
                nameClinic: '',
                addressClinic: '',
                note: ''
            })
        }
    }

    buidlDataDoctorInfor = (data) => {
        console.log('check data', data);
        let result = {};
        let { language } = this.props;
        let labelVi = `${data.priceData.valueVi}`;
        let labelEn = `${data.priceData.valueEn} USD`;
        if (!_.isEmpty(data)) {
            result = {
                selectedPrice: {
                    label: language === LANGUAGES.VI ? labelVi : labelEn,
                    value: data.priceId
                },
                selectedPayment: {
                    label: language === LANGUAGES.VI ? data.paymentData.valueVi : data.paymentData.valueEn,
                    value: data.paymentId
                },
                selectedProvince: {
                    label: language === LANGUAGES.VI ? data.provinceData.valueVi : data.provinceData.valueEn,
                    value: data.provinceId
                },
                addressClinic: data.addressClinic,
                nameClinic: data.nameClinic,
                note: data.note
            }
        }
        return result
    }

    handleChangeSelect = async (selectedDoctor) => {
        this.setState({ selectedDoctor });
        let res = await getDetailInforDoctor(selectedDoctor.value)
        if (res && res.errCode === 0 && res.data && res.data.Markdown) {
            let markdown = res.data.Markdown;
            this.setState({
                contentHTML: markdown.contentHTML,
                contentMarkdown: markdown.contentMarkdown,
                description: markdown.description,
                hasOldData: true,
            })
        } else {
            this.setState({
                contentMarkdown: '',
                contentHTML: '',
                description: '',
                hasOldData: false
            })
        }

        if (res && res.errCode === 0 && !_.isEmpty(res.data.doctorInfor)) {
            let doctorInfor = this.buidlDataDoctorInfor(res.data.doctorInfor)
            this.setState({
                selectedPrice: doctorInfor.selectedPrice,
                selectedPayment: doctorInfor.selectedPayment,
                selectedProvince: doctorInfor.selectedProvince,
                nameClinic: doctorInfor.nameClinic,
                addressClinic: doctorInfor.addressClinic,
                note: doctorInfor.note,
            }, () => { console.log('check doctor', this.state); })
        } else {
            this.setState({
                selectedPrice: '',
                selectedPayment: '',
                selectedProvince: '',
                nameClinic: '',
                addressClinic: '',
                note: ''
            })
        }
    };

    handleChangeSelectDoctorInfor = (selectedOption, nameSelect) => {
        let name = nameSelect.name;
        let stateCopy = { ...this.state };
        stateCopy[name] = selectedOption;
        this.setState({
            ...stateCopy
        })
    }

    handleOnchangeText = (event, id) => {
        let stateCopy = { ...this.state };
        stateCopy[id] = event.target.value;
        this.setState({
            ...stateCopy
        })
    }

    render() {
        let { hasOldData, selectedDoctor } = this.state;
        // console.log(selectedDoctor);
        return (
            <div className='manage-doctor-container'>
                <div className='manage-doctor-title title text-center'>
                    <FormattedMessage id='admin.manage-doctor.title' />
                </div>
                <div className='more-infor'>
                    <div className='content-left form-group'>
                        <label><FormattedMessage id='admin.manage-doctor.choose-doctor' /></label>
                        <Select
                            value={this.state.selectedDoctor}
                            onChange={this.handleChangeSelect}
                            name='selectedDoctor'
                            options={this.state.listDoctors}
                            placeholder={<FormattedMessage id='admin.manage-doctor.choose-doctor' />}
                        />
                    </div>
                    <div className='content-right'>
                        <label><FormattedMessage id='admin.manage-doctor.intro-infor' /></label>
                        <textarea
                            className='form-control'
                            onChange={(event) => this.handleOnchangeText(event, 'description')}
                            value={this.state.description}
                        >
                        </textarea>
                    </div>
                </div>
                <div className='more-infor-extra row'>
                    <div className='col-4 form-group' >
                        <label><FormattedMessage id='admin.manage-doctor.select-price' /></label>
                        <Select
                            value={this.state.selectedPrice}
                            name='selectedPrice'
                            onChange={this.handleChangeSelectDoctorInfor}
                            options={this.state.listPrice}
                            placeholder={<FormattedMessage id='admin.manage-doctor.select-price' />}
                        />
                    </div>
                    <div className='col-4 form-group' >
                        <label><FormattedMessage id='admin.manage-doctor.select-payment' /></label>
                        <Select
                            value={this.state.selectedPayment}
                            name='selectedPayment'
                            onChange={this.handleChangeSelectDoctorInfor}
                            options={this.state.listPayment}
                            placeholder={<FormattedMessage id='admin.manage-doctor.select-payment' />}
                        />
                    </div>
                    <div className='col-4 form-group' >
                        <label><FormattedMessage id='admin.manage-doctor.select-province' /></label>
                        <Select
                            value={this.state.selectedProvince}
                            name='selectedProvince'
                            onChange={this.handleChangeSelectDoctorInfor}
                            options={this.state.listProvince}
                            placeholder={<FormattedMessage id='admin.manage-doctor.select-province' />}
                        />
                    </div>
                    <div className='col-4 form-group' >
                        <label><FormattedMessage id='admin.manage-doctor.name-clinic' /></label>
                        <input
                            className='form-control'
                            onChange={(event) => this.handleOnchangeText(event, 'nameClinic')}
                            value={this.state.nameClinic}
                        />
                    </div>
                    <div className='col-4 form-group' >
                        <label><FormattedMessage id='admin.manage-doctor.address-clinic' /></label>
                        <input
                            className='form-control'
                            onChange={(event) => this.handleOnchangeText(event, 'addressClinic')}
                            value={this.state.addressClinic}
                        />
                    </div>
                    <div className='col-4 form-group' >
                        <label><FormattedMessage id='admin.manage-doctor.note' /></label>
                        <input className='form-control'
                            onChange={(event) => this.handleOnchangeText(event, 'note')}
                            value={this.state.note}
                        />
                    </div>
                </div>

                <div className='manage-doctor-editor'>
                    <MdEditor
                        style={{ height: '500px' }}
                        renderHTML={text => mdParser.render(text)}
                        onChange={this.handleEditorChange}
                        value={this.state.contentMarkdown}
                    />
                </div>
                <button
                    className={hasOldData ? 'save-content-doctor' : 'create-content-doctor'}
                    onClick={this.handleSaveContentDoctor}
                >
                    {hasOldData ?
                        <span>
                            <FormattedMessage id='admin.manage-doctor.save-infor' />
                        </span>
                        :
                        <span>
                            <FormattedMessage id='admin.manage-doctor.create-infor' />
                        </span>
                    }
                </button>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        allDoctors: state.admin.allDoctors,
        allRequiredDoctorInfor: state.admin.allRequiredDoctorInfor
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getRequireDoctorInfor: () => dispatch(actions.getRequireDoctorInfor()),
        fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
        saveDetailDoctor: (data) => dispatch(actions.saveDetailDoctor(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
