import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import * as authAction from "../../store/actions/authAction"
import { connect } from "react-redux";

const LogOut=(props)=>{

    const history=useHistory()
    let usuario = {
        nombre: "",
        apellidos:"",
        email:"",
        loginGoogle:false
    }
    props.setUsuarioValues(usuario)

    localStorage.setItem('JobInterviewMe', "");

    history.push("/")
    return (<div>Cerrando Seción</div>)
}
const mapStateToProps = (rootReducer) => {
    return { global: rootReducer.auth };
};

export default connect(mapStateToProps, authAction)(LogOut);