import { Routes, Route } from 'react-router-dom';
import { EventPage, EventForm } from '../pages';

export const EventRoutes = () => {
    return (
        <Routes>

            <Route path="/events" element={ <EventPage /> } />
            <Route path="/events/new" element={ <EventForm key="create" /> } />
            <Route path="/events/:id" element={ <EventForm key="update" /> } />

        </Routes>
    )
}
