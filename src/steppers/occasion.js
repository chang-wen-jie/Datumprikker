import React, { Component } from "react";
import TextField from "@mui/material/TextField";

export default class Occasion extends Component {
  next = (e) => {
    e.preventDefault();
    this.props.handleNext();
  };

  render() {
    const { values, handleChange } = this.props;

    return (
      <>
        <div className="stepper-title">
          <b>
            <h1>Wat is de titel van de afspraak?</h1>
          </b>
          <br></br>
          <p>Geef een (korte) omschrijving</p>
        </div>
        <TextField
          label="Titel"
          defaultValue={values.title}
          onChange={handleChange("title")}
        />
        <br />
        <TextField
          label="Omschrijving"
          defaultValue={values.description}
          multiline
          onChange={handleChange("description")}
        />
        <br />
      </>
    );
  }
}
