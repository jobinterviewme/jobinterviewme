import React, { useEffect, useState } from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
// core components
import Header from "components/Header/Header.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Parallax from "components/Parallax/Parallax.js";


import styles from "assets/jss/material-kit-react/views/profilePage.js";
import '../ProfilePage/ProfilePage.styles.scss'

import './AreaPersonal.style.scss'
import CardCitas from "components/CardCitas/CardCitas.component";

//conexion BBDD
import AxiosConexionConfig from "conexion/AxiosConexionConfig";
import { urlUsuarios } from "configuracion/constantes";
import { urlProfesional } from "configuracion/constantes";
import { urlCitas } from "configuracion/constantes";


const useStyles = makeStyles(styles);

export default function AreaPersonal(props) {
  const classes = useStyles();
  const { ...rest } = props;
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid
  );  

  //const id = props.location.search.split("?")[1]
  const id = 38;
  
  const [usuario, setUsuario] = useState(null)
  const [profesional, setProfesional] = useState(null)
  const [cita, setCita] = useState(null)
  const [NombreUsuariosCita, setNombreUsuariosCita] = useState(null)

  const [citasPendiente, setCitasPendiente] = useState(null)



  const fechaHoy = new Date();

  useEffect(() => {
    RefreshUsuario()
  }, []);


  async function hola(usuarioUrl){
    const usuarioCita = await AxiosConexionConfig.get(usuarioUrl); 
    return usuarioCita.data;    
  }

  
  async function RefreshUsuario() {
    
    const citasProfesionalURL = "/citas?filter="

    const otro = {
      where:{
      idprofesional: 38       
      },  
      include: [{
        relation: "CitaUsuario"
      }]
    }    
   
    try {
      const citasProfesional = await AxiosConexionConfig.get(citasProfesionalURL + encodeURIComponent(JSON.stringify(otro)));

      setCitasPendiente(citasProfesional.data);

       
    } catch (e) {
      console.log(e);
    }
  }

  const PintarCita = () => {
    
    if(citasPendiente!==null){
      citasPendiente.map((cita,index)=>{

        const fecha = new Date(cita.fecha);
        console.log(fecha);

        PintaYa();
        
           
      });
    }    
  }

  const PintaYa = () => {
    console.log("hola");
    <CardCitas tipo="warning" nombre="Isa" toolTipsText="Cita próxima sin confirmar"></CardCitas>

  }

  
    
    
  
        
         

  return (
    <div>
      <Header
        color="white"
        brand=""
        rightLinks={<HeaderLinks />}
        fixed
        changeColorOnScroll={{
          height: 200,
          color: "white"
        }}
        {...rest}
      />

      <Parallax id="sombra" small filter color="headerGreen" >

        <div className={classes.container + " headerNameTitle"}>
          <GridContainer justify="flex-end">

            <GridItem xs={12} sm={12} md={6}>
              <h3 className={classes.title + " nameTitle"}>{usuario !== null ? usuario.nombre : ""}</h3>
            </GridItem>

            <GridItem xs={12} sm={12} md={2}>
            </GridItem>

          </GridContainer>
        </div>
      </Parallax>

      <div className={classNames(classes.main, classes.mainRaised)}>
        <div>
          <div className={classes.container}>
            <GridContainer>
              <GridItem xs={12} sm={12} md={4}>
                <div className={classes.container + " contenedorGris"}>
                   <h4>Próximas citas</h4>

                   {citasPendiente !== null ?
                      citasPendiente.map((cita, index) => {
                        if(new Date(cita.fecha) > fechaHoy){
                          return(
                            <CardCitas tipo={null} confirmada={cita.confirmada} lugar="activa" fecha={new Date(cita.fecha)} nombre={cita.CitaUsuario.nombre} toolTipsText="Confirmar Cita"></CardCitas>
                          )
                        }else{
                          return (<></>);
                        }
                      }                  
                      ) : <></>
                    } 

                   
                </div>               
              </GridItem>

              <GridItem xs={12} sm={12} md={4}>  
              <div className={classes.container + " contenedorGris"}>
                   <h4>Historial</h4> 
                   {citasPendiente !== null ?
                      citasPendiente.map((cita, index) => {
                        if(new Date(cita.fecha) < fechaHoy){
                          return(
                            <CardCitas tipo="deshabilitado" confirmada={cita.confirmada} lugar="activa" fecha={new Date(cita.fecha)} nombre={cita.CitaUsuario.nombre} toolTipsText="Confirmar Cita"></CardCitas>
                          )
                        }else{
                          return (<></>);
                        }
                      }                  
                      ) : <></>
                    } 
                   
                </div>              
                
              </GridItem>

              <GridItem xs={12} sm={12} md={4}>   
                <div className={classes.container + " contenedorGris"}>
                   <h4>Información de contacto</h4> 
                   <p>{usuario !== null ? usuario.nombre : ""}</p>
                   <p>{usuario !== null ? usuario.correo : ""}</p>

                </div>    
              </GridItem>
            </GridContainer>

            
          </div>
        </div>
      </div>
    </div >
  );
}
