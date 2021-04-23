import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useStore } from "./Stores/store";

const PrivateRoute: React.FC<{component : React.FC; path: string; exact: boolean;}> = (props) => {
    const {accountStore} = useStore();
    const {isLoggedIn} = accountStore;

    return isLoggedIn 
    ? (<Route path={props.path} exact={props.exact} component={props.component} />)
    : (<Redirect to="/login"/>)
}

export default PrivateRoute;