import React, { useEffect, useState } from "react";

import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import { Button } from 'primereact/button';
import sectorJSON from '../../assets/json/sectores.json';
import perfilJSON from '../../assets/json/perfiles.json';

import idiomasJSON from '../../assets/json/idiomas.json';
import { Form, Input, Upload, Space, Select, TimePicker, Row, Col, Tag, InputNumber } from 'antd';
import ImgCrop from 'antd-img-crop';
import TextArea from "antd/lib/input/TextArea";
import { Option } from "antd/lib/mentions";

const Presentacion = (props) => {
    const [sectores, setSectores] = useState([]);
    const [idiomas, setIdiomas] = useState(null)
    const [nombreImagen, setNombreImagen] = useState("")
    const [nombrePerfil, setNombrePerfil] = useState(props.valores.nombrePerfil)
    const [imgPefil, setImgPerfil] = useState(props.valores.imgPefil !== "" ? props.valores.imgPefil : null)
    const [selectedSectores, setSelectedSectores] = useState(props.valores.sectores !== "" ? props.valores.sectores : null);
    const [filteredSectores, setFilteredSectores] = useState(null);
    const [selectedIdiomas, setSelectedIdiomas] = useState(props.valores.idiomas !== "" ? props.valores.idiomas : null);
    const [filteredIdiomas, setFilteredIdiomas] = useState(null);

    useEffect(() => {
        setSectores(sectorJSON.sectores);
        setIdiomas(idiomasJSON.idiomas)
    }, []);

    useEffect(() => {

        setValoresInicioales(props.valores)
    }, [props.valores]);

    const searchSector = (event) => {
        setTimeout(() => {
            let _filteredSectores;
            if (!event.query.trim().length) {
                _filteredSectores = [...sectores];
            }
            else {
                _filteredSectores = sectores.filter((sector) => {
                    return sector.name.toLowerCase().startsWith(event.query.toLowerCase());
                });
            }
            setFilteredSectores(_filteredSectores);
        }, 250);
    }

    const searchIdioma = (event) => {
        setTimeout(() => {
            let _filteredIdioma;
            if (!event.query.trim().length) {
                _filteredIdioma = [...idiomas];
            }
            else {
                _filteredIdioma = idiomas.filter((idiom) => {
                    return idiom.nombre.toLowerCase().startsWith(event.query.toLowerCase());
                });
            }
            setFilteredIdiomas(_filteredIdioma);
        }, 250);
    }
    const handleSubmit = (values) => {
        console.log(values)
        let bandera = true
        /*if (imgPefil === null) {
            setFieldError("imagenperfil", "Imagen de perfil requerida.")
            bandera = false
        }
        if (selectedSectores === null || selectedSectores === []) {
            setFieldError("sectores", "Sectores requeridos.")
            bandera = false
        }
        if (selectedIdiomas === null || selectedIdiomas === []) {
            setFieldError("idiomas", "Idiomas requeridos.")
            bandera = false
        }*/
        if (bandera) {
            /*values.nombrePerfil = nombrePerfil
            values.imagenperfil = imgPefil
            values.sectores = selectedSectores
            values.idiomas = selectedIdiomas*/
            if (values.nombrePerfil === undefined) {
                values.nombrePerfil = nombrePerfil
            }
            values.imagenperfil = imgPefil
            props.primerosValores(values)
            props.goToStep(3);
        } else {
            setSubmitting(false);
        }
    }

    const [valoresIniciales, setValoresInicioales] = useState(props.valores)
    const handleSubmit1 = (values, { setFieldError, setSubmitting }) => {
        console.log(values)
        let bandera = true
        /*if (imgPefil === null) {
            setFieldError("imagenperfil", "Imagen de perfil requerida.")
            bandera = false
        }
        if (selectedSectores === null || selectedSectores === []) {
            setFieldError("sectores", "Sectores requeridos.")
            bandera = false
        }
        if (selectedIdiomas === null || selectedIdiomas === []) {
            setFieldError("idiomas", "Idiomas requeridos.")
            bandera = false
        }*/
        if (bandera) {
            values.nombrePerfil = nombrePerfil
            values.imagenperfil = imgPefil
            values.sectores = selectedSectores
            values.idiomas = selectedIdiomas
            props.primerosValores(values)
            props.goToStep(3);
        } else {
            setSubmitting(false);
        }
    }

    const listaSectores = () => {
        let respuesta = selectedSectores[0].name
        selectedSectores.map((sector, index) => {
            if (index > 0) {
                respuesta = respuesta + "," + sector.name
            }
        })
        return respuesta
    }
    const listaIdiomas = () => {
        let respuesta = selectedIdiomas[0].codigo
        selectedIdiomas.map((idioma, index) => {
            if (index > 0) {
                respuesta = respuesta + "," + idioma.codigo
            }
        })
        return respuesta
    }
    const onChangeImg = (e) => {
        let file = e.target.files[0]
        if (file) {
            const reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = function () {
                var base64 = reader.result
                var s = base64.split(",")
                //valoresIniciales.imagenperfil=e.target
                setImgPerfil(s[1])
                //setNombrePerfil(e.name)
                //setImagen(s[1])
                //setImagenX(s[1])
            }
        }
    }
    const goStep2 = () => {
        //props.goToStep(2)
        console.log(valoresIniciales)
    }
    const invoiceUploadHandler = (e) => {
        console.log(e)
        /*const [file] = files;
        const fileReader = new FileReader();
        fileReader.onload = (e) => {
            uploadInvoice(e.target.result);
        };
        fileReader.readAsDataURL(file);*/
    };

    const onPreview = async file => {
        let src = file.url;
        if (!src) {
            src = await new Promise(resolve => {
                const reader = new FileReader();
                reader.readAsDataURL(file.originFileObj);
                reader.onload = () => resolve(reader.result);
            });
        }
        const image = new Image();
        image.src = src;
        const imgWindow = window.open(src);
        imgWindow.document.write(image.outerHTML);
    };

    const onChange = ({ fileList: newFileList }) => {
        setFileList(newFileList);
        setImgPerfil(newFileList);

    };

    const [fileList, setFileList] = useState([] /*[
        {
          uid: '-1',
          name: 'image.png',
          status: 'done',
          url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        },
      ]*/);

    const sectoresOptions = [];
    sectorJSON.sectores.map((sector) => {
        sectoresOptions.push(<Option key={sector.name}>{sector.name}</Option>);
    });

    const perfilesOptions = [];
    perfilJSON.perfiles.map((perfil) => {
        perfilesOptions.push(<Option key={perfil.name}>{perfil.name}</Option>);
    });

    const idiomasOptions = [];
    idiomasJSON.idiomas.map((idioma) => {
        idiomasOptions.push(<Option key={idioma.nombre}>{idioma.nombre}</Option>);
    });

    return (



        <Form layout="vertical" className="register-form" name="formPresent" onFinish={handleSubmit} autoComplete="off">
            <Row className="OfertaFrom">
                <Col span={12} className="OfertaCol1">
                    <Form.Item
                        label="Nombre de tu perfil"
                        name="nombrePerfil"

                        rules={[{
                            required: nombrePerfil === "" ? true : false,
                            message: 'Por favor introduzca el nombre de su perfil',
                        },]}
                    >
                        <Input
                            defaultValue={nombrePerfil}
                            id="in"
                            value={nombrePerfil}
                            placeholder="Nombre de tu perfil"
                            onChange={(e) => { setNombrePerfil(e.target.value) }}
                            name="nombrePerfil"
                        />
                    </Form.Item>

                    <Form.Item
                        label="Años de experiencia en RRHH"
                        name="annosExperiencia"
                        rules={[{
                            required: true,
                            message: 'Por favor introduzca los años de experiencia',
                        },]}
                    >
                        <InputNumber name="annosExperiencia" min={0} max={70} placeholder={3} />
                    </Form.Item>

                    <Form.Item
                        label="Tu experiencia (máx. 250 caracteres)"
                        name="experiencia"
                        rules={[{
                            required: true,
                            message: 'Por favor introduzca los años de experiencia',
                        },]}
                    >
                        <TextArea showCount rows={6} maxlength={250} maxLength={250} id="experiencia" name="experiencia" aria-describedby="username2-help" />
                    </Form.Item>

                </Col>

                <Col span={12} className="OfertaCol1">

                    <Form.Item
                        label="Imagen de perfil"
                        name="imagenperfilt"
                    >
                        <ImgCrop rotate>
                            <Upload
                                fileList={fileList}
                                onChange={onChange}
                                onPreview={onPreview}
                                listType="picture-card"
                                name="imagenperfil"
                                id="imagenperfil"

                            >
                                {fileList.length < 1 && '+ Adiciona tu imagen de perfil'}
                            </Upload>
                        </ImgCrop>
                    </Form.Item>

                    <Form.Item
                        label="Sectores"
                        name="sectores"
                        rules={[{
                            required: true,
                            message: 'Por favor introduzca los sectores',
                        },]}
                    >
                        <Select mode="tags" value={selectedSectores} style={{ width: '100%' }} placeholder="Sectores" onChange={(e) => setSelectedSectores(e.value)}>
                            {sectoresOptions}
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label="Perfiles"
                        name="perfiles"
                        rules={[{
                            required: true,
                            message: 'Por favor introduzca el perfil',
                        },]}
                    >
                        <Select id="perfiles" mode="tags" style={{ width: '100%' }} placeholder="Perfiles" >
                            {perfilesOptions}
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label="Idiomas"
                        name="idiomas"
                        rules={[{
                            required: true,
                            message: 'Por favor introduzca los idiomas',
                        },]}
                    >
                        <Select mode="tags" value={selectedIdiomas} style={{ width: '100%' }} placeholder="Idiomas" onChange={(e) => setSelectedIdiomas(e.value)}>
                            {idiomasOptions}
                        </Select>
                    </Form.Item>

                </Col>

            </Row>

            <GridContainer>
                {/*<GridItem xs={12} sm={12} md={2}>
                    <div className="p-field p-col p-md-6 p-col-12" >
                        <div className={"center"} >
                            <Button label="Anterior" type="button" onClick={() => { props.goToStep(1) }} icon="pi pi-times" />
                        </div>
                    </div>
                    </GridItem>*/}
                <GridItem xs={12} sm={12} md={2}>
                    <div className="p-field p-col p-md-6 p-col-12" >
                        <div className={"center"} >
                            <Button label="Siguiente" type="submit" icon="pi pi-check" />
                        </div>
                    </div>
                </GridItem>
            </GridContainer>
        </Form >


    )
};
export default Presentacion;

