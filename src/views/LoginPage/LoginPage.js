import React from "react";

//styles
import { makeStyles } from "@material-ui/core/styles";
import './LoginPage.style.scss';
import styles from "assets/jss/material-kit-react/views/loginPage.js";

//componentes
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Texto from '../../components/LogTextCards/Texto.component.jsx';
import LogUpCard from "../../components/LogTextCards/LogUpCard.component";

//redux
import * as authAction from "../../store/actions/authAction"
import { connect } from "react-redux";

const useStyles = makeStyles(styles);

function LoginPage(props) {
  //console.log(props)
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");

  setTimeout(function () {
    setCardAnimation("");
  }, 700);

  const classes = useStyles();
  const { ...rest } = props;

  return (
    <div>
      <div
        className={classes.pageHeader}
        style={{
          backgroundColor: "white",
          backgroundSize: "cover",
          backgroundPosition: "top center"
        }}
      >
        <div className={classes.container + " contenedorLogin"}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={5}>
              <Texto hidden={false} />
            </GridItem>

            <GridItem xs={12} sm={12} md={5}>
              <LogUpCard animation={cardAnimaton} />
            </GridItem>
          </GridContainer>


        </div>
      </div>
    </div>
  );
}
const mapStateToProps = (rootReducer) => {
  return { global: rootReducer.auth };
};

export default connect(mapStateToProps, authAction)(LoginPage);