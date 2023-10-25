import { Route, Routes } from 'react-router-dom';
import { EventRoutes } from '../event/routes/EventRoutes';

export const AppRouter = () => {
    return (
        <Routes>

            <Route path="/*" element={ <EventRoutes /> } />

        </Routes>
    )
}
