import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';
import './ManageDoctor.scss';

import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import Select from 'react-select';

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
            contentMarkdown: '',
            contentHTML: '',
            selectedDoctor: '',
            descriptiton: ''
        }
    }

    componentDidMount() {
    }

    componentDidUpdate(prevProps, prevState) {

    }

    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentMarkdown: html,
            contentHTML: text
        })
    }

    handleSaveContentDoctor = () => {
        console.log('check state', this.state);
    }

    handleChange = (selectedDoctor) => {
        this.setState({ selectedDoctor });
    };

    handleOnchangeDesc = (event) => {
        this.setState({
            descriptiton: event.target.value
        })
    }

    render() {

        return (
            <div className='manage-doctor-container'>
                <div className='manage-doctor-title title text-center'>
                    Thêm thông tin doctor
                </div>
                <div className='more-infor'>
                    <div className='content-left form-group'>
                        <label>Chọn bác sĩ</label>
                        <Select
                            defaultValue={this.state.selectedDoctor}
                            onChange={this.handleChange}
                            options={options}
                        />
                    </div>
                    <div className='content-right'>
                        <label>Thông tin giới thiệu:</label>
                        <textarea
                            className='form-control'
                            rows="4"
                            onChange={(event) => this.handleOnchangeDesc(event)}
                            value={this.state.descriptiton}
                        >
                            fsd
                        </textarea>
                    </div>
                </div>

                <div className='manage-doctor-editor'>
                    <MdEditor
                        style={{ height: '500px' }}
                        renderHTML={text => mdParser.render(text)}
                        onChange={this.handleEditorChange}
                    />
                </div>
                <button
                    className='save-content-doctor'
                    onClick={this.handleSaveContentDoctor}
                >
                    Lưu thông tin
                </button>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        users: state.admin.users
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchUserRedux: () => dispatch(actions.fetchAllUserStart()),
        deleteUser: (id) => dispatch(actions.deleteUser(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
