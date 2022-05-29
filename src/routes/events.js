import React from "react";
// import { useState, useEffect } from "react";
// import { db } from "../firebase/firebaseConfig";
// import { collection, getDocs } from "firebase/firestore";
// import { Button } from "@mui/material";

export default function Events() {
  // const eventsRef = collection(db, "events");
  // const [eventList, setEventList] = useState();

  // useEffect(() => {
  //   const data = [];
  //   const getEvents = async () => {
  //     const querySnapshot = await getDocs(eventsRef);

  //     querySnapshot.forEach((doc) => {
  //       data.push(doc.id, doc.data());
  //       // setEventList(doc.id, doc.data())
  //       setEventList(data)
  //       console.log("event", doc.id, doc.data());
  //       console.log("eventList", eventList);
  //     })
  //   };
  //   getEvents();
  // }, [])

  return (
    <>
      <br />
      <div className="event-card">
        {/* {JSON.stringify(eventList)} */}
      </div>
      {/* {eventList[0].map(event => <div>{event.location}</div>)} */}
    </>
  );
}