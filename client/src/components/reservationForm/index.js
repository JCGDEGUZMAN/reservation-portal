import React, { useState, useEffect  } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import './index.scss';

import { Form, Input, Button, Row, Col, InputNumber, DatePicker, Upload } from 'antd';

import { submitReservation } from '../../actions';

const ReservationForm = (props) => {
    const formRef = React.createRef();
    const [canSubmit, setCanSubmit] = useState(true);

    useEffect(() => {
        if(props.reservationSuccess){
            formRef.current.resetFields();
        }
    }, [props])
    

    const onFinish = async (values) => {

        const reservation = {
            fullName: values.fullName,
            bedNumber: values.bedNumber,
            dateFrom: moment(values.dateFrom).format('YYYY-MM-DD hh:mm:ss'),
            dateTo: moment(values.dateFrom).format('YYYY-MM-DD hh:mm:ss'),
            validId: values.validId.file.thumbUrl,
            messengerId: '1234567'
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
                        <InputNumber 
                            min={1} 
                            style={{ width: '100%' }}
                        />
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
                            loading={!canSubmit}
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