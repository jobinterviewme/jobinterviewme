/*eslint-disable*/
import React, { Fragment, useState } from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
// react components for routing our app without refresh
import { Link } from "react-router-dom";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Tooltip from "@material-ui/core/Tooltip";

// @material-ui/icons
import { Apps, CloudDownload } from "@material-ui/icons";

// core components
import CustomDropdown from "components/CustomDropdown/CustomDropdown.js";
import Button from "components/CustomButtons/Button.js";

import styles from "assets/jss/material-kit-react/components/headerLinksStyle.js";
import './HeaderLink.styles.scss';
import { linkpreparador, linkAreaPersonalCliente } from "configuracion/constantes";
import { linklogout, linkAreaPersonalProfesional } from "configuracion/constantes";
import * as authAction from "../../store/actions/authAction"
import { connect } from "react-redux";
import LoginPopUp from "./Login/Login.component";
import LogUpPopUp from "./Login/LogUp.component";


const useStyles = makeStyles(styles);

function HeaderLinks(props) {

  const classes = useStyles();
  const [visible, setVisible]=useState(false);
  const [visibleUp, setVisibleUp]=useState(false);



  const onChangeVisible = () => {
   setVisible(true);
  }
  const onChangeVisibleUp = () => {
    setVisibleUp(true);
   }

   const AreaPersonal=()=>{
    if(props.global.email!==""){
      if(props.global.usuario!==null){
        return(
        <ListItem className={classes.listItem}>
        <Link to={linkAreaPersonalProfesional}>
          <Button
            color="transparent"
            target="_self"
            className={classes.navLink}
          >
            Área personal
          </Button>
        </Link>
      </ListItem>)
      }else{
        return(
        <ListItem className={classes.listItem}>
        <Link to={linkAreaPersonalCliente}>
          <Button
            color="transparent"
            target="_self"
            className={classes.navLink}
          >
            Área personal
          </Button>
        </Link>
      </ListItem>)
      }
    } else{
      return(
      <Fragment></Fragment>)
    }
   }

   const SerPreparador=()=>{

   
    if(props.global.usuario===null){
      return(
        <ListItem className={classes.listItem}>
        <Link to={linkpreparador}>
          <Button
            color="transparent"
            className={classes.navLink}>
            Ser Preparador
          </Button>
        </Link>
      </ListItem> 
      )
    }
  }

  return (
    <List id="header" className={classes.list}>
      {SerPreparador()}
      
     {/* <ListItem className={classes.listItem}>

        <Tooltip
          id="instagram-twitter"
          title="Síguenos en Twitter"
          placement={window.innerWidth > 959 ? "top" : "left"}
          classes={{ tooltip: classes.tooltip }}
        >
          <Button
            href="https://twitter.com/CreativeTim?ref=creativetim"
            target="_blank"
            color="transparent"
            className={classes.navLink}
          >
            <i className={classes.socialIcons + " fab fa-twitter"} />
          </Button>
        </Tooltip>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Tooltip
          id="instagram-facebook"
          title="Síguenos en Facebook"
          placement={window.innerWidth > 959 ? "top" : "left"}
          classes={{ tooltip: classes.tooltip }}
        >
          <Button
            color="transparent"
            href="https://www.facebook.com/CreativeTim?ref=creativetim"
            target="_blank"
            className={classes.navLink}
          >
            <i className={classes.socialIcons + " fab fa-facebook"} />
          </Button>
        </Tooltip>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Tooltip
          id="instagram-tooltip"
          title="Síguenos en Instagram"
          placement={window.innerWidth > 959 ? "top" : "left"}
          classes={{ tooltip: classes.tooltip }}
        >
          <Button
            color="transparent"
            href="https://www.instagram.com/CreativeTimOfficial?ref=creativetim"
            target="_blank"
            className={classes.navLink}
          >
            <i className={classes.socialIcons + " fab fa-instagram"} />
          </Button>
        </Tooltip>
        </ListItem>
        */
  }

      {AreaPersonal() }

      <ListItem className={classes.listItem}>
        <Link to={linkpreparador}>
          <Button
            color="transparent"
            target="_self"
            className={classes.navLink}
          >
            Ayuda
          </Button>
        </Link>
      </ListItem>
      
      {props.global.loginGoogle ?
        <ListItem className={classes.listItem}>
          <Link to={linklogout}>
            <Button
              color="transparent"
              target="_self"
              className={classes.navLink}
            >
              Cerrar Sesión
          </Button>
          </Link>
        </ListItem> : (
          <>
          <ListItem className={classes.listItem}>

          <Button
            color="transparent"
            target="_self"
            className={classes.navLink}
            onClick={()=>onChangeVisible()}
          >
            Conectarse
            
          </Button>
          <LoginPopUp link="areaPersonal" visible={visible} handleCancel={()=>setVisible(false)} />

      </ListItem>

      <ListItem className={classes.listItem}>
          <Button
            color="transparent"
            className={classes.navLink}
            onClick={()=>onChangeVisibleUp()}>
            Inscribirse
          </Button>
          <LogUpPopUp link="areaPersonal" visibleUp={visibleUp} handleCancel={()=>setVisibleUp(false)} />

      </ListItem></>
        )}
    </List>
  );
}


const mapStateToProps = (rootReducer) => {
  return { global: rootReducer.auth };
};

export default connect(mapStateToProps, authAction)(HeaderLinks);