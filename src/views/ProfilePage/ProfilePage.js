import React, { Fragment, useEffect, useState } from "react";

//componentes
import Header from "components/Header/Header.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Parallax from "components/Parallax/Parallax.js";
import Icono from '../../components/Icono/Icono.component';

//ANTD
import { Table, Tag } from 'antd';

//PrimeReact
import { addLocale } from 'primereact/api';
import { Calendar } from "primereact/calendar";

//style
import styles from "assets/jss/material-kit-react/views/profilePage.js";
import './ProfilePage.styles.scss'
import classNames from "classnames";
import { makeStyles } from "@material-ui/core/styles";

//Conexión BBDD
import { urlProfesional } from "configuracion/constantes";
import AxiosConexionConfig from "conexion/AxiosConexionConfig";

const useStyles = makeStyles(styles);

export default function ProfilePage(props) {


  const [date15, setDate15] = useState(null);

  const id = props.location.search.split("?")[1]


  addLocale('es', {
    firstDayOfWeek: 1,
    dayNames: ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'],
    dayNamesShort: ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'],
    dayNamesMin: ['D', 'L', 'M', 'X', 'J', 'V', 'S'],
    monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
    monthNamesShort: ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'],
    today: 'Hoy',
    clear: 'Claro'
  });


  const classes = useStyles();
  const { ...rest } = props;
  const [usuario, setUsuario] = useState(null)

  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid
  );

  useEffect(() => {
    RefreshUsuario()
  }, []);

  async function RefreshUsuario() {
    const url = urlProfesional + "/" + id;
    try {
      const respuesta = await AxiosConexionConfig.get(url);
      //console.log(respuesta.data)
      setUsuario(respuesta.data)
    } catch (e) {
      console.log(e);
    }
  }


  const columns1 = [
    {
      title: 'Día de la semana',
      dataIndex: 'dia',
      key: 'dia',
    },
    {
      title: 'Hora Inicio',
      dataIndex: 'horaInicio',
      key: 'hInicio',
      render: hInicio => (
        <>
          {hInicio !== null ? (
            <Tag color='green' key={hInicio}>
              {hInicio.toUpperCase()}
            </Tag>
          ) :
            (
              <Tag color='volcano' key="no">
                {("No disponible").toUpperCase()}
              </Tag>
            )}
        </>
      ),
    },

    {
      title: 'Hora fin',
      key: 'hFin',
      dataIndex: 'horaFin',
      render: horaFin => (
        <>
          {horaFin !== null ? (
            <Tag color='green' key={horaFin}>
              {horaFin.toUpperCase()}
            </Tag>
          ) :
            (
              <Tag color='volcano' key="no">
                {("No disponible").toUpperCase()}
              </Tag>
            )}
        </>
      ),
    },
  ];

  //borrar luego que coja los datos de la BD
  const data = [
    {
      dia: 'lunes',
      horaInicio: '13:10',
      horaFin: '15:40'
    },
    {
      dia: 'martes',
      horaInicio: null,
      horaFin: null
    }, {
      dia: 'miércoles',
      horaInicio: '13:10',
      horaFin: '15:40'
    }, {
      dia: 'jueves',
      horaInicio: '13:10',
      horaFin: '15:40'
    }, {
      dia: 'viernes',
      horaInicio: '13:10',
      horaFin: '15:40'
    }, {
      dia: 'sábado',
      horaInicio: '13:10',
      horaFin: '15:40'
    }, {
      dia: 'domingo',
      horaInicio: null,
      horaFin: null
    }
  ];


  const sectoresA = (atributo, index, clase) => {
    return (
      (index === 0) ? <div className={clase} key={index}>{atributo}</div> : <div className={clase} key={index}>{", " + atributo}</div>
    )
  }

  const header = () => {
    return (
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
    )
  }
  const parallax = () => {
    return (
      <Parallax id="sombra" small filter color="headerGreen" >

        <div className={classes.container + " headerNameTitle"}>
          <GridContainer justify="flex-end">

            <GridItem xs={12} sm={12} md={6}>
              <h3 className={classes.title + " nameTitle"}>{usuario !== null ? usuario.nombreperfil : ""}</h3>
            </GridItem>

            <GridItem xs={12} sm={12} md={2}>
            </GridItem>

          </GridContainer>
        </div>
      </Parallax>
    )
  }

  const body = () => {
    return (
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div>
          <div className={classes.container}>

            <GridContainer>

              <GridItem xs={12} sm={12} md={4}>
                <div className={classes.profile}>

                  <div>
                    <img src={usuario.imagen} alt={usuario.nombreperfil} className={imageClasses + " imagenProfile"} />
                  </div>

                  <div className={classes.name}>

                    <div id="banderasList">
                      {
                        usuario.idiomas.split(",").map((idioma, index) => {
                          return (
                            <Icono codigo={idioma} tipo="bandera" key={index} nombre={idioma} id={index} />
                          )
                        })
                      }
                    </div>

                    <div className="precio">
                      <span className="precioText">{usuario.tarifa + "€ / " + usuario.duracion + '’ entrevista'}</span>
                    </div>

                  </div>
                </div>
              </GridItem>

              <GridItem xs={12} sm={12} md={8}><div className={classes.description}>

                <div className="experiencia">
                  <p> {usuario.annosexperiencia} años de experiencia en el(los) sector(es):
                    <div className="sectores">
                      {usuario.sectores.split(",").map((sector, index) => {
                        return (
                          sectoresA(sector, index, "sectores")
                        )
                      })}
                    </div>
                  </p>
                </div>
              </div>

                <div className={classes.description + " wrap"}>
                  <p>{usuario.experiencia}</p>
                </div>

                <div className={classes.description}>
                  <div className="hashtags">
                    {usuario.hashtags.split(",").map((hashtag, index) => {
                      return (
                        sectoresA(hashtag, index, "hashtags")
                      )
                    })}
                    #variante, #comedor, #laflaca
                  </div>
                </div>

                <div className="contenedor">
                  <div className="canalesSection">
                    <p>Canales:
                    {usuario.canales !== null ?
                        usuario.canales.split(",").map((canal, index) => {
                          return (
                            <Icono codigo={canal} tipo="canal" key={index} nombre={canal} id={index} />
                          )
                        }) : <Fragment></Fragment>
                      }</p>
                  </div></div>
              </GridItem>
            </GridContainer>

            <GridContainer>
              <GridItem xs={12} sm={12} md={6}>
                <Table id="tabla" columns={columns1} dataSource={data} pagination={false} />
              </GridItem>

              <GridItem id="calendario1" xs={12} sm={12} md={6}>
                <div className="margen"></div>
                {
                  //poner clase usuarioCliente cuando sea Cliente y cuando sea profesional quitarla para activar o desactivar el css del calendario
                }
                <Calendar className="usuarioCliente" locale="es" value={date15} onChange={(e) => setDate15(e.value)} minDate={new Date()} disabledDays={[1, 2]} inline />
              </GridItem>
              <div className="margen"></div>
            </GridContainer>
          </div>
        </div>
      </div>
    )
  }
  return (
    <div>

      {header()}
      {parallax()}

      {usuario !== null ? body() : <Fragment><div className={classNames(classes.main, classes.mainRaised)}>
        <div>
          <div className={classes.container}>
            Seleccione un preparador antes de poder ver su perfil.</div></div></div></Fragment>}

    </div>
  );
}
