import React from 'react';
import ReactDOM from 'react-dom/client';


import { EventManagementApp } from './EventManagementApp.jsx';
import './style.css';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <BrowserRouter>
            <EventManagementApp />
        </BrowserRouter>
    </React.StrictMode>,
)
