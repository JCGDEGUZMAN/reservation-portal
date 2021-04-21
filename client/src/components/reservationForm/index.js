import React, { useState, useEffect  } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import './index.scss';

import { Form, Input, Button, Row, Col, DatePicker, Upload, Select } from 'antd';

import { submitReservation } from '../../actions';

const { Option } = Select;

const ReservationForm = (props) => {
    const formRef = React.createRef();
    const [canSubmit, setCanSubmit] = useState(true);

    const { psid } = useParams();
    const { reservationLoading, reservationSuccess } = props;

    useEffect(() => {
        (function(d, s, id){
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) {return;}
            js = d.createElement(s); js.id = id;
            js.src = "//connect.facebook.net/en_US/messenger.Extensions.js";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'Messenger'));

        window.extAsyncInit = function() {
        // the Messenger Extensions JS SDK is done loading 
        };

        if(reservationSuccess){
            formRef.current.resetFields();
            handleWebviewClose();
        }
    }, [props,formRef])
    
    const handleWebviewClose = () => {
        window.MessengerExtensions.requestCloseBrowser(function success() {
          // webview closed
          console.log('messenger_extention_success')
        }, function error(err) {
          // an error occurred
          console.log('messenger_extention_error', err)
        });
    }

    const onFinish = async (values) => {

        const reservation = {
            fullName: values.fullName,
            bedNumber: values.bedNumber,
            dateFrom: moment(values.dateFrom).format('YYYY-MM-DD hh:mm:ss'),
            dateTo: moment(values.dateTo).format('YYYY-MM-DD hh:mm:ss'),
            noOfDays:  moment(values.dateTo).diff(moment(values.dateFrom), 'days'),
            validId: values.validId.file.thumbUrl,
            psId: psid,
            messengerId: '1234567890'
        }
  
        await props.onSubmitReservation(reservation);
    };

    const uploadTriggered = ({ file, fileList }) => {
        setCanSubmit(false);

        if (file.status !== 'uploading') {
            setCanSubmit(true);
        }
    }

    return(
        <Row align='middle' justify='center'>
            <Col xs={24} sm={24} md={24} lg={12}>
                <Form
                    name="reservation_form"
                    className="reservation-form"
                    initialValues={{ 
                        bedNumber: 1
                    }}
                    onFinish={onFinish}
                    ref={formRef}
                >
                    <h4>Full Name (e.g. Juan Dela Cruz):</h4>
                    <Form.Item
                        name="fullName"
                        rules={[{ 
                            required: true, 
                            message: 'Please fill out this field!' 
                        }]}
                    >
                        <Input placeholder="Full Name" />
                    </Form.Item>
                    <h4>Number Of Bed(s):</h4>
                    <Form.Item
                        name="bedNumber"
                        rules={[{   
                            required: true, 
                            message: 'Please fill out this field!',
                        }]}
                    >
                        <Select defaultValue={1} style={{ width: '100%' }}>
                            <Option value={1}>1</Option>
                            <Option value={2}>2</Option>
                            <Option value={3}>3</Option>
                            <Option value={4}>4</Option>
                            <Option value={5}>5</Option>
                        </Select>
                    </Form.Item>
                    <Row gutter={16}>
                        <Col xs={24} sm={24} md={12} lg={12}>
                            <h4>Date From:</h4>
                            <Form.Item
                                name="dateFrom"
                                rules={[{   
                                    required: true, 
                                    message: 'Please fill out this field!',
                                }]}
                            >
                                <DatePicker 
                                style={{ width: '100%' }}
                                />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={12} lg={12}>
                            <h4>Date To:</h4>
                            <Form.Item
                                name="dateTo"
                                rules={[{   
                                    required: true, 
                                    message: 'Please fill out this field!',
                                }]}
                            >
                                <DatePicker 
                                    style={{ width: '100%' }}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <h4>Valid Government Id (e.g. Philhealth, Driver's Licence etc.):</h4>
                    <Form.Item
                        name="validId"
                        rules={[{   
                            required: true, 
                            message: 'Please upload a file!',
                        }]}
                    >
                        <Upload
                            action = 'https://www.mocky.io/v2/5cc8019d300000980a055e76'
                            listType = 'picture'
                            maxCount = {1}
                            onChange = {(object) => uploadTriggered(object)}
                        >
                            <Button>Click to Upload</Button>
                        </Upload>
                    </Form.Item>
                    <Form.Item>
                        <Button 
                            type="primary" 
                            htmlType="submit" 
                            className="reservation-form-button"
                            block
                            loading={!canSubmit || reservationLoading}
                        >
                            BOOK NOW
                        </Button>
                    </Form.Item>
                </Form>
            </Col>
        </Row>
    );
}

function mapStateToProps(state) {
    return {
        reservationList: state.submitReservation.reservationList,
        reservationLoading: state.submitReservation.reservationLoading,
        reservationSuccess: state.submitReservation.reservationSuccess,
        reservationFailed: state.submitReservation.reservationFailed,
    }
}
  
function mapDispatchToProps(dispatch) {
    return {
        onSubmitReservation: (data) => dispatch(submitReservation(data)),
    }
}
  
export default connect(mapStateToProps, mapDispatchToProps)(ReservationForm);