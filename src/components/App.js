import React, { Fragment } from "react";
import "./App.css";
import { SingleList } from "./Lists/SingleList";
import Form from "./Form/Form";

import { Paper, Grid } from "@material-ui/core";

const styles = {
  Paper: {
    padding: 20,
    margin: "auto",
    textAlign: "center",
    width: 500,
  },
};

function App() {
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
            <SingleList />
          </Grid>
        </Grid>
      </Fragment>
    </div>
  );
}

export default App;
