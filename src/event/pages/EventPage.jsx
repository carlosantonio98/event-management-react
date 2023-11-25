import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { Button, CircularProgress, IconButton, Stack, TableHead, Typography } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Delete, Edit } from '@mui/icons-material';

import axiosClient from '../../axios-client';

import { EventLayout } from '../layout/EventLayout';

export const EventPage = () => {
    const [ events, setEvents ] = useState([]);
    const [ isLoading, setIsLoading ] = useState(false);

    const getEvents = () => {
        setIsLoading(true);

        axiosClient.get("/events")
            .then(({ data }) => {
                setEvents( data );
                setIsLoading(false);
            })
            .catch((error) => {
                if (axiosClient.isCancel(error)) {
                    console.log('Solicitud cancelada:', error.message);
                } else {
                    console.error('Error fetching data:', error);
                }

                setIsLoading(false);
            });
    }

    useEffect(() => {
        getEvents();

        return(() => {
            getEvents();
        })
    }, []);

    const onDelete = (eventId) => {
        if(!window.confirm('Are you sure you want to delete this user?')) {
            return 
        }

        axiosClient.delete(`/events/${eventId}`)
            .then(() => {
                getEvents();
            });
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
                        {
                            isLoading && 
                            <CircularProgress />
                        }

                        {
                            !isLoading && events.map((row) => (
                                <TableRow
                                    key={row.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>

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
                            ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </EventLayout>
    )
}


