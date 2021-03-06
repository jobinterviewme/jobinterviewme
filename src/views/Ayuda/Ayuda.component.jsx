import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import {  Tabs as Tabss }  from 'antd';
import Header from 'components/Header/Header';
import HeaderLinks from 'components/Header/HeaderLinks';
import './Ayuda.style.scss'
import { makeStyles } from "@material-ui/core";
import styles1 from "../../assets/jss/material-kit-react/views/profilePage.js";
import { Theme, useTheme } from '@material-ui/core/styles';

const { TabPane } = Tabss;
const useStyles = makeStyles(styles1);

const styles = theme => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        width: 800,
    },
});

const Ayuda = (props) => {

    const theme = useTheme();    

    function TabContainer({ children, dir }) {
        return (
          <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
            {children}
          </Typography>
        );
      }
      
      TabContainer.propTypes = {
        children: PropTypes.node.isRequired,
        dir: PropTypes.string.isRequired,
      };      
      
    const [value1,setValue1]=useState(0); 
    const [value2,setValue2]=useState(0); 
    const [index, setIndex] = useState(0)

    const handleChange = (event, value) => {
        setIndex( value );
    };
  
    const handleChangeIndex = index1 => {
        setIndex( index1 );
    };

    const classes1 = useStyles();

    const styles = {
      tabs: {
        background: '#fff',
      },
      slide: {
        padding: 15,
        minHeight: 100,
        color: '#fff',
      }      
    };
    
    return (
    <div>
      <Header
        fixed
        color="white"
        brand=""
        rightLinks={<HeaderLinks />}
      />

    <div className={classes1.container + " ojo" }>

      <div> 
          <Tabs value={index} fullWidth onChange={(e,index) => handleChange(e,index)} style={styles.tabs}            
            indicatorColor="primary"
            textColor="primary"
          >
            <Tab className="tabUsuario" label="Usuario" />
            <Tab className="tabPreparador" label="Preparador" />
          </Tabs>

        <SwipeableViews index={index} onChangeIndex={(index1) => handleChangeIndex(index1)}>

          <div className = "UsuarioBlock" style={Object.assign({}, styles.slide)}>
          <TabContainer dir={theme.direction}>          
            <Tabss tabPosition='left'>
                <TabPane tab="??C??mo funciona JobInterviewMe?" key="1">
                <p>Para preparar tu entrevista con un profesional de recursos humanos, solo debes seguir estos 3 pasos:</p>
                    <ol>Buscar al preparador que mejor se adapte a tus necesidades(sector, cargo, idioma, etc.)</ol>
                    <ol> Reservar una fecha de preparaci??n</ol>
                   <ol> Sigue los consejos de tu preparador para ir seguro a tu entrevista</ol>

                </TabPane>
                <TabPane tab="??C??mo contacto con mi preparador?" key="2">
                <p>Una vez reservada la sesi??n con tu preparador, el preparador se pondr?? en contacto contigo v??a e-mail 
Durante el proceso de preparaci??n podr??is seguir en contacto mediante la v??a que os sea m??s c??moda para ambos, por ejemplo: e-mail, whatsapp, LinkedIn, etc. </p>
<ol><i className="pi pi-arrow-right" style={{'color': '#60a7e8'}}></i>   Desde JobInterviewMe estamos trabajando en un chat interno para que la comunicaci??n entre ambos sea m??s c??moda, pero mientras seguimos trabajando??? no queremos poner l??mites a vuestra preparaci??n con los profesionales.
</ol>
                </TabPane>
                <TabPane tab="??Cu??les son los m??todos de pago?" key="3">
                <p>Actualmente en JobinterviewMe no disponemos de plataforma de pago. De modo que el m??todo de pago se acordar?? en cada caso entre el preparador y el usuario. 
                </p>
<p>Si surgiese alg??n inconveniente no dudes en ponerte en contacto con nuestro equipo de atenci??n al cliente, escribiendo al correo jobinterviewme@gmail.com o llamando al n??mero 619862979.
</p>
                </TabPane>
                <TabPane tab="??Existe alg??n tipo de garant??a en la preparaci??n?" key="4">
               <p> En JobInterviewMe creemos en un sistema de valoraci??n sincero y eficaz que te permitir?? valorar la sesi??n de manera que la garant??a de los perfiles de la plataforma se construir?? con la trayectoria de cada uno. Tus valoraciones ayudaran a otras personas a elegir al mejor preparador. 
                 </p>
<p>Adem??s, en JobInterviewMe queremos garantizar la calidad de nuestros servicios. De modo, que en caso de no estar satisfecho con la preparaci??n recibida solo debes escribirnos al correo jobinterviewme@gmail.com o llamarnos al n??mero 619862979 y analizaremos la problem??tica detenidamente. 
En caso de mala praxis del entrevistador, te devolveremos el dinero de forma inmediata y se expedientar?? al preparador.</p>

                </TabPane>
                <TabPane tab="??C??mo puedo cancelar una reserva?" key="5">
               <p> En tu ??rea personal encontraras todas las reservas pendientes por confirmar, realizar o ya realizadas. Haciendo clic en ellas podr??s modificar su estatus actual. De modo que, por ejemplo, una cita ya aceptada se puede cancelar hasta 24 horas antes de la preparaci??n. 
               </p>
               <p>De todas formas, como tendr??s contacto directo con el preparador, se recomienda contactar antes con ??l para aplazar la cita en caso de indisposici??n. 
               </p>
                </TabPane>
                <TabPane tab="??Qu?? puedo hacer si el preparador no me responde?" key="6">
                <p>En caso de no respuesta del preparador, puedes ponerte en contacto con nosotros a trav??s del correo jobinterviewme@gmail.com o llamarnos al n??mero 619862979. </p>
                </TabPane>
            </Tabss>
          </TabContainer>
          </div>
          <div className = "ProfesionalBlock" style={Object.assign({}, styles.slide)}>
          <TabContainer dir={theme.direction}>
          <Tabss tabPosition='left'>
                <TabPane tab="??C??mo funciona JobInterviewMe?" key="1">
                <p>En JobInterviewMe queremos ser una plataforma que te lo pone f??cil. Creemos que puedes ayudar a muchas personas a triunfar y dar una buena impresi??n en sus entrevistas de trabajo.
                </p><p>Para ello solo debes:</p>
                    <ol>Crear tu perfil de preparador</ol>
                    <ol>Indicar la disponibilidad de horas que quieres / puedes dedicar</ol>
                    <ol>Confirmar las reservas que te soliciten los usuarios </ol>
                    <ol>??Preparar a los candidatos para conseguir el trabajo de sus sue??os! </ol>

                </TabPane>
                <TabPane tab="??C??mo contacto con los usuarios / candidatos?" key="2">
               <p> Una vez aceptes la sesi??n que haya reservado el candidato, te llegar?? un email con la confirmaci??n y sus datos para que contactes con ??l/ella por e-mail. 
Durante el proceso de preparaci??n podr??is seguir en contacto mediante la v??a que os sea m??s c??moda para ambos, por ejemplo: e-mail, whatsapp, LinkedIn, etc. </p>
<ol><i className="pi pi-arrow-right" style={{'color': '#60a7e8'}}></i> Desde JobInterviewMe estamos trabajando en un chat interno para que la comunicaci??n entre ambos sea m??s c??moda, pero mientras seguimos trabajando??? no queremos poner l??mites a vuestras relaciones para poder empezar con la preparaci??n. 
</ol>
                </TabPane>
                <TabPane tab="??Cu??les son los m??todos de pago?" key="3">
                <p>Actualmente en JobinterviewMe no disponemos de plataforma de pago. De modo que el m??todo de pago se acordar?? en cada caso entre el preparador y el usuario. 
                Si surgiese alg??n inconveniente no duden en ponerse en contacto con nuestro equipo de atenci??n al cliente, escribiendo al correo jobinterviewme@gmail.com o llamando al n??mero 619862979. 
                </p><ol><i className="pi pi-arrow-right" style={{'color': '#60a7e8'}}></i> Desde JobInterviewMe estamos trabajando en un sistema de pago interno para garantizar el pago, facilitar el proceso y alejaros de complicaciones. De momento, no queremos poner limites a vuestro trabajo y por eso dejamos que vosotros como profesionales gestion??is el pago como consider??is. 
                </ol>
                </TabPane>
                <TabPane tab="??Existe alg??n tipo de garant??a en la preparaci??n?" key="4">
                <p>En JobInterviewMe creemos en un sistema de valoraci??n sincero y eficaz que permitir?? al preparador y al usuario valorar la sesi??n de manera que la garant??a de los perfiles de la plataforma se construir?? con la trayectoria de cada uno. </p>
<p>Adem??s, en JobInterviewMe queremos garantizar la calidad de nuestros servicios. De modo, que en caso de recibir una reclamaci??n por parte de alg??n usuario analizaremos la problem??tica detenidamente. En caso de mala praxis del preparador, se expedientar?? al preparador.
</p>
                </TabPane>
                <TabPane tab="??C??mo puedo cancelar una reserva?" key="5">
               <p> En tu ??rea personal encontraras todas las reservas pendientes por confirmar, realizar o ya realizadas. Haciendo clic en ellas podr??s modificar su estatus actual. De modo que, por ejemplo, una cita ya aceptada se puede cancelar hasta 24 horas antes de la preparaci??n. 
               </p>
               <p>De todas formas, se recomienda contactar antes con el usuario para aplazar la cita en caso de indisposici??n. 
               </p>
                </TabPane>
                <TabPane tab="??Qu?? puedo hacer si el preparador no me responde?" key="6">
                <p>En caso de no respuesta del usuario, puedes ponerte en contacto con nosotros a trav??s del correo jobinterviewme@gmail.com o llamarnos al n??mero 619862979. </p>
                </TabPane>
            </Tabss>
          </TabContainer>
          </div>
        </SwipeableViews>
      </div>
      </div>
      </div>
    );
  
}

Ayuda.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default (Ayuda);