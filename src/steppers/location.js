import React, { Component } from "react";
import TextField from "@mui/material/TextField";

export default class Location extends Component {
  next = (e) => {
    e.preventDefault();
    this.props.handleNext();
  };

  back = (e) => {
    e.preventDefault();
    this.props.handleBack();
  };

  render() {
    const { values, handleChange } = this.props;

    return (
      <>
        <div className="stepper-title">
          <b>
            <h1>Waar wil je afspreken?</h1>
          </b>
          <br></br>
          <p>Suggesteer een afspreeklocatie</p>
        </div>
        <TextField
          label="Locatie"
          defaultValue={values.location}
          onChange={handleChange("location")}
        />
      </>
    );
  }
}
