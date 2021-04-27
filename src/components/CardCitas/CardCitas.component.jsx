import React from 'react';

import {Tooltip, makeStyles, Icon} from '@material-ui/core';
import styles from "../../assets/jss/material-kit-react/tooltipsStyle.js";
import './CardCitas.style.scss';
import Button from "components/CustomButtons/Button.js";

const useStyles = makeStyles(styles);

const CardCitas = (props) => {

const {nombre, toolTipsText, confirmada, fecha, lugar}= props;
const classes = useStyles();
let tipo = props.tipo;
const today = new Date();


if(tipo!=="deshabilitado"){
    
if(confirmada === "true"   ){
    tipo = "aceptado";
}else{
    if(confirmada === "false" && (fecha-today<(2*86400000))  ){
        
       tipo = "warning"}
        else{
            tipo = "pendiente";
        }
}}

    return (
        <>
        <Tooltip
            id="MyToolTip"
            title={toolTipsText}
            interactive={true}
            placement={window.innerWidth > 959 ? "top" : "left"} 
            classes={(tipo==="deshabilitado")?" hidden": ""}
        >
        <Button 
            onClick={e => e.preventDefault()}
            id={tipo}
            className="cardCitas"            
        >

        {nombre}<br/>

        {tipo!=="deshabilitado"?
            tipo==="warning"?(<span id="alerta">¡Cita próxima sin confirmación!</span>)
        :(<></>):(<></>)}

        {/*tipo!=="deshabilitado"?
            (<div className="check"><button><Check/></button>
            <button><Close/></button></div>)
    :(<></>)*/}
        

        </Button>
        </Tooltip>
        </>
    );
}

export default CardCitas