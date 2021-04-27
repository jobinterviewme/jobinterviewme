import React, { useState, useEffect } from 'react';
import 'antd/dist/antd.css';
import { Form, Input, Button, Space, Select, TimePicker, Row, Col, Tag, InputNumber } from 'antd';
import { CalendarOutlined, CalendarTwoTone, MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import moment, { duration } from 'moment';
import canalesJSON from "../../assets/json/canales.json"
import './Oferta.style.scss';
import Calendario from '../../components/Calendario/Calendario.component';



const Oferta1 = (props) => {
    //console.log(props.valores)

    const [duracion, setDuracion]=useState("");
    const [tipoPreparación, settipoPreparación]=useState(props.valores.tipoPreparación)
    const [duracionX, setDuracionX]=useState(props.valores.duracion)
    const [agenda, setagenda]=useState(props.valores.agenda)
    const [tarifa, settarifa]=useState(props.valores.tarifa)
    const [canales, setcanales]=useState(props.valores.canales)
    const onFinish = values => {
      console.log('Received values of form:', values);
      props.segundosValores(values)
      props.UploadUsuario()
    };
    const initialValue={
        duracion:duracionX,
        tipoPreparación:tipoPreparación,
        tarifa:tarifa,
        canales:canales,
        agenda:agenda
    }
    const onAbort=()=>{
        //console.log(agenda)
        let values={}
        values.tipoPreparación=tipoPreparación
        values.duracion=duracion
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
        console.log(`selected ${value}`);
        setcanales(value)
    }

    function onChangeDuracion(value) {
        setDuracion(value);
    }

  
    return (
        
            <Form  layout="vertical" name="dynamic_form_nest_item" onFinish={onFinish} autoComplete="off"
            initialvalue={initialValue}>
                
            <Row className= "OfertaFrom">
                <Col span={12} className= "OfertaCol1">
                    <h4>Definición del servicio</h4>
                    <Form.Item
                        label="Tipo de preparación"
                        name="tipoPreparación"
                        rules={[{
                            required: true,
                            message: 'Please input your Tipo de preparación!',
                        },]}
                    >
                        <Input defaultValue={tipoPreparación} onChange={(e)=>settipoPreparación(e.target.value)} placeholder="Tipo de preparación"/>
                    </Form.Item>

                    <Form.Item
                        name="duracion"
                        label="Duración"
                        rules={[
                        {
                            required: true,
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
                            required: true,
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
                            required: true,
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
                    <label htmlFor="dynamic_form_nest_item_tipoPreparación" className="ant-form-item-required" title="Adiciona días de la semana disponibles">
                        Selecciona el horario disponible para que puedan contratar tus servicios:
                    </label>
                </div>

                    <Form.List name="agenda" >
                    {(fields, { add, remove }) => (
                        <>
                        {fields.map(({ key, name, fieldKey, ...restField }) => (
                            <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                            <Form.Item
                                {...restField}
                                name={[name, 'dia']}
                                fieldKey={[fieldKey, 'dia']}
                                rules={[{ required: true, message: 'Missing Day' }]}
                            >
                            <Select
                                showSearch
                                style={{ width: 200 }}
                                placeholder="Select a day"
                                optionFilterProp="children"
                                
                                filterOption={(input, option) =>
                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                            >
                                <Option value="lunes">Lunes</Option>
                                <Option value="martes">Martes</Option>
                                <Option value="miércoles">Miércoles</Option>
                                <Option value="jueves">Jueves</Option>
                                <Option value="viernes">Viernes</Option>
                                <Option value="sabado">Sábado</Option>
                                <Option value="domingo">Domingo</Option>
                                
                            </Select>
                            </Form.Item>
                            <Form.Item
                                {...restField}
                                name={[name, 'time']}
                                fieldKey={[fieldKey, 'time']}
                                rules={[{ required: true, message: 'Missing Time' }]}
                            >
                            <TimePicker.RangePicker minuteStep={5} defaultValue={moment('12:08', format)} format={format} />
                            
                            </Form.Item>
                            
                            <MinusCircleOutlined onClick={() => remove(name)} />
                            </Space>
                        ))}
                        <Form.Item>
                            <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                            Adiciona un día
                            </Button>
                        </Form.Item>
                        </>
                    )}
                    </Form.List>
                    <div className="ant-col ant-form-item-label">
                        <label htmlFor="dynamic_form_nest_item_tipoPreparación" title="Tipo de preparación">
                        No te preocupes si te surgen planes, dispones de un calendario donde especificar los días que no vas a estar disponible.
                        <Calendario/>

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

export default Oferta1;