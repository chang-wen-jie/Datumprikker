import { db } from "../firebase/firebaseConfig";
import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Button } from "@mui/material";
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

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
    <div className="event-list-container">
      {
        eventList && eventList.map(event => {
          return (
            <>
              <Card variant="outlined" sx={{ width: 250 }}>
                <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                      {event.date}
                    </Typography>
                    <Typography variant="h5" component="div">
                      {event.occasion.title}
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                      {event.location}
                    </Typography>
                    <Typography variant="body2">
                      {event.occasion.description}
                    </Typography>
                </CardContent>
                <CardActions>
                  <Button onClick={handleClickOpen} size="small">bekijken</Button>
                  <Dialog open={open} onClose={handleClose} PaperProps={{elevation: 1}} hideBackdrop>
                    <DialogTitle>Bekijk deze afspraak of pas wat aan</DialogTitle>
                    <DialogContent>
                      <TextField
                        label="Titel"
                        defaultValue={event.occasion.title}
                        fullWidth
                        variant="standard"
                      />
                      <TextField
                        label="Description"
                        defaultValue={event.occasion.description}
                        fullWidth
                        variant="standard"
                      />
                      <TextField
                        label="Datum"
                        defaultValue={event.date}
                        fullWidth
                        variant="standard"
                      />
                      <TextField
                        label="Locatie"
                        defaultValue={event.location}
                        fullWidth
                        variant="standard"
                      />
                      <TextField
                        label="Naam"
                        defaultValue={event.organizer.name}
                        fullWidth
                        variant="standard"
                      />
                      <TextField
                        label="E-mailadres"
                        defaultValue={event.organizer.email}
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
            </>
            )
        })
      }
    </div>
  );
}