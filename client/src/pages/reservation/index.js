import React, { useEffect } from 'react';
import './index.scss';

import { Row, Col } from 'antd';

import ReservationForm from '../../components/reservationForm';

const Reservation = (props) => {

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
    }, [props])

    return(
        <Row 
            justify='center'
            align='middle'
            className='reservation-layout'
        >
            <Col className='reservation-content'>
                <ReservationForm/>
            </Col>
        </Row>
    );
}

export default Reservation;