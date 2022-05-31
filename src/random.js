const updateJob = async () => {
  await setDoc(jobCollectionRef, {
    title: "poep",
    task: "poep",
    date: "poep",
    status: "poep",
    author: {
      name: "poep",
      id: "poep",
    },
  });
}

const deleteJob = async (id) => {
  const postDoc = doc(db, "tasks", id);
  await deleteDoc(postDoc);
}

import React, { Fragment, Component } from "react";
import DateFnsUtils from "@date-io/date-fns"; // choose your lib
import {
  DatePicker,
  TimePicker,
  DateTimePicker,
  MuiPickersUtilsProvider
} from "@material-ui/pickers";

export default class CPicker extends Component {
  state = {

      startDate: new Date(),
      endDate: new Date(),
      //here are some other fields which will be available in a FORM
      id: "",
      country: "",
      transport: "",
      tripStatus: "",
      place: "",
      acommodations: "",
      employeeId: "",
      tripIdentifier: ""
  };

  handleStartDate = (date) => {
    this.setState({
        startDate: date
    });
  };

  handleEndDate = (date) => {
    this.setState({
        endDate: date
    });
  };

  render() {
    const {
      startDate, endDate
    } = this.state;
    return (
      <Fragment>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <DatePicker
            value={startDate}
            onChange={this.handleStartDate}
            minDate={new Date()}
          />
        </MuiPickersUtilsProvider>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <DatePicker
            value={endDate}
            onChange={this.handleEndDate}
            minDate={new Date()}
          />
        </MuiPickersUtilsProvider>
      </Fragment>
    );
  }
}
