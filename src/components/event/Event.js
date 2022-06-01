import { db, auth } from '../../firebase/firebaseConfig';
import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { collection, doc, getDocs, updateDoc, deleteDoc, query, where, increment } from 'firebase/firestore';
import { Button, IconButton } from '@mui/material';
import { PushPin } from '@mui/icons-material';
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
  const [user] = useAuthState(auth);
  const [open, setOpen] = useState(false);
  const date = eventData.date.toDate();

  Moment.locale('nl');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const pinEvent = async () => {
    const eventRef = doc(db, 'events', eventData.id);
    const usersRef = collection(db, 'users');
    // const userQuery = query(usersRef, where('uid', '==', user.uid));
    // const userDoc = await getDocs(userQuery);

    await updateDoc(eventRef, {
      pins: increment(1)
    });

    await updateDoc(usersRef, where('uid', '===', user.uid), {
        pinnedEvents: [
            eventData.id
        ]
    });
  }

  return (
    <Card variant='outlined' sx={{ width: 250 }}>
      <CardContent>
        <div className="pin-container">
            {eventData.pins}
            {user &&  <IconButton onClick={pinEvent}><PushPin /></IconButton> }
        </div>

        <Typography sx={{ fontSize: 14 }} color='text.secondary' gutterBottom>
          {Moment(date).format("LL")}
        </Typography>

        <Typography variant='h5' component='div'>
          {eventData.occasion.title}
        </Typography>

        <Typography sx={{ mb: 1.5 }} color='text.secondary'>
          {eventData.location}
        </Typography>

        <Typography variant='body2'>
          {eventData.occasion.description}
        </Typography>
      </CardContent>

      <CardActions>
        <Button onClick={handleClickOpen} size='small' itemID={eventData.id}>
          bekijken
        </Button>

        <Dialog
          open={open}
          onClose={handleClose}
          PaperProps={{ elevation: 10 }}
        >
          <DialogContent>
            <TextField
              label='Titel'
              defaultValue={eventData.occasion.title}
              fullWidth
              variant='standard'
            />

            <TextField
              label='Description'
              defaultValue={eventData.occasion.description}
              fullWidth
              variant='standard'
            />

            <TextField
              label='Datum'
              defaultValue={eventData.date}
              fullWidth
              variant='standard'
            />

            <TextField
              label='Locatie'
              defaultValue={eventData.location}
              fullWidth
              variant='standard'
            />

            <TextField
              label='Naam'
              defaultValue={eventData.organizer.name}
              fullWidth
              variant='standard'
            />

            <TextField
              label='E-mailadres'
              defaultValue={eventData.organizer.email}
              fullWidth
              variant='standard'
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>terug</Button>

            <Button onClick={handleClose}>Aanpassen</Button>
          </DialogActions>
        </Dialog>
      </CardActions>
    </Card>
  );
}
