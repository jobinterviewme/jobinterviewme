import React, { Fragment, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import AxiosConexionConfig from 'conexion/AxiosConexionConfig';

//styles
import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/material-kit-react/views/loginPage.js";
import './ProfesionalesPreview.style.scss';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';

//componentes
import Header from '../../components/Header/Header';
import HeaderLinks from '../../components/Header/HeaderLinks';
import GridContainer from '../../components/Grid/GridContainer';
import GridItem from '../../components/Grid/GridItem';
import Card from '../../components/Card/Card';
import CardHeader from '../../components/Card/CardHeader';
import CardBody from '../../components/Card/CardBody';
import CardFooter from '../../components/Card/CardFooter';
import Button from "../../components/CustomButtons/Button.js";
import Icono from '../../components/Icono/Icono.component';
import Loading from '../../components/Loading/Loading';

//JSON
import Canales from '../../assets/json/canales.json';
import sectorJSON from '../../assets/json/sectores.json';
import idiomasJSON from '../../assets/json/idiomas.json';

//Constantes
import { linkperfilpor } from 'configuracion/constantes';
import { urlProfesional,urlCount } from 'configuracion/constantes';

//PrimeReact
import { Paginator } from 'primereact/paginator';
import { InputText } from 'primereact/inputtext';
import { AutoComplete } from 'primereact/autocomplete';


const useStyles = makeStyles(styles);


const ProfesionalesPreview = (props) => {
    const classes = useStyles();
    const history=useHistory()
    const [loading, setLoading]=useState(true)
    const [profesionales, setProfesionales]=useState(null)
    const [contentFirst, setContentFirst] = useState(0);
    const [contentRows, setContentRows] = useState(9);
    const [cantidadProfesionales, setCantidadProfesionales]=useState()
    const [getTarifa, setTarifa] = useState("");
    const [gethashtag, sethashtag] = useState("");
    const [profesionalesList, setProfesionalesList]=useState([])
    const [reload, setReload] = useState(false);
    const [sectores, setSectores] = useState([]);
    const [idiomas, setIdiomas] = useState(null)
    const [selectedIdiomas, setSelectedIdiomas] = useState(null);
    const [filteredIdiomas, setFilteredIdiomas] = useState(null);
    const [selectedSector, setSelectedSector] = useState(null);
    const [filteredSector, setFilteredSector] = useState(null);

    const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
        setTimeout(function () {
        setCardAnimation("");
    }, 700);

    const { ...rest } = props;

    //const idiomasArray = idiomas.idiomas;

    const ArrayProfesionales = Canales.canales;
    
    const goToPerfil=(id)=>{
        history.push(linkperfilpor+"?"+id)
    }

    useEffect(() => {
        setSectores(sectorJSON.sectores);
        setIdiomas(idiomasJSON.idiomas)
    }, []);


    useEffect(() => {
      RefreshUsuario()
      cantidadProf()
    }, [contentFirst,getTarifa, reload]);

    const restaurar=()=>{
      setContentFirst(0)
    }
    const filtros=(profesional)=>{
      const requestOptions = JSON.stringify({
        offset:contentFirst,
        limit:contentRows,
        where: {and:[
          {tarifa:{lte: (getTarifa===0||getTarifa==="")?1000000:getTarifa}},
          (selectedIdiomas!==null&&selectedIdiomas!=="")?
              {idiomas:{like:'%'+selectedIdiomas.codigo+'%'}}:
              {idiomas:{like:'%'+""+'%'}},
          (selectedSector!==null&&selectedSector!=="")?
              {sectores:{like:'%'+selectedSector.name+'%'}}:
              {sectores:{like:'%'+""+'%'}},
          (gethashtag!==null&&gethashtag!=="")?
              {hashtags:{like:'%'+gethashtag+'%'}}:
              {hashtags:{like:'%'+""+'%'}}           
        ]
                
          }
      });
      const requestOptions2 = JSON.stringify({ 
        and:[
           {tarifa:{lte: (getTarifa===0||getTarifa==="")?1000000:getTarifa}} ,
           (selectedIdiomas!==null&&selectedIdiomas!=="")?
               {idiomas:{like:'%'+selectedIdiomas.codigo+'%'}}:
               {idiomas:{like:'%'+""+'%'}},
           (selectedSector!==null&&selectedSector!=="")?
               {sectores:{like:'%'+selectedSector.name+'%'}}:
               {sectores:{like:'%'+""+'%'}},
           (gethashtag!==null&&gethashtag!=="")?
               {hashtags:{like:'%'+gethashtag+'%'}}:
               {hashtags:{like:'%'+""+'%'}}
        ]
     }); 
      return(profesional?requestOptions:requestOptions2)
    }
    async function RefreshUsuario(){
      setLoading(true)
      const url = urlProfesional+"?filter=";
      let urlencode=encodeURIComponent(filtros(true));
      try {
          const respuesta = await AxiosConexionConfig.get(url+urlencode );
          setProfesionales(respuesta.data)
          setLoading(false)
      } catch (e) {
          console.log(e);
      }
    }

    async function cantidadProf(){
      const url = "/profesionals"+urlCount+"?where=";
      let urlencode=encodeURIComponent(filtros(false));
      try {
          const respuesta = await AxiosConexionConfig.get(url+urlencode);
          setCantidadProfesionales(respuesta.data.count)
      } catch (e) {
          console.log(e);
      }
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
    const searchSector = (event) => {
      setTimeout(() => {
          let _filteredSector;
          if (!event.query.trim().length) {
            _filteredSector = [...sectores];
          }
          else {
            _filteredSector = sectores.filter((sector) => {
                  return sector.name.toLowerCase().startsWith(event.query.toLowerCase());
              });
          }
          setFilteredSector(_filteredSector);
      }, 250);
  }
    const ProfesionalCard=(profesional)=>{
      return(
        <Card id="cardProf" className={classes[cardAnimaton]}>
                <form className={classes.form}>
                  <CardHeader id="cardheader" color="primary" className={classes.cardHeader}>                                     
                  </CardHeader>
                  
                  <CardBody>
                  <div className={classes.profile}>
                    <div className="divImg">
                      <img src= {"data:image/png;base64,"+profesional.imagen} alt="..." className="imgRaised imgRoundedCircle imgFluid" />  
                      <div id="letras">
                          <h3 className={classes.title}>{(profesional.nombreperfil).toUpperCase()}</h3>                         
                          <p>{profesional.annosexperiencia} años de experiencia</p>
                          <span className="span">{profesional.hashtags}</span> 
                          <div>
                          {profesional.idiomas !== null ?
                          profesional.idiomas.split(",")
                            .map((idioma, index) => (
                                <Icono codigo={idioma} tipo="bandera" key={index} nombre={idioma} id={index} />
                            )) : <Fragment />}                     
                        </div> 
                      </div>
                    </div>
                  </div>
                  </CardBody>
                  
                  <CardFooter className={classes.cardFooter}>
                    <Button className="precio" simple color="primary" onClick={()=>goToPerfil(profesional.idusuario)} size="lg">
                      <span className="precioText">{profesional.tarifa}€ / {profesional.duracion}’ entrevista</span>
                    </Button>                    
                  </CardFooter>

                </form>
              </Card>
      )
    }
    const Profesionales=()=>{
        return(
          <div id="contenedor1" className={classes.container}>
            <GridContainer justify="center">           


            {profesionales !== null ?
            profesionales
            .map((profesional, index) => (
                
              <GridItem xs={12} sm={12} md={4} key={index}>
                  {ProfesionalCard(profesional)}
              </GridItem>
              )) : <Fragment />}
            </GridContainer>
          </div>      
        )
    }
    
    
    const onContentPageChange = (event) => {
      //console.log(event)
        setContentFirst(event.first);
        //setContentRows(event.rows);
    }
    const template3 = {
      layout: 'FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink',      
      'CurrentPageReport': (options) => {
          return (
              <span style={{ color: 'var(--text-color)', userSelect: 'none', width: '120px', textAlign: 'center' }}>
                  {options.first} - {options.last} de {options.totalRecords}
              </span>
          )
      }
    }
     const Paginador=()=>{
      return(
        <div id="contenedor1" className={classes.container+" paginator-demo"}>
            <div className="card">
                <Paginator 
                    first={contentFirst} 
                    rows={contentRows} 
                    totalRecords={cantidadProfesionales} 
                    onPageChange={onContentPageChange}
                    template={template3}>
                </Paginator>
                <div className="image-gallery">
                </div>
            </div>
        </div>
        )
    }
    return (
        <>
          <Header
            fixed
            color="white"
            brand=""
            rightLinks={<HeaderLinks />}
            {...rest}
          />

<div
        className={classes.pageHeader}
        style={{
          backgroundColor: "white",
          backgroundSize: "cover",
          backgroundPosition: "top center"
        }}
      >
          <div id="contenedor" className={classes.container}>
              <GridContainer justify="center">
                <GridItem xs={12} sm={12} md={3}>
                  <h4 className="titulo4">PREPARA TU ENTREVISTA</h4>              
                  <span className="span">Profesionales a tu disposición</span>
                </GridItem>
                <GridItem xs={12} sm={12} md={9}>
                <label id="color">Filtrar por:</label>
                  <div className="filtrar">
                  
                  <div className="MuiFormControl-root makeStyles-formControl-87">
                      <span className="p-float-label MuiInputBase-root MuiInput-root MuiInput-underline makeStyles-underline-80 MuiInputBase-formControl MuiInput-formControl">
                        <AutoComplete 
                          value={selectedSector} 
                          suggestions={filteredSector} 
                          completeMethod={searchSector} 
                          field="name" 
                          inputClassName={"inputAutocomplate MuiInputBase-input MuiInput-input makeStyles-input-88" }
                          forceSelection
                          onChange={(e) => {if(e.value!==null){setSelectedSector(e.value);setReload(!reload);}}} 
                          onClear={()=>{setSelectedSector(null),setReload(!reload)}}
                          //onSelect={(e) => {setSelectedIdiomas(e.value),setReload(!reload)}} 
                        />
                        <label htmlFor="autocomplete">Sector</label>
                      </span>
                    </div>
                    <div className="MuiFormControl-root makeStyles-formControl-87">
                        <span className="p-float-label MuiInputBase-root MuiInput-root MuiInput-underline makeStyles-underline-80 MuiInputBase-formControl MuiInput-formControl">
                            <InputText id="precio" 
                                value={getTarifa} 
                                className="MuiInputBase-input MuiInput-input makeStyles-input-88" 
                                onChange={(e) => {restaurar(),setTarifa(e.target.value)}} />
                            <label htmlFor="precio">Precio</label>
                        </span>
                    </div>
                    <div className="MuiFormControl-root makeStyles-formControl-87">
                      <span className="p-float-label MuiInputBase-root MuiInput-root MuiInput-underline makeStyles-underline-80 MuiInputBase-formControl MuiInput-formControl">
                        <AutoComplete 
                          value={selectedIdiomas} 
                          suggestions={filteredIdiomas} 
                          completeMethod={searchIdioma} 
                          field="nombre" 
                          inputClassName={"inputAutocomplate MuiInputBase-input MuiInput-input makeStyles-input-88" }
                          forceSelection
                          onChange={(e) => {if(e.value!==null){setSelectedIdiomas(e.value);setReload(!reload);}}} 
                          onClear={()=>{setSelectedIdiomas(null),setReload(!reload)}}
                          //onSelect={(e) => {setSelectedIdiomas(e.value),setReload(!reload)}} 
                        />
                        <label htmlFor="autocomplete">Idioma</label>
                      </span>
                    </div>
                    

                    <div className="MuiFormControl-root makeStyles-formControl-87">
                        <span className="p-float-label MuiInputBase-root MuiInput-root MuiInput-underline makeStyles-underline-80 MuiInputBase-formControl MuiInput-formControl">
                            <InputText id="hashtag" 
                                className="MuiInputBase-input MuiInput-input makeStyles-input-88" 
                                 />
                            <label htmlFor="hashtag">Tipo</label>
                        </span>
                    </div>

                    <div className="MuiFormControl-root makeStyles-formControl-87">
                        <span className="p-float-label MuiInputBase-root MuiInput-root MuiInput-underline makeStyles-underline-80 MuiInputBase-formControl MuiInput-formControl">
                            <InputText id="hashtag" 
                                value={gethashtag} 
                                className="MuiInputBase-input MuiInput-input makeStyles-input-88" 
                                onChange={(e) => {sethashtag(e.target.value),setReload(!reload)}} />
                            <label htmlFor="hashtag">Hashtag</label>
                        </span>
                    </div>
                                       
                  </div>
                </GridItem>
                </GridContainer>
            </div>
            {loading?<Loading/>:
            Profesionales()}
            {loading?<Fragment/>:
            Paginador()}
        </div>

    </> )



}

export default ProfesionalesPreview