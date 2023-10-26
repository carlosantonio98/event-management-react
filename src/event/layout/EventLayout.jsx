import { Box, Toolbar } from '@mui/material';
import { NavBar } from '../components';


export const EventLayout = ({ children }) => {
    return (
        <Box>

            <NavBar />

            <Box
                component='main'
                sx={{ flexGrow: 1, p: 3 }}
            >

                { children }

            </Box>
        </Box>
    )
}
