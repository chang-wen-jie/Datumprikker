import './App.css';
import Dashboard from './components/dashboard/Dashboard';
import Events from './routes/events';
import Form from './routes/form';
import Login from './routes/login';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Dashboard />}>
          <Route path='events' element={<Events />} />
          <Route path='form' element={<Form />} />
          <Route path='login' element={<Login />} />
          <Route
            path='*'
            element={
              <main
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translateX(-50%) translateY(-50%)',
                }}
              >
                <p>Het is nogal leeg hier...</p>
              </main>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
