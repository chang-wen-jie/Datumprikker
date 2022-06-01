import React, { Component } from 'react';
import TextField from '@mui/material/TextField';

export default class Organizer extends Component {
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
            <h1>Wie ben je?</h1>
          </b>
          <br />
          <p>Vul jouw persoonsgegevens in</p>
        </div>

        <TextField
          label="Naam"
          defaultValue={values.name}
          onChange={handleChange('name')}
        />

        <br />

        <TextField
          label="E-mailadres"
          defaultValue={values.email}
          onChange={handleChange('email')}
        />
      </>
    );
  }
}
