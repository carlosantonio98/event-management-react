import React from 'react';
import ReactDOM from 'react-dom/client';


import { EventManagementApp } from './EventManagementApp.jsx';
import './style.css';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <EventManagementApp />
    </React.StrictMode>,
)
