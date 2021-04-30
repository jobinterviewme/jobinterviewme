import React, { Fragment, useEffect, useState,  useRef  } from "react";


//componentes
import Header from "components/Header/Header.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Parallax from "components/Parallax/Parallax.js";
import Icono from '../../components/Icono/Icono.component';
import Cargando from 'components/Cargando/Cargando.component'
import Button from "components/CustomButtons/Button.js";



//JSON
import canales from '../../assets/json/canales.json'

//ANTD
import { TimePicker, Form, Tag, Tooltip } from 'antd';

//PrimeReact
import { addLocale } from 'primereact/api';
import { Calendar } from "primereact/calendar";
import { RadioButton } from 'primereact/radiobutton';
import { Toast } from 'primereact/toast';


//style
import styles from "assets/jss/material-kit-react/views/profilePage.js";
import classNames from "classnames";
import { makeStyles } from "@material-ui/core/styles";
import './ContratarCita.scss'

//Conexión BBDD
import { urlProfesional } from "configuracion/constantes";
import AxiosConexionConfig from "conexion/AxiosConexionConfig";

//redux
import * as authAction from "../../store/actions/authAction"
import { connect } from "react-redux";
import Modal from "antd/lib/modal/Modal";
import { useHistory } from "react-router";
import { urlCitas } from "configuracion/constantes";
import moment from "moment";


const useStyles = makeStyles(styles);


const ProfilePageCliente = (props) => {

    const classes = useStyles();
    const [date15, setDate15] = useState(null);
    const [city, setCity] = useState(null);
    const history = useHistory();

    const [visible, setVisible] = React.useState(false);
    const [confirmLoading, setConfirmLoading] = React.useState(false);
    //const [modalText, setModalText] = React.useState('');

    const [agenda, setAgenda] = useState([]);
    const [array, setArray] = useState([]);
    const [canales1, setCanales1] = useState([]);
    const [profesional1, setProfesional1] = useState(null);
    const [canalSelected, setCanalSelected] = useState(null);
    const [fecha, setFecha] = useState(null);
    const [hora, setHora] = useState(null);

    const [date,setDate] = useState(null);
    const [timetrue,setTimetrue] = useState(true);
    const [hinicio, setHorainicio] = useState(null);
    const [hfin, setHfin] = useState(null);
    const [minutoInicio, setMinutoInicio] = useState(null);
    const [minutoFin, setMinutoFin] = useState(null);

    const toast = useRef(null);

    const activedate = (value) => {
      console.log(fecha)
      setHora(moment('13:30', 'HH:mm'))
      document.getElementById("time_related_controls_time-picker").setAttribute("value","13:30")
      setFecha(value);
      setTimetrue(false); 
      switch (value.toString().split(" ")[0]){
        case "Mon": 
            setHorainicio(parseInt(agenda[0].horainicio.split(":")[0]));
            setHfin(parseInt(agenda[0].horafin.split(":")[0]));
            setMinutoInicio(parseInt(agenda[0].horainicio.split(":")[1]));
            setMinutoFin(parseInt(agenda[0].horafin.split(":")[1]));
            break;

        case "Tue": 

        setHorainicio(parseInt(agenda[1].horainicio.split(":")[0]));
        setHfin(parseInt(agenda[1].horafin.split(":")[0]));
            setMinutoInicio(parseInt(agenda[1].horainicio.split(":")[1]));
            setMinutoFin(parseInt(agenda[1].horafin.split(":")[1]));
            break;
       
        case "Wed": 
        setHorainicio(parseInt(agenda[2].horainicio.split(":")[0]));
        setHfin(parseInt(agenda[2].horafin.split(":")[0]));
            setMinutoInicio(parseInt(agenda[2].horainicio.split(":")[1]));
            setMinutoFin(parseInt(agenda[2].horafin.split(":")[1]));
            break;
        
        case "Thu": 
        setHorainicio(parseInt(agenda[3].horainicio.split(":")[0]));
        setHfin(parseInt(agenda[3].horafin.split(":")[0]));
            setMinutoInicio(parseInt(agenda[3].horainicio.split(":")[1]));
            setMinutoFin(parseInt(agenda[3].horafin.split(":")[1]));
            break;
        
        case "Fra": 
        setHorainicio(parseInt(agenda[4].horainicio.split(":")[0]));
        setHfin(parseInt(agenda[4].horafin.split(":")[0]));
            setMinutoInicio(parseInt(agenda[4].horainicio.split(":")[1]));
            setMinutoFin(parseInt(agenda[4].horafin.split(":")[1]));
            break;
          
        case "Sat": 
        setHorainicio(parseInt(agenda[5].horainicio.split(":")[0]));
        setHfin(parseInt(agenda[5].horafin.split(":")[0]));
            setMinutoInicio(parseInt(agenda[5].horainicio.split(":")[1]));
            setMinutoFin(parseInt(agenda[5].horafin.split(":")[1]));
            break;
        
        case "Sun":
          setHorainicio(parseInt(agenda[6].horainicio.split(":")[0]));
          setHfin(parseInt(agenda[6].horafin.split(":")[0]));
            setMinutoInicio(parseInt(agenda[6].horainicio.split(":")[1]));
            setMinutoFin(parseInt(agenda[6].horafin.split(":")[1]));
            break;
          
          default: 
          setHorainicio(null);
            break;        
      }     
    }

    const id = history.location.search.split("?")[1];
    
    useEffect(() => {
      DatosProfesional()
    }, []);

    async function DatosProfesional() {    
      const citasProfesionalURL = "/profesionals?filter="
      
      const otro = {
        where:{
        idusuario: id       
        },  
        include: [{
          relation: "ProfesionalAgendas"
        }]
      }   
     
      try {

        const profesional = await AxiosConexionConfig.get(citasProfesionalURL + encodeURIComponent(JSON.stringify(otro)));
        setAgenda(profesional.data[0].ProfesionalAgendas);
        setArray(profesional.data[0].fechasnulas.split(","));
        setCanales1(profesional.data[0].canales.split(','));
        setProfesional1(profesional.data)
      } catch (e) {
        console.log(e);
      }
    }


    const invalidDates = () => {      
      const array2 = []
      array.map((a) => {
        array2.push(new Date(a));
      })
      return array2;
    }
  
    const invalidDays = () => {
      const invday = [];
      agenda.map((agd, idex) => {
        if (agd.horainicio == null) {
          switch (agd.diasemana) {
            case "Lunes": invday.push(1);
            case "Martes": invday.push(2);
            case "Miércoles": invday.push(3);
            case "Jueves": invday.push(4);
            case "Viernes": invday.push(5);
            case "Sábado": invday.push(6);
            case "Domingo": invday.push(0);
          }
        }
      })
      return invday;
    }
  
    const fechaNum = () => {
      const mes = fecha.toString().split(" ")[1];
      console.log(mes);
      const fechaArray = [];
      fechaArray.push(fecha.toString().split(" ")[2])
      switch (mes) {
        case "Jan": fechaArray.push("Enero");
        break;
        case "Feb": fechaArray.push("Febrero");
        break;

        case "Mar": fechaArray.push("Marzo");        break;

        case "Apr": fechaArray.push("Abril");        break;

        case "May": fechaArray.push("Mayo");        break;

        case "Jun": fechaArray.push("Junio");        break;

        case "Jul": fechaArray.push("Julio");        break;

        case "Aug": fechaArray.push("Agosto");        break;

        case "Sep": fechaArray.push("Septiembre");        break;

        case "Oct": fechaArray.push("Octubre");        break;

        case "Nov": fechaArray.push("Noviembre");        break;

        case "Dec": fechaArray.push("Diciembre");           break;
default: fechaArray.push("");;    
      }
      fechaArray.push(fecha.toString().split(" ")[3])
      return fechaArray;
    }
      
    const handleOk = () => {
      //setModalText('The modal will be closed after two seconds');
      setConfirmLoading(true);

      let dataValue = {
        idusuario: props.global.idusuario,
        idprofesional: 38,
        fecha: fecha.toString(),
        confirmada: 'false',
        canales: canalSelected          
      }

      crearCita(dataValue).then(setTimeout(() => {      
        
        //console.log(dataValue)

        setVisible(false);
        setConfirmLoading(false);
        history.push('/area-cliente')
      }, 2000))           

    };

    async function crearCita(dataValue) {      
        
        const url = urlCitas;
        try {

          const respuesta = await AxiosConexionConfig.post(url, JSON.stringify(dataValue));
          if (respuesta.status === 200) {
            //props.setUsuario(dataValue)
            history.push(linkperfilpor + "?" + idusuario)


            

            //return (<Link to={linkperfilpor}/>)
          }
        } catch (e) {
          console.log(e);
        }
      
    }

    const onFinish = (fieldsValue) => {
      // Should format date value before submit.
     
      
      
      //console.log(hora, fecha, canalSelected);

      if(fieldsValue['time-picker'] === undefined){
        toast.current.show({severity: 'error', summary: 'Error', detail: 'Seleccione la hora de su cita'});
      }else{
        setHora(fieldsValue['time-picker']?.format('HH:mm'))
        if(fecha === null){
          toast.current.show({severity: 'error', summary: 'Error', detail: 'Seleccione la fecha de su cita'});
        }else{
          if(canalSelected=== null){
            toast.current.show({severity: 'error', summary: 'Error', detail: 'Seleccione el canal de su cita'});
          }else{
            setVisible(true);
          }
        }
      }
        
      
    };

    const format = 'HH:mm';
  
    const handleCancel = () => {
      console.log('Clicked cancel button');
      setVisible(false);
    };

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

      const horasnot = () =>{
        console.log(hinicio,minutoInicio,hfin,minutoFin);
        const array = [];
        let hfin1 = hfin
        //restarle cantidad de minutos que dura preparacion a la hr fin        
        if(minutoFin === 0){
          hfin1 -= 1;
        }
        let i = 0;
        while( i < 24 ){
          if( i < hinicio || i > hfin1 ){
            array.push(i)
          }
          i += 1;
        }
        return array;
      }

      const minutsnot = (hora) => {        
        let array = []
        if(hora === hinicio){
          let i = 0;
          while( i < 60 ){
            if( i < minutoInicio ){
              array.push(i)
            }
            i += 5;
          }
      }

      if(hora === hfin){
      let i = 0;
        while( i < 60 ){
          if( i > minutoFin ){
            array.push(i)
          }
          i += 5;
        }
      }
        return array;
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
          />
        )
      }

     const parallax = () => {
        return (
          <Parallax id="sombra" small filter color="headerGreen" >
    
            <div className={classes.container + " headerNameTitle"}>
              <GridContainer justify="flex-end">
    
                <GridItem xs={12} sm={12} md={4}>
                  <h3 className={classes.title + " nameTitle"}>Concertar Cita</h3>
                </GridItem>
    
                <GridItem xs={12} sm={12} md={2}>
                
                </GridItem>
    
              </GridContainer>
            </div>
          </Parallax>
        )}
         
      const body = () => {
        return (
          <div className={classNames(classes.main, classes.mainRaised)}>
            <div>
              <div className={classes.container}>

                <Form name="time_related_controls" onFinish={onFinish}>                
    
              <div className="p-grid p-justify-center">
                  
              <div id="calendario1" className="p-col-12 p-md-12 p-lg-6">
                  
                    <div className="margen"></div>
                    {
                      //poner clase usuarioCliente cuando sea Cliente y cuando sea profesional quitarla para activar o desactivar el css del calendario
                    }
                    <span>Seleccione el día de su cita</span>
                    <div className="margen"></div>

                    <Calendar className="usuarioCliente" locale="es" value={fecha} minDate={new Date()} onChange={(e) => activedate(e.value)} disabledDates={invalidDates()} disabledDays={invalidDays()} inline />
                    
                  </div>

                  <div className="p-col-7 p-md-5 p-lg-3">
                    <div className="margen"></div>
                    <span>Seleccione la hora de su cita</span>
                    <div className="margen"></div>
                    <Form.Item name="time-picker"  >
                    <TimePicker 
                      hideDisabledOptions={true} 
                      showNow={false} 
                      disabled={timetrue} 
                      defaultValue={""} 
                      disabledMinutes={(a)=>minutsnot(a)} 
                      onchange={(e) => setHora(e.value)} 
                      minuteStep={5} 
                      disabledHours={()=>horasnot()} 
                      format={format} />
                  </Form.Item>
                  </div>

                  <div className="p-col-7 p-md-5 p-lg-3">
                  <div className="margen"></div>
                    <div>
                    <span>Seleccione el canal de su cita</span>
                    <div className="margen"></div>

                   {canales1.map((canal, index)=>{
                     return(
                      <div key={index} className="p-field-radiobutton">
                        <RadioButton inputId={canal} name={canal} value={canal} onChange={(e) => setCanalSelected(e.value)} checked={canalSelected === canal} />                 
                        <Icono id="miIcon" tipo="canal" codigo={canal} nombre={canal}></Icono>
                        <label htmlFor="city1">{canal}</label>
                      </div>
                     )                      
                    })}
                   <div className="margen"></div>


                     <div className="divcontratar">
                        <Button type="primary" htmlType="submit" className="precio" simple color="primary" size="lg">
                          <span className="precioText">CONCERTAR CITA</span>
                        </Button> 
                      </div>

                    </div>
                    </div>

                    
                    <Toast className="toast1" ref={toast}></Toast>
                    

                    <div className="margen"></div>
                </div>
                </Form>

              </div>
            </div>

            <Modal
              title="Confirmación de cita"
              visible={visible}
              onOk={handleOk}
              confirmLoading={confirmLoading}
              onCancel={handleCancel}
            >
              {console.log(fecha!==null?fechaNum():"")}
              <p>¿Está seguro que desea concertar una cita con {profesional1!==null?profesional1[0]?.nombreperfil:""}, mediante {canalSelected}, el día {fecha!==null?fechaNum()[0]:""} de {fecha!==null?fechaNum()[1]:""} de {fecha!==null?fechaNum()[2]:""} a las {hora}?</p>
            </Modal>

          </div>
          
          
        )
      }
      return (
        <div>
    
          {header()}
          {parallax()
          }
    
          {props.global !== null ? body() :
    
            <Fragment>
              <div className={classNames(classes.main, classes.mainRaised)}>
                <div>
                  <div className={classes.container}>
                    <Cargando />
                  </div>
                </div>
              </div>
            </Fragment>}
    
        </div>
      );
    }
    
    const mapStateToProps = (rootReducer) => {
      return { global: rootReducer.auth };
    };
    
    export default connect(mapStateToProps, authAction)(ProfilePageCliente);
    


