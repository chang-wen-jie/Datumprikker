import { db } from '../firebase/firebaseConfig';
import Event from '../components/event/Event';
import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';

export default function Events() {
  const [eventList, setEventList] = useState([]);

  useEffect(() => {
    const eventsRef = collection(db, 'events');

    const getEvents = async () => {
      const data = await getDocs(eventsRef);

      data.forEach((doc) => {
        setEventList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      });
    };
    getEvents();
  }, []);

  return (
    <>
      <div className='stepper-title' style={{ textAlign: 'center' }}>
        <b>
          <h1>Aankomende afspraken</h1>
        </b>
        <br></br>
        <p>Prik een afspraak die jou intereseerd</p>
      </div>

      <div className='event-list-container'>
        {eventList &&
          eventList.map((item) => {
            return (
              <div key={item.id}>
                <Event eventData={item} />
              </div>
            );
          })}
      </div>
    </>
  );
}
