import { db, auth } from '../../firebase/firebaseConfig';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { doc, updateDoc, deleteDoc, deleteField } from 'firebase/firestore';
import { Button, IconButton } from '@mui/material';
import { PushPin } from '@mui/icons-material';
import DeleteIcon from '@mui/icons-material/Delete';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Moment from 'moment';
import 'moment/locale/nl';

export default function Event({ eventData }) {
  const eventRef = doc(db, 'events', eventData.id);
  const [user] = useAuthState(auth);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const date = eventData.date.toDate();
  const currentDate = new Date();
  Moment.locale('nl');

  let index;
  var pinnedByUser = false;
  if (user) {
    index = (element) => element === user.email;
    if (eventData.interested?.findIndex(index) > -1) {
      pinnedByUser = true;
    }
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const pinEvent = useCallback(async () => {
    if (user) {
      if (!pinnedByUser) {
        await updateDoc(eventRef, {
          interested: [user.email],
        });
      } else {
        eventData.interested.splice(index, 1);

        if (eventData.interested.length === 0) {
          await updateDoc(eventRef, {
            interested: deleteField(),
          });
        } else {
          await updateDoc(eventRef, {
            interested: eventData.interested,
          });
        }
      }
    } else {
      navigate("/login");
    }
  }, [eventData]);

  const deleteEvent = async () => {
    await deleteDoc(eventRef);
  }

  return (
    <Card variant="outlined" sx={{ width: 250 }}>
      <CardContent>
        <div className="pin-container">
          {eventData.interested ? eventData.interested.length : '0'} x

          <IconButton onClick={pinEvent}>
            {pinnedByUser ? (
              <PushPin sx={{ color: '#4285f4' }} />
            ) : (
              <PushPin />
            )}
          </IconButton>
        </div>

        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {Moment(date).format('LL')}
        </Typography>

        <Typography variant="h5" component="div">
          {eventData.occasion.title}
        </Typography>

        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {eventData.location}
        </Typography>

        <Typography variant="body2">
          {eventData.occasion.description}
        </Typography>
      </CardContent>

      <CardActions>
        <Button onClick={handleClickOpen} size="small" itemID={eventData.id}>
          bekijken
        </Button>

        { currentDate > date &&
          <div className='delete-container'>
            <IconButton onClick={deleteEvent}><DeleteIcon sx={{color: "darkred"}} /></IconButton>
          </div>
        }

        <Dialog
          open={open}
          onClose={handleClose}
          PaperProps={{ elevation: 10 }}
        >
          <DialogContent>
            <TextField
              label="Titel"
              defaultValue={eventData.occasion.title}
              fullWidth
              variant="standard"
              InputProps={{
                readOnly: true,
              }}
            />

            <TextField
              label="Description"
              defaultValue={eventData.occasion.description}
              fullWidth
              variant="standard"
              InputProps={{
                readOnly: true,
              }}
            />

            <TextField
              label="Datum"
              defaultValue={Moment(date).format('LL')}
              fullWidth
              variant="standard"
              InputProps={{
                readOnly: true,
              }}
            />

            <TextField
              label="Locatie"
              defaultValue={eventData.location}
              fullWidth
              variant="standard"
              InputProps={{
                readOnly: true,
              }}
            />

            <TextField
              label="Naam"
              defaultValue={eventData.organizer.name}
              fullWidth
              variant="standard"
              InputProps={{
                readOnly: true,
              }}
            />

            <TextField
              label="E-mailadres"
              defaultValue={eventData.organizer.email}
              fullWidth
              variant="standard"
              InputProps={{
                readOnly: true,
              }}
            />
          </DialogContent>

          <DialogActions>
            <Button onClick={handleClose}>terug</Button>
          </DialogActions>
        </Dialog>
      </CardActions>
    </Card>
  );
}
