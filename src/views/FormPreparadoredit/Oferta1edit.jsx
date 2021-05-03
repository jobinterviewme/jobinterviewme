import React, { useState, useEffect } from 'react';
import 'antd/dist/antd.css';
import { Form, Input, Button, Space, Select, TimePicker, Row, Col, Tag, InputNumber } from 'antd';
import { CalendarOutlined, CalendarTwoTone, MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import moment, { duration } from 'moment';
import canalesJSON from "../../assets/json/canales.json"
import './Oferta.style.scss';
import Calendario from '../../components/Calendario/Calendario.component';

import { connect } from "react-redux";
import * as authAction from "../../store/actions/authAction"



const Oferta1 = (props) => {
    //console.log(props.valores)

    const [tipopreparacion, settipopreparacion]=useState(props.global.usuario.tipopreparacion)
    const [duracionX, setDuracionX]=useState(props.global.usuario.duracion)
    const [agenda, setagenda]=useState(props.global.usuario.agenda)
    const [tarifa, settarifa]=useState(props.global.usuario.tarifa)
    const [canales, setcanales]=useState(props.global.usuario.canales?.split(","))
    const [calendario, setCalendario] = useState([]);
    const [fechasnulas, setFechasnulas] = useState(props.global.usuario.fechasnulas?.split(","))
     
    const onFinish = (values) => {
        let valores={}
        if (values.tipoPreparacion === undefined) {
            values.tipoPreparacion = tipopreparacion
        }
        if (values.duracion === undefined) {
            values.duracion = duracionX
        }
        if (values.canales === undefined) {
            values.canales = canales
        }
        if (values.tarifa === undefined) {
            values.tarifa = 11
        }
        if (values.agenda === undefined) {
            values.agenda = agenda
        }
        if (values.calendario === undefined) {
            values.calendario = llenarCal();
        }
       
        console.log(values)
      console.log('Received values of form:', values);
      props.segundosValores(values)
      
    };
    const initialValue={
        duracion:duracionX,
        tipopreparacion:tipopreparacion,
        tarifa:tarifa,
        canales:canales,
        agenda:agenda
    }
    const onAbort=()=>{
        //console.log(agenda)
        let values={}
        values.tipopreparacion=tipopreparacion
        values.duracion=duracionX
        values.canales=canales
        values.tarifa=tarifa
        values.agenda=agenda
        console.log(values)
        /*props.segundosValores(values)
        */
        props.goToStep(1)
    }
    const format = 'HH:mm';

    const children = [];
    
    canalesJSON.canales.map((canal)=>{
        children.push(<Option key={canal.nombre}>{canal.nombre}</Option>);
    })

    function handleChange(value) {
       setcanales(value)
    }

    function onChangeDuracion(value) {
        setDuracionX(value);
    }

    const diass = ["lunes","martes","miércoles","jueves","viernes","sábado","domingo"];

    const array1 =diass;
    const array2 =[];

    const onDeselectDay = (option1, fieldKey) => {


        fieldKey.old=fieldKey.recent;
        fieldKey.recent=fieldKey.value;

        array2.push(option1);
        const indice=array1.indexOf(option1)
        array1.splice(indice, 1);
        
        console.log(option1, fieldKey);

    }   

    const add1 = (value) => {
        console.log(value);
    } 

    const llenarCal = () =>{

        let array="";
        let fecha = "";
        calendario.map(cal=>{
            array += cal?.year + "-" + cal?.month.number + "-" + cal?.day + ","
        })
        console.log(array);

        return array;
        
    }
   
  
    return (
        
            <Form  layout="vertical" name="dynamic_form_nest_item" onFinish={onFinish} autoComplete="off"
            initialvalue={initialValue}>
                
            <Row className= "OfertaFrom">
                <Col span={12} className= "OfertaCol1">
                    <h4>Definición del servicio</h4>
                    <Form.Item
                        label="Tipo de preparación"
                        name="tipopreparacion"
                        rules={[{
                            required: tipopreparacion === "" ? true : false,
                            message: 'Por favor escriba el tipo de preparación que va a ofertar!',
                        },]}
                    >
                        <Input defaultValue={tipopreparacion} onChange={(e)=>settipopreparacion(e.target.value)} placeholder="Tipo de preparación"/>
                    </Form.Item>

                    <Form.Item
                        name="duracion"
                        label="Duración"
                        rules={[
                        {
                            required: duracionX === "" ? true : false,
                            message: 'Por favor seleccione una duración',
                        },
                        ]}
                    >

                    <Select                    
                        showSearch
                        style={{ width: 200 }}
                        placeholder="Duración"
                        optionFilterProp="children"
                        onChange={onChangeDuracion}
                        defaultValue={duracionX}
                        filterOption={(input, option) =>
                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                    >
                        <Option value="30 minutos">30 minutos</Option>
                        <Option value="1 hora">1 hora</Option>
                        <Option value="2 horas">2 horas</Option>
                        <Option value="3 horas">3 horas</Option>
                        <Option value="Medio día">Medio día</Option>
                        <Option value="Día completo">Día completo</Option>
                        <Option value="Semana">Semana</Option>
                        <Option value="Mes">Mes</Option>

                    </Select>
                    </Form.Item>

                    <Form.Item
                        name="canales"
                        label="Canales"
                        rules={[
                        {
                            required: canales === "" ? true : false,
                            message: 'Por favor seleccione al menos un canal',
                        },
                        ]}
                    >
                        <Select mode="tags" style={{ width: '100%' }} placeholder="Canales" defaultValue={canales} onChange={handleChange}>
                            {children}
                        </Select>
                    </Form.Item>

                    <Form.Item
                        name="tarifa"
                        label="Tarifa"
                        rules={[
                        {
                            required: tarifa === "" ? true : false,
                            message: 'Por favor seleccione al menos una tarifa',
                        },
                        ]}
                    >
                        <InputNumber
                            onChange={(e)=>{settarifa(e)}}
                            defaultValue={tarifa}
                            formatter={value => `${value} €`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            //parser={value => value.replace(/\€\s?|(,*)\€/g, '')}
                        />
                    </Form.Item>

                </Col>

                <Col span={12} className= "OfertaCol2">
                <h4>Agenda</h4>
                <div className="ant-col ant-form-item-label">
                    <label htmlFor="dynamic_form_nest_item_tipopreparacion" className="ant-form-item-required" title="Adiciona días de la semana disponibles">
                        Selecciona el horario disponible para que puedan contratar tus servicios:
                    </label>
                </div>

                    <Form.List name="agenda" >
                    {(fields, { add, remove }) => (
                        <>
                        
                        {fields.map(({ key, name, fieldKey, ...restField }) => (
                            <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                                <div className="p-grid">
                                    <div className="p-col-fixed" style={{ width: '100px'}} >                                        
                                        <label htmlFor="dynamic_form_nest_item_tipopreparacion" className="ant-form-item-required" title="Adiciona días de la semana disponibles">
                                            {diass[name]}
                                        </label>
                                    </div>
                           
                            <div className="p-col-7">
                                <Form.Item
                                {...restField}
                                name={[name, 'time']}
                                fieldKey={[fieldKey, 'time']}
                                rules={[{ required: true, message: 'Introduzca la hora' }]}
                            >
                            <TimePicker.RangePicker minuteStep={5} defaultValue={moment('12:08', format)} format={format} />
                            
                            </Form.Item>
                                 </div>
                                 <div className="p-col-1">
                            <MinusCircleOutlined onClick={() => remove(name)} />
                            </div>


                            </div>
                            </Space>
                        ))}
                        <Form.Item>
                        {fields.length < 7  ? (
                            <Button type="dashed" className="botonadd"onClick={(value) => add(value)} block icon={<PlusOutlined />}>
                            Adiciona un día
                            </Button>):null}
                        </Form.Item>
                        </>
                    )}
                    </Form.List>


                    <div className="p-col-10">
                        <label htmlFor="dynamic_form_nest_item_tipopreparacion" title="Tipo de preparación">
                        No te preocupes si te surgen planes, dispones de un calendario donde especificar los días que no vas a estar disponible.
                        <Calendario id="idCal" calendario={calendario} setCalendario={(value)=>setCalendario(value)}/>        

                        </label>
                    </div>
        
      
                </Col>
            </Row>
            <Row>
            <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                    </Form.Item>
            <Form.Item>
                    <Button
                        style={{
                        margin: '0 8px',
                        }}
                        onClick={() => {onAbort();
                        }}
                    >
                        Anterior
                    </Button>
          </Form.Item>
            </Row>


        </Form>

    );
  };

  const mapStateToProps = (rootReducer) => {
    return { global: rootReducer.auth };
};

export default connect(mapStateToProps, authAction)(Oferta1);
