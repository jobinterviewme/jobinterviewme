import { makeStyles } from "@material-ui/core";
import styles from "../../assets/jss/material-kit-react/views/profilePage.js";
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import Header from "components/Header/Header";
import HeaderLinks from "components/Header/HeaderLinks";
import Parallax from "components/Parallax/Parallax";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as authAction from "../../store/actions/authAction"
import classNames from "classnames";
import './Verificar.scss';
import AxiosConexionConfig from "conexion/AxiosConexionConfig.js";
import { useHistory } from "react-router";
import Cargando from "../../components/Cargando/Cargando.component"


const useStyles = makeStyles(styles);

const VerificarCorreo = (props) => {

    const history = useHistory();
    const classes = useStyles();
    const [tokenDes, setTokenDes] = useState([]);

    const token = {
        token: props.location.search.split("?")[1]
    }
    const URL= "/verificar-token"
    const rol = {
        rol: 1
    }
    const UsuarioURL = "/usuarios/"

    useEffect(() => {
        TokenVerified()
    }, [])

    async function Login(respuesta1) {
        try {         
            let usuario = {
              idusuario: respuesta1?.data?._id,
              nombre: respuesta1?.data?.nombre,
              apellidos: respuesta1?.data?.apellidos,
              email: respuesta1?.data?.correo,
              rol: 1,
              login: true,
              token: token.token
            }    
            console.log(usuario)
              props.setUsuarioValues(usuario).then( 
                history.push("/area-cliente")
              )

        }catch (e) {
          console.log(e);
        }
      }
    

    async function TokenVerified() {
        
        try {
          const respuesta1 = await AxiosConexionConfig.post(URL,JSON.stringify(token));
           console.log(respuesta1);
           setTokenDes(respuesta1);
           if(respuesta1!==null){
               console.log("diferente de null")
            await AxiosConexionConfig.patch(UsuarioURL+respuesta1.data._id,JSON.stringify(rol));
            Login(respuesta1);
        }

        } catch (e) {
          console.log(e);
        }
    }

    const mensaje = () => {

    }

return (
    <div>
      <Header
        fixed
        color="white"
        brand=""
        rightLinks={<HeaderLinks />}
      />

      <Parallax small color="headerGreen" >

        <div className={classes.container + " headerNameTitle"}>
          <GridContainer justify="flex-end">

            <GridItem xs={12} sm={12} md={6}>
              <h3 className={classes.title + " nameTitle"}>Verificación del correo</h3>
            </GridItem>


          </GridContainer>
        </div>
      </Parallax>

      <div className={classNames(classes.main, classes.mainRaised)+ " verificadoDiv"}>
         <div className="verificado"><Cargando/></div>

      </div>
    </div>
  );
}
const mapStateToProps = (rootReducer) => {
  return { global: rootReducer.auth };
};

export default connect(mapStateToProps, authAction)(VerificarCorreo);

