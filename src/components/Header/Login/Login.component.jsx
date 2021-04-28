import { Modal, Form, Input, Space, Select, TimePicker, Row, Col, Tag, InputNumber } from 'antd';
import React, { useState, useEffect } from 'react';
import './Login.style.scss'

import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter.js";
import GoogleLogin from "components/GoogleLogin/GoogleLogin"
import { makeStyles } from "@material-ui/core";
import styles from "../../../assets/jss/material-kit-react/views/loginPage.js";
import Button from "components/CustomButtons/Button.js";

const useStyles = makeStyles(styles);

const LoginPopUp = (props) => {

  const classes = useStyles();

  const onFinish = values => {
    console.log(values);
  };

    return (
      <>       
        <Modal 
          style={{ top: 150 }}
          visible={props.visible}
          onCancel={()=>props.handleCancel()}
          footer={null}
          closable={false}
         >
          <Card>
            <Form layout="vertical" name="dynamic_form_nest_item" onFinish={onFinish}>
              
              <CardHeader color="primary" className={classes.cardHeader}>
                <h4 className="blanco">Iniciar Sesión</h4>
              </CardHeader>              

              <CardBody> 
                <div className={classes.socialLine}>
                  <GoogleLogin link={props.link} texto="Inicia sesión con Google"/>
                </div>                 
                <Form.Item
                  name="email"
                  label="E-mail"
                  rules={[
                    {
                      type: 'email',
                      message: 'The input is not valid E-mail!',
                    },
                    {
                      required: true,
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
                      required: true,
                      message: 'Please input your password!',
                    },
                  ]}
                    
                >
                  <Input.Password />
                </Form.Item> 
              </CardBody>

              <CardFooter className={classes.cardFooter}>
                <Button simple color="primary" size="lg" onClick={()=>props.handleCancel()}>
                  Cancelar
                </Button>
                <Button simple type="submit" color="primary" size="lg">
                  Iniciar Sesión
                </Button>            
              </CardFooter>
            </Form>
          </Card>
        </Modal>
      </>
    );
  }


export default LoginPopUp;