import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

import { AppRouter } from './router/AppRouter';
import { AppTheme } from './themes';


export const EventManagementApp = () => {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <AppTheme>
                <AppRouter />
            </AppTheme>
        </LocalizationProvider>
    )
}
