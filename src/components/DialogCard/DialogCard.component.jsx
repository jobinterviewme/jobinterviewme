import React, { useEffect, useState } from 'react';
import {  Button, Modal  } from "antd";
import { ExclamationCircleOutlined } from '@ant-design/icons';
import AxiosConexionConfig from 'conexion/AxiosConexionConfig';

const { confirm } = Modal;

const DialogCard = (props) => {

  const [cita,setCita] = useState(props.cita);

  useEffect(() => {
    setCita(props.cita);
    console.log(props.cita);
  }, [props.cita]);


  function ConfirmarCita() {

    const UrlModificarCita = "/citas/"+ cita.idcita

    setCita(props.cita);
    
    const jsonActivada={
      confirmada:"true"
    }    

    confirm({
      title: 'Confirmar Cita',
      icon: <ExclamationCircleOutlined />,
      content: 'Está seguro que desea confirmar esta cita?',
       onOk() {
        return AxiosConexionConfig.patch(UrlModificarCita,JSON.stringify(jsonActivada)).then(()=>cerrarLosDos() ).catch(() => console.log('Oops errores!'));
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

  function DeclinarCita() {

    const UrlModificarCita = "/citas/"+ cita.idcita

    const jsonDeclinar={
      confirmada:"decline"
    }    

    confirm({
      title: 'Declinar Cita',
      icon: <ExclamationCircleOutlined />,
      content: 'Está seguro que desea declinar esta cita?',
      okText: 'Sí',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        return AxiosConexionConfig.patch(UrlModificarCita,JSON.stringify(jsonDeclinar)).then(()=>cerrarLosDos() ).catch(() => console.log('Oops errores!'));
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

  const cerrarLosDos = () =>{
    props.setReload(true);
    props.setModal1Visible(false)
  }
  
  const botonFooter = () => {
    if(cita!==undefined && cita.confirmada==="false"){
    return(  [
        <Button key="back" onClick={() => props.setModal1Visible(false)}>
          Cancelar
        </Button>,
        <Button onClick={DeclinarCita} >Declinar Cita</Button>,
        <Button onClick={ConfirmarCita}>Confirmar Cita</Button>,            
      ])      
    }
    
    else{
     return( [
        <Button key="back" onClick={() => props.setModal1Visible(false)}>
          Aceptar
        </Button>,                   
      ])
    }}
  
  
  return(<>
    
    <Modal
          title="Resumen de tu cita"
          visible={props.modal1Visible}
          onOk={() => props.setModal1Visible(false)}
          onCancel={() => props.setModal1Visible(false)}
          centered
          width={1000}
          footer={botonFooter()} >

            <p>Cita con {cita!==undefined?cita.CitaUsuario.nombre + " " + cita.CitaUsuario.apellidos + " el día " + cita.fecha + " a las " + cita.hora:""},  </p>
            <p>Reunión por ZOOM.</p>
            <p>Cualquier duda en relación a esta preparación, no dudes en contactar con: jobinterviewme@gmail.com</p>       

      </Modal>    
    </>)

}
export default DialogCard;
