import React, { Component } from 'react'
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
    const { values, handleChange } = this.props;
    // const [value, setValue] = React.useState(new Date());
    const [value, setValue] = "test";
    
    return (
      <>
          <div className="stepper-title">
              <b><h1>Welke data stel je voor?</h1></b><br></br><p>Kies een datum</p>
          </div>
          <TextField
              label="Datum"
              defaultValue={values.date}
              onChange={handleChange('date')}
          />

          <br />

          <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DesktopDatePicker
                label="For desktop"
                value={value}
                minDate={new Date('2017-01-01')}
                onChange={(newValue) => {
                  setValue(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
          </LocalizationProvider>
      </>
    )
  }
}
