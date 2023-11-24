import { Button, FormControl, Grid, InputAdornment, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { EventLayout } from '../layout/EventLayout';
import { DateTimePicker } from '@mui/x-date-pickers';

export const EventForm = () => {

    return (
        <EventLayout>

            <form autoComplete="off">
                <h2>Crear evento</h2>

                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField 
                            label="Nombre del evento"
                            required
                            variant="outlined"
                            color="secondary"
                            type="text"
                            sx={{mb: 3}}
                            fullWidth/>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField 
                            label="Descripción"
                            required
                            variant="outlined"
                            color="secondary"
                            type="text"
                            fullWidth
                            sx={{mb: 3}}/>
                    </Grid>
                    <Grid item xs={12} lg={6}>
                        <DateTimePicker
                            label="Fecha y Hora de Inicio"
                            sx={{mb: 3}}
                            slotProps={{ textField: { fullWidth: true } }}/>
                    </Grid >
                    <Grid item xs={12} lg={6}>
                        <DateTimePicker
                            label="Fecha y Hora de Finalización"
                            sx={{mb: 3}}
                            slotProps={{ textField: { fullWidth: true } }}/>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField 
                            label="Ubicación"
                            required
                            variant="outlined"
                            color="secondary"
                            type="text"
                            fullWidth
                            sx={{mb: 3}}/>
                    </Grid>
                    <Grid item xs={12} lg={4}>
                        <FormControl fullWidth>
                            <InputLabel id="category-label">Categoría del Evento</InputLabel>
                            <Select
                                labelId="category-label"
                                id="demo-simple-select"
                                color="secondary"
                                label="Categoría del Evento"
                                sx={{mb: 3}}>
                                <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} lg={4}>
                        <TextField 
                            label="Precio de Entrada"
                            required
                            variant="outlined"
                            color="secondary"
                            type="number"
                            fullWidth
                            sx={{mb: 3}}
                            InputProps={{
                                startAdornment: <InputAdornment position="start">$</InputAdornment>,
                            }}/>
                    </Grid>
                    <Grid item xs={12} lg={4}>
                        <TextField 
                            label="Capacidad Máxima"
                            required
                            variant="outlined"
                            color="secondary"
                            type="number"
                            fullWidth
                            sx={{mb: 3}}/>

                    </Grid>
                    <Grid item xs={12}>
                        <TextField 
                            label="Imagen del Evento"
                            required
                            variant="outlined"
                            color="secondary"
                            type="file"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            fullWidth
                            sx={{mb: 3}}/>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField 
                            label="Requisitos Especiales"
                            required
                            variant="outlined"
                            color="secondary"
                            type="text"
                            fullWidth
                            sx={{mb: 3}}/>
                    </Grid>
                </Grid>

                <Button variant="contained" color="primary" type="submit">Crear</Button>             
            </form>

        </EventLayout>
    )
}
