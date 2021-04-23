import React, { useEffect } from 'react';
import './index.scss';

import { Row, Col } from 'antd';

import RoomCard from '../../components/roomCard';

const RoomDetails = (props) => {
    return(
        <Row 
            justify='center'
            align='middle'
            className='room-details-layout'
        >
            <Col className='room-details-content'>
                <RoomCard 
                    cover={"https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"}
                    room={"ROOM 05 - 5TH FLOOR"}
                    description={"Modern Contemporary Room"}
                    price={'5,000'}
                    isReserved={'PENDING'}
                    guestInfo={{
                        fullName: "Julius G. De Guzman",
                        dateFrom: '2021-03-30 00:00:00',
                        dateTo: '2021-03-31 00:00:00',
                    }}
                    paymentInfo ={{
                        bdo: '1234567890',
                        metroBank: '0987654321',
                        securityBank: '1234509876',
                        gcash: '09876543211'
                    }}
                />
            </Col>
        </Row>
    );
}

export default RoomDetails;