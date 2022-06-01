import React, { Component } from 'react';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

export default class Date extends Component {
  next = (e) => {
    e.preventDefault();
    this.props.handleNext();
  };

  back = (e) => {
    e.preventDefault();
    this.props.handleBack();
  };

  render() {
    const { values, handleDateChange } = this.props;

    return (
      <>
        <div className='stepper-title'>
          <b>
            <h1>Welke data stel je voor?</h1>
          </b>
          <br />
          <p>Kies een datum</p>
        </div>

        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DesktopDatePicker
            label='Datum'
            value={values.date}
            minDate={new Date('2017-01-01')}
            onChange={handleDateChange('date')}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
      </>
    );
  }
}
