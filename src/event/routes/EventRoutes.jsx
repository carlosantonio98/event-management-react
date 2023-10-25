import { Routes, Route } from 'react-router-dom';
import { EventPage } from '../pages';

export const EventRoutes = () => {
    return (
        <Routes>

            <Route path="/events" element={ <EventPage /> } />

        </Routes>
    )
}
