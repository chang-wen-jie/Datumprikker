import { db } from '../firebase/firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import Occasion from '../components/steppers/Occasion';
import Date from '../components/steppers/Date';
import Location from '../components/steppers/Location';
import Organizer from '../components/steppers/Organizer';
import Summary from '../components/steppers/Summary';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import MobileStepper from '@mui/material/MobileStepper';
import { Button } from '@mui/material';
import Divider from '@mui/material/Divider';

export default class Form extends Component {
  eventsRef = collection(db, 'events');

  styles = {
    routerLinkStyle: { textDecoration: 'none' },
    routerDisabledLinkStyle: { textDecoration: 'none', pointerEvents: 'none' },

    buttonStyle: {
      width: '14%',
      marginTop: '1%',
      padding: '0.6%',
      boxShadow: 'none',
      fontWeight: 'bold',
      textTransform: 'none',
    },
  };

  state = {
    step: 0,
    title: '',
    description: '',
    date: '',
    location: '',
    name: '',
    email: '',
  };

  stepName = ['wat', 'wanneer', 'waar', 'wie', 'overzicht'];

  newEvent = async () => {
    const { title, description, date, location, name, email } = this.state;
    const values = { title, description, date, location, name, email };

    await addDoc(this.eventsRef, {
      date: values.date,
      location: values.location,
      occasion: {
        title: values.title,
        description: values.description,
      },
      organizer: {
        name: values.name,
        email: values.email,
      },
    });
  };

  handleSteps = () => {
    const { step, title, description, date, location, name, email } =
      this.state;
    const values = { title, description, date, location, name, email };

    switch (step) {
      case 0:
        return (
          <Occasion
            handleNext={this.handleNext}
            handleChange={this.handleChange}
            values={values}
          />
        );
      case 1:
        return (
          <Date
            handleNext={this.handleNext}
            handleBack={this.handleBack}
            handleDateChange={this.handleDateChange}
            values={values}
          />
        );
      case 2:
        return (
          <Location
            handleNext={this.handleNext}
            handleBack={this.handleBack}
            handleChange={this.handleChange}
            values={values}
          />
        );
      case 3:
        return (
          <Organizer
            handleNext={this.handleNext}
            handleBack={this.handleBack}
            handleChange={this.handleChange}
            values={values}
          />
        );
      case 4:
        return (
          <Summary
            handleBack={this.handleBack}
            handleChange={this.handleChange}
            values={values}
          />
        );
      default:
        throw new Error('Stap ' + step + ' bestaat niet!');
    }
  };

  handleNext = () => {
    const { step } = this.state;
    this.setState({
      step: step + 1,
    });
  };

  handleBack = () => {
    const { step } = this.state;
    this.setState({
      step: step - 1,
    });
  };

  handleChange = (input) => (e) => {
    this.setState({ [input]: e.target.value });
  };

  handleDateChange = (input) => (e) => {
    this.setState({ [input]: e });
  };

  render() {
    const { step, title, description, date, location, name, email } =
      this.state;
    const values = { title, description, date, location, name, email };

    var formCompleted = true;
    if (
      values.title.length === 0 ||
      values.description.length === 0 ||
      values.date.length === 0 ||
      values.location.length === 0 ||
      values.name.length === 0 ||
      values.email.length === 0
    ) {
      formCompleted = false;
    }

    return (
      <center>
        <div className='stepper-container'>
          <MobileStepper
            position='static'
            variant='progress'
            steps={5}
            activeStep={step}
            nextButton={
              <Button onClick={this.handleNext} disabled={step === 4}>
                {step === 4 ? 'overzicht' : this.stepName[step + 1]}
              </Button>
            }
            backButton={
              <Button onClick={this.handleBack} disabled={step === 0}>
                {step === 0 ? 'wat' : this.stepName[step - 1]}
              </Button>
            }
          />
        </div>

        <div className='form-container'>{this.handleSteps()}</div>

        <div className='button-container'>

          <Divider />

          <Link to={`../`} style={this.styles.routerLinkStyle}>
            <Button
              style={this.styles.buttonStyle}
              sx={{
                marginRight: '1%',
                backgroundColor: '#e7e7e7',
                color: '#999',
                '&:hover': {
                  backgroundColor: '#d9d9d9',
                },
              }}
            >
              annuleren
            </Button>
          </Link>

          <Link
            to={`../`}
            style={
              !formCompleted
                ? this.styles.routerDisabledLinkStyle
                : this.styles.routerLinkStyle
            }
          >
            <Button
              onClick={this.newEvent}
              style={this.styles.buttonStyle}
              sx={{
                backgroundColor: '#179fe8',
                color: 'white',
                '&:hover': {
                  backgroundColor: '#4d94db',
                },
                '&:disabled': {
                  backgroundColor: '#e64a4a',
                },
              }}
              disabled={!formCompleted}
            >
              aanmaken
            </Button>
          </Link>
        </div>
      </center>
    );
  }
}
