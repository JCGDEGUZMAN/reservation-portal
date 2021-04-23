import React, { useState, useEffect  } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import './index.scss';

import { Button, Row, Col, Upload, Card, Tag } from 'antd';
import { UploadOutlined, SaveOutlined } from '@ant-design/icons';

import { updateReservation, loadReservation } from '../../actions';

const { Meta } = Card;

const RoomCard = (props) => {
    const [canSubmit, setCanSubmit] = useState(false);
    const [reservation, setReservation] = useState({});

    const { psid, id } = useParams();

    const { room, 
            price, 
            cover, 
            description,  
            paymentInfo, 
            onUpdateReservation, 
            onLoadReservation, 
            reservationList 
    } = props;

    const getReservation = async() =>{
        await onLoadReservation(id);
    }

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

        getReservation();
        
    }, [])

    useEffect(() => {
        setReservation(reservationList)
    }, [reservationList])
    
    const handleWebviewClose = () => {
        window.MessengerExtensions.requestCloseBrowser(function success() {
          // webview closed
          console.log('messenger_extention_success')
        }, function error(err) {
          // an error occurred
          console.log('messenger_extention_error', err)
        });
    }

    const onFinish = async () => {

        // const reservation = {
        //     psId: psid,
        //     paymentProof: 
        // }

        // await onUpdateReservation(id, reservation);

        handleWebviewClose();
    };

    const uploadTriggered = ({file, fileList}) => {
        setCanSubmit(fileList.length);
    }

    const { status, fullName, dateFrom, dateTo } = reservation;

    return(
        <Row align='middle' justify='center'>
            <Col xs={24} sm={24} md={24} lg={8}>
                <Card
                    style={{ width: '100%' }}
                    className='room-details-card'
                    cover={
                        <img
                            alt={room}
                            src={cover}
                        />
                    }
                    actions={[
                        <Row gutter={24} justify='space-between' align='top' className={status ? 'hide': ''}>
                            <Col span={12}>
                                <Upload
                                    action = 'https://www.mocky.io/v2/5cc8019d300000980a055e76'
                                    listType = 'text'
                                    maxCount = {1}
                                    onChange = {(object) => uploadTriggered(object)}
                                >
                                    <Button
                                        prefix={<UploadOutlined />}
                                    >
                                        Click to Upload
                                    </Button>
                                </Upload>
                            </Col>
                            <Col span={12}>
                                <Button
                                    className={canSubmit ? 'save-button' : 'hide'}
                                    icon={<SaveOutlined />}
                                    onClick={() => onFinish}
                                >
                                    Save
                                </Button>
                            </Col>
                        </Row>
                    ]}
                >
                    <Meta
                        title={
                            <Row justify='space-between' align='middle'>
                                <Col>
                                    {room}
                                </Col>
                                <Col>
                                    ₱ {price}
                                </Col>
                            </Row>
                        }
                        description={
                            <Row justify='space-between' align='middle'>
                                <Col>
                                    {description}
                                </Col>
                                <Col>
                                    <Tag color={status ? "#60b427" : "#e91010"}>
                                        {status ? "RESERVED" : "PENDING"}
                                    </Tag>
                                </Col>
                            </Row>
                        }
                    />
                    <hr className='horizontal-rule'/>
                    <Row className="guest-info">
                        <Col span={24}>
                            <div><span>Guest: </span>{fullName}</div>
                            <div><span>Date From: </span>{moment(dateFrom).format('MMMM D, Y')}</div>
                            <div><span>Date To: </span>{moment(dateTo).format('MMMM D, Y')}</div>
                            <div><span>No. of Days: </span>{moment(dateTo).diff(moment(dateFrom), 'days')}</div>
                        </Col>
                    </Row>
                    <Row className={status ? 'reserved-message' : 'hide'}>
                        <Col>
                            <p>Your booking is now reserved! We will wait you on {moment(dateFrom).format('MMMM D, Y - dddd')}. Please bring the same id you upload on your reservation details.</p>
                        </Col>
                    </Row>
                    <Row className={status ? 'hide' : 'payment-instruction'}>
                        <Col>
                            <p>Please deposit your payment on any account indicated below, then upload your proof of payment.</p>
                        </Col>
                    </Row>
                    <Row className={status ? 'hide' : 'payment-info'}>
                        <Col span={24}>
                            <div><span>BDO: </span>{paymentInfo.bdo}</div>
                            <div><span>Metrobank: </span>{paymentInfo.metroBank}</div>
                            <div><span>Security Bank: </span>{paymentInfo.securityBank}</div>
                            <div><span>G-Cash: </span>{paymentInfo.gcash}</div>
                        </Col>
                    </Row>
                </Card>
            </Col>
        </Row>
    );
}

function mapStateToProps(state) {
    return {
        paymentList: state.updateReservation.paymentList,
        paymentLoading: state.updateReservation.paymentLoading,
        paymentSuccess: state.updateReservation.paymentSuccess,
        paymentFailed: state.updateReservation.paymentFailed,
        reservationList: state.loadReservation.reservationList,
        reservationLoading: state.loadReservation.reservationLoading,
        reservationSuccess: state.loadReservation.reservationSuccess,
        reservationFailed: state.loadReservation.reservationFailed,
    }
}
  
function mapDispatchToProps(dispatch) {
    return {
        onUpdateReservation:(id,data) => dispatch(updateReservation(id,data)),
        onLoadReservation: (id) => dispatch(loadReservation(id)),
    }
}
  
export default connect(mapStateToProps, mapDispatchToProps)(RoomCard);