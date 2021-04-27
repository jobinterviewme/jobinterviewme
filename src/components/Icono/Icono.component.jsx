import React, { Fragment } from 'react';
import Flags from 'country-flag-icons/react/3x2';
import { Button, makeStyles, Tooltip } from '@material-ui/core';
import './Icono.style.scss';
import styles from "../../assets/jss/material-kit-react/tooltipsStyle.js";
import './Icono.style.scss'
import SK from '../../assets/img/iconos/SK.png';
import TE from '../../assets/img/iconos/TE.png';
import ZO from '../../assets/img/iconos/ZO.png';
import JI from '../../assets/img/iconos/JI.png';
import HG from '../../assets/img/iconos/HG.png';
import GM from '../../assets/img/iconos/GM.png';



const useStyles = makeStyles(styles);

const Icono = (props) => {

  const classes = useStyles();

  const Banderas = () => {    
      switch (props.codigo) {        
        case "Español":
          return (          
            <Flags.ES id={props.id} className="bandera" />            
          );
        case "Inglés":
          return (            
            <Flags.GB id={props.id} className="bandera" />
          );      
        case "Francés":
          return (   
            <Flags.FR id={props.id} className="bandera" />
          )
        case "Alemán":
          return (
            <Flags.DE id={props.id} className="bandera" />
          );
        case "Árabe":
          return (
            <Flags.SA id={props.id} className="bandera" />
          );      
        case "Chino":
          return (
            <Flags.CN id={props.id} className="bandera" />
          )
        case "Holandés":
          return (
            <Flags.NL id={props.id} className="bandera" />
          );
        case "Hindú (Indio)":
          return (
            <Flags.IN id={props.id} className="bandera" />
          );      
        case "Italiano":
          return (
            <Flags.IT id={props.id} className="bandera" />
          )
          case "Portugués":
          return (
            <Flags.PT id={props.id} className="bandera" />
          );
        case "Ruso":
          return (
            <Flags.RU id={props.id} className="bandera" />
          )
        default:
          return (
            <div className="canales">{props.codigo}</div>
          );   
      }
  }


  const Canales = () => {    
    switch (props.codigo) {        
      case "Skype":
        return (   
          <div className="canales">       
            <img src={SK} id={props.id}  />
          </div>);
      case "Zoom":
        return (            
          <div className="canales">       
            <img src={ZO} id={props.id}  />
          </div>);      
      case "Teams":
        return (   
          <div className="canales">       
            <img src={TE} id={props.id}  />
          </div>)
      case "Google Meets":
        return (
          <div className="canales">       
            <img src={GM} id={props.id}  />
          </div>);
      case "Google Hangouts":
        return (
          <div className="canales">       
            <img src={HG} id={props.id}  />
          </div>);      
      case "Jitsi":
        return (
          <div className="canales">       
            <img src={JI} id={props.id}  />
          </div>)      
      default:
        return (
          <div className="canales">{props.nombre} </div>
        );   
    }
}

  
  if(props.tipo==="bandera"){
    return (
      <Tooltip
        id="MyToolTip"
        title={props.nombre}
        placement={window.innerWidth > 959 ? "bottom" : "left"} 
        classes={{ tooltip: classes.tooltip }} 
      >
        <div className="divIcono">
          { Banderas() }
        </div>
      </Tooltip>    
      );
    }
    else{
      if(props.tipo==="canal"){
        return (
          <Tooltip
            id="MyToolTip"
            title={props.nombre}
            placement={window.innerWidth > 959 ? "bottom" : "left"} 
            classes={{ tooltip: classes.tooltip }} 
          >
            <div className="divIcono">
              { Canales() }
            </div>
          </Tooltip>    
          );
        }
        else{
          return(<Fragment/>)
        }
    }
  }  

  export default Icono;