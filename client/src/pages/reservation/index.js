import React, { useEffect } from 'react';
import './index.scss';

import { Row, Col } from 'antd';

import ReservationForm from '../../components/reservationForm';

const Reservation = (props) => {
    return(
        <Row 
            justify='center'
            align='middle'
            className='reservation-layout'
        >
            <Col className='reservation-content'>
                <ReservationForm />
            </Col>
        </Row>
    );
}

export default Reservation;