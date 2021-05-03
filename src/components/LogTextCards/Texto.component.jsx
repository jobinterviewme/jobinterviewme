
import React from "react";
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import { makeStyles } from "@material-ui/core";
import styles from "../../assets/jss/material-kit-react/views/loginPage.js";
import './LogUpCard.styles.scss';

const useStyles = makeStyles(styles);




function Texto(props) {

    const classes = useStyles();


    //const [cardAnimaton3, setCardAnimation3] = React.useState("");

    let cardAnimation3 = ""

    props.hidden?
    cardAnimation3 = "cardHidden" : cardAnimation3 = "";

    /*props.hidden?
    setCardAnimation3(""):setCardAnimation3("cardHidden");*/

return (
    < >
        
        <h3 id="question">¿Quieres ayudar a triunfar?</h3>
              <div id="margen"></div>

              <h4 >Prepara a tu manera</h4>
              <div id="margen"></div>

              <ul><ArrowForwardIcon className="arrow" />Tú defines el precio</ul>

              <ul><ArrowForwardIcon className="arrow" />Cuando quieres trabajar</ul>

              <ul><ArrowForwardIcon className="arrow" />El formato de tu preparación</ul>

              <ul><ArrowForwardIcon className="arrow" />Cuéntanos un poco de tu experiencia</ul>

              <ul><ArrowForwardIcon className="arrow" />En 3 minutos tu perfil estará listo</ul>

              <div id="margen"></div>
              </>
)}
export default Texto;