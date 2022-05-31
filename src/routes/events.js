import { db } from "../firebase/firebaseConfig";
import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { Button } from "@mui/material";
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

export default function Events() {
  const eventsRef = collection(db, "events");
  const [eventList, setEventList] = useState([]);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const getEvents = async () => {
      const data = await getDocs(eventsRef);

      data.forEach((doc) => {
        setEventList(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
      })
    };
    getEvents();
  }, [])

  return (
    <>
      <div className="stepper-title" style={{textAlign: "center"}}>
          <b><h1>Aankomende afspraken</h1></b><br></br><p>Prik een afspraak die jou intereseerd</p>
      </div>
      <div className="event-list-container">
        {
          eventList && eventList.map((item, index) => {
            return (
              <div key={item.id}>
                <Card variant="outlined" sx={{ width: 250 }}>
                  <CardContent>
                      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        {item.date}
                      </Typography>
                      <Typography variant="h5" component="div">
                        {item.occasion.title}
                      </Typography>
                      <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        {item.location}
                      </Typography>
                      <Typography variant="body2">
                        {item.occasion.description}
                      </Typography>
                  </CardContent>
                  <CardActions>
                    card {index}
                    <Button onClick={handleClickOpen} size="small" itemID={item.id}>bekijken</Button>
                    <Dialog open={open} onClose={handleClose} PaperProps={{elevation: 1}} hideBackdrop>
                      {index}
                      <DialogContent>
                        <TextField
                          label="Titel"
                          defaultValue={eventList[index].occasion.title}
                          fullWidth
                          variant="standard"
                        />
                        <TextField
                          label="Description"
                          defaultValue={eventList[index].occasion.description}
                          fullWidth
                          variant="standard"
                        />
                        <TextField
                          label="Datum"
                          defaultValue={eventList[index].date}
                          fullWidth
                          variant="standard"
                        />
                        <TextField
                          label="Locatie"
                          defaultValue={eventList[index].location}
                          fullWidth
                          variant="standard"
                        />
                        <TextField
                          label="Naam"
                          defaultValue={eventList[index].organizer.name}
                          fullWidth
                          variant="standard"
                        />
                        <TextField
                          label="E-mailadres"
                          defaultValue={eventList[index].organizer.email}
                          fullWidth
                          variant="standard"
                        />
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={handleClose}>terug</Button>
                        <Button onClick={handleClose}>Aanpassen</Button>
                      </DialogActions>
                    </Dialog>
                  </CardActions>
                </Card>
              </div>
              )
          })
        }
      </div>
    </>
  );
}