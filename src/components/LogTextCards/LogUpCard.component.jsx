import React, { useEffect, useState } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Email from "@material-ui/icons/Email";
import People from "@material-ui/icons/People";
// core components
import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import GoogleLogin from "components/GoogleLogin/GoogleLogin"
import styles from "assets/jss/material-kit-react/views/loginPage.js";
import './LogUpCard.styles.scss';
import { Link } from "react-router-dom";
import * as authAction from "../../store/actions/authAction"
import { connect } from "react-redux";
import { Form, Input, Space, Select, TimePicker, Row, Col, Tag, InputNumber } from 'antd';
import Texto from './Texto.component';

const useStyles = makeStyles(styles);


const LogUpCard = (props) => {

  const classes = useStyles();

  const [requerido, setRequerido] = useState(true)


  /*const usuario = {
    nombre: props.global.nombre,
    apellido: props.global.apellido,
    email: props.global.email,
    password: props.global.password
  }*/
  const goToStep2 = () => {
    //props.setUsuario(props.usuario)
    //props.goToStep(2);
  }

  /*useEffect(() => {
    if (props.global.loginGoogle === true) {
      setRequerido(false)
      props.setUsuario(usuario)
      props.goToStep(2);

    }
  }, [props.global.loginGoogle]);*/

  const onFinish = values => {
    goToStep2();
  };

  return (

<Card className={classes[props.animation]}>
  <Form layout="vertical" name="dynamic_form_nest_item" onFinish={onFinish}>
    
    <CardHeader color="primary" className={classes.cardHeader}>
      <h4 className="blanco">Crea tu perfil</h4>
    </CardHeader>

    <div className={classes.socialLine}>
      <GoogleLogin link={props.link} texto="Inscripción con Google" />
    </div>

    <CardBody>
      <Form.Item
        label="Nombre(s)"
        name="nombre"
        rules={[{
          required: requerido,
          message: 'Please input your Tipo de preparación!',
        },]}
      >
        <Input placeholder="Tipo de preparación" />
      </Form.Item>

      <Form.Item
        label="Apellido(s)"
        name="apellido"
        rules={[{
          required: requerido,
          message: 'Please input your Tipo de preparación!',
        },]}
      >
        <Input  placeholder="Tipo de preparación" />
      </Form.Item>


      <Form.Item
        name="email"
        label="E-mail"
        rules={[
          {
            type: 'email',
            message: 'The input is not valid E-mail!',
          },
          {
            required: requerido,
            message: 'Please input your E-mail!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="password"
        label="Password"
        rules={[
          {
            required: requerido,
            message: 'Please input your password!',
          },
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="confirm"
        label="Confirm Password"
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: requerido,
            message: 'Please confirm your password!',
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }

              return Promise.reject(new Error('The two passwords that you entered do not match!'));
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>


    </CardBody>

    <CardFooter className={classes.cardFooter}>

      <Button simple type="submit" color="primary" size="lg">
        Inscríbete
      </Button>
    </CardFooter>
  </Form>

</Card>
)}
export default LogUpCard;