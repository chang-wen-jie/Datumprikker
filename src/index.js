import App from "./App";
import React from "react";
import { render } from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Form from "./routes/form";
import Events from "./routes/events";
import Login from "./routes/login";

const rootElement = document.getElementById("root");
render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="form" element={<Form />} />
        <Route path="events" element={<Events />} />
        <Route path="login" element={<Login />} />
        <Route
          path="*"
          element={
            <main>
              <p>Het is nogal leeg hier...</p>
            </main>
          }
        />
      </Route>
    </Routes>
  </BrowserRouter>,
  rootElement
);
