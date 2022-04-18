import React, { Fragment } from "react";
import "./App.css";
import { SingleList } from "./Lists/SingleList";
import Form from "./Form/Form";

import { Paper, Grid, CircularProgress } from "@material-ui/core";
import { useSelector } from "react-redux";
import { isLoadingSelector } from "../redux/selectors";

const styles = {
  Paper: {
    padding: 20,
    margin: "auto",
    textAlign: "center",
    width: 500,
  },
};

function App() {
  const isLoading = useSelector(isLoadingSelector);
  return (
    <div className="App">
      <Fragment>
        <Grid container spacing={0}>
          <Grid item xs={12}>
            <Paper style={styles.Paper}>
              <Form />
            </Paper>
          </Grid>
          <Grid item xs={12} style={styles.Paper}>
            {isLoading && <CircularProgress color="primary" />}
            <SingleList />
          </Grid>
        </Grid>
      </Fragment>
    </div>
  );
}

export default App;
