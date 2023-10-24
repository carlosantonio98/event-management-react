import { createTheme } from '@mui/material';
import { red } from '@mui/material/colors';

export const purpleTheme = createTheme({
    palette: {
        primary: {
            main: '#5587ec'
        },
        secondary: {
            main: '#3160df'
        },
        error: {
            main: red.A400
        }
    }
})