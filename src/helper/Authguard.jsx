import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectToken } from "../utils/selectors";
import { store } from "../utils/store";
import { setToken } from "../component/profile/Actions";
import React from "react";
import PropTypes from "prop-types";
import { selectAGLoader } from "../utils/selectors";
import { setAGLoader } from "./Action";


/**
 * @description Function forcing user to be connected in order to go to profile page
 */
function AuthGuard({children}){



    const tokenState = useSelector(selectToken);
    const AGLoader = useSelector(selectAGLoader);

    useEffect(() => {

        /**
         * @description If token is in the storage, it's sent to the storage 
         */
        let tokenCheck = sessionStorage.getItem("token"); 
        if (!tokenCheck) { 
        tokenCheck = localStorage.getItem("token");
        }
        store.dispatch(setToken(tokenCheck));

        setTimeout(() => {
            store.dispatch(setAGLoader());
            }, 100);

    }, []);

    /**
     * @description If token is in the state, AuthGuard let user access to profile
     */
    if (!AGLoader){
        if(tokenState != "" ){
        return children;}
        else{return <Navigate to = "/user/login" />;}
        }else{null;}
}

AuthGuard.propTypes = {
    children: PropTypes.object.isRequired
  };

export default AuthGuard;


