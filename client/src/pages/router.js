import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

const ProtectedRoute = ({ component: Comp, isLoggedIn, path, exact }) => {
    return (
      <Route
        path={path}
        exact={exact}
        render={props => {
          return isLoggedIn ? <Comp {...props} /> : <Redirect to="/" />;
        }}
      />
    );
};

export default function Router(props) {
    const { routes, isAuthenticated } = props
    return (
        <Switch>
            {window.scrollTo(0, 0)}
            {
                routes.map((route, index) => {
                    return(
                        <ProtectedRoute
                            path={route.path}
                            exact={route.exact}
                            component={route.component}
                            isLoggedIn={isAuthenticated}
                            key={index}
                        />
                    )
                })
            }
        </Switch>
    );
}
