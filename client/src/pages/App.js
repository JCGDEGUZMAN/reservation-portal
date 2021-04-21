import React from 'react';
import './App.scss';
import { withRouter } from "react-router-dom";

import Router from './router';
import Reservation from './reservation';

const routes = [
    {
        path:'/reservation/:psid',
        exact: true,
        component: Reservation
    },
];

const App = () => {
    return(
        <React.Fragment>
            <Router routes={routes} isAuthenticated={true}/>
        </React.Fragment>
    );
}

export default withRouter(App);