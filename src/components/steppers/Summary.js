import React, { Component } from 'react';
import TextField from '@mui/material/TextField';

export default class Summary extends Component {
  styles = {
    textFieldStyle: {
      width: '25%',
      margin: '0% 3% 1% 3%',
    },
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
            <h1>Overzicht van jouw afspraak</h1>
          </b>
          <br></br>
          <p>Sla deze afspraak op</p>
        </div>
        <TextField
          label="Titel"
          defaultValue={values.title}
          onChange={handleChange('title')}
          style={this.styles.textFieldStyle}
        />
        <TextField
          label="Omschrijving"
          defaultValue={values.description}
          onChange={handleChange('description')}
          style={this.styles.textFieldStyle}
        />
        <br />
        <TextField
          label="Datum"
          defaultValue={values.date}
          onChange={handleChange('date')}
          style={this.styles.textFieldStyle}
        />
        <TextField
          label="Locatie"
          defaultValue={values.location}
          onChange={handleChange('location')}
          style={this.styles.textFieldStyle}
        />
        <br />
        <TextField
          label="Naam"
          defaultValue={values.name}
          onChange={handleChange('name')}
          style={this.styles.textFieldStyle}
        />
        <TextField
          label="E-mailadres"
          defaultValue={values.email}
          onChange={handleChange('email')}
          style={this.styles.textFieldStyle}
        />
      </>
    );
  }
}
