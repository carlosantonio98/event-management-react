import { Button, IconButton, Stack, TableHead, Typography } from '@mui/material';
import { EventLayout } from '../layout/EventLayout';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Delete, Edit } from '@mui/icons-material';

import { Link } from 'react-router-dom';
  
const rows = [
    {
        "id": 1,
        "name": "jose",
        "description": "jose test",
        "startDate": null,
        "endDate": null,
        "categoryFk": 1
    },
    {
        "id": 2,
        "name": "jose",
        "description": "jose test",
        "startDate": null,
        "endDate": null,
        "categoryFk": 1
    },
    {
        "id": 3,
        "name": "jose",
        "description": "jose test",
        "startDate": null,
        "endDate": null,
        "categoryFk": 1
    },
    {
        "id": 4,
        "name": "jose test 8",
        "description": "jose test 28",
        "startDate": null,
        "endDate": null,
        "categoryFk": 1
    },
    {
        "id": 5,
        "name": "jose test 8",
        "description": "jose test 28",
        "startDate": null,
        "endDate": null,
        "categoryFk": 1
    },
    {
        "id": 6,
        "name": "jose test 82",
        "description": "jose test 28",
        "startDate": null,
        "endDate": null,
        "categoryFk": 1
    }
];

export const EventPage = () => {

    const onDelete = (eventId) => {
        if(!window.confirm('Are you sure you want to delete this user?')) {
            return 
        }

        // TODO: Save event
        console.log(`Event ${ eventId } deleted`);
    }

    return (
        <EventLayout>
            <Stack spacing={{ xs: 1, sm: 2 }} mb={4} direction="row" justifyContent="space-between" alignItems="center" useFlexGap flexWrap="wrap">
                <Typography variant="h6" component="h2">
                    Eventos
                </Typography>

                <Button component={Link} to="/events/new" variant="contained">Nuevo</Button>
            </Stack>

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell>Nombre</TableCell>
                        <TableCell align="right">Descripción</TableCell>
                        <TableCell align="right">Fecha inicio</TableCell>
                        <TableCell align="right">Fecha fin</TableCell>
                        <TableCell align="right">Categoría</TableCell>
                        <TableCell align="right"></TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow
                                key={row.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">{row.name}</TableCell>
                                <TableCell align="right">{row.description}</TableCell>
                                <TableCell align="right">{row.startDate ?? "Sin asignar"}</TableCell>
                                <TableCell align="right">{row.endDate ?? "Sin asignar"}</TableCell>
                                <TableCell align="right">{row.categoryFk}</TableCell>
                                <TableCell align="right">
                                    <IconButton component={Link} to={"/events/" + row.id} ><Edit/></IconButton>
                                    <IconButton onClick={ () => onDelete(row.id) }><Delete/></IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </EventLayout>
    )
}


