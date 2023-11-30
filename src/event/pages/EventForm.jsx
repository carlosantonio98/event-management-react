import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Button, FormControl, Grid, InputAdornment, InputLabel, MenuItem, Select, TextField } from '@mui/material';

import axios from 'axios';
import axiosClient from '../../axios-client';

import { EventLayout } from '../layout/EventLayout';
import { useForm } from '../../hooks/useForm';

const formValidation = {
    name: [ (value) => value.length >= 5 , "Debe de contener al menos 5 caracteres" ],
    description: [ (value) => value.length >= 30 , "Debe de contener al menos 30 caracteres" ],
    location: [ (value) => value.length >= 5 , "Debe de contener al menos 5 caracteres" ],
    price: [ (value) => value > 0 , "Debe de contener un precio mayor a 0" ],
    capacity: [ (value) => value >= 4 , "Debe de contener al menos una capacidad de 4 persona" ],
    requirements: [ (value) => value.length >= 5 , "Debe de contener al menos 5 caracteres" ],
}

export const EventForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [ formSubmitted, setFormSubmitted ] = useState(false);
    const [ categories, setCategories ] = useState([]);

    useEffect(() => {
        const getCategories = () => {
            const source = axios.CancelToken.source(); // Crear la fuente del token de cancelación

            axiosClient.get('/categories', {
                cancelToken: source.token
            })
            .then(({ data }) => {
                setCategories(data);
            })
            .catch((error) => {
                if (axios.isCancel(error)) {
                    console.log('Solicitud cancelada:', error.message);
                } else {
                    console.error('Error fetching data:', error);
                }
            });

            return () => {
                source.cancel('Request canceled by cleanup'); // Cancelar la solicitud al desmontar el componente
            }
        }

        const cleanupFunction = getCategories();

        return cleanupFunction;
    }, []);

    const [ formData, setFormData ] = useState({
        id: null,
        name: "",
        description: "",
        startDate: "",
        endDate: "",
        location: "",
        categoryFk: "",
        price: "",
        capacity: "",
        requirements: ""
    });

    useEffect(() => {
        const getEvent = () => {
            const source = axios.CancelToken.source(); // Crear la fuente del token de cancelación

            axiosClient.get(`/events/${id}`, {
                cancelToken: source.token
            })
            .then(({ data }) => {
                setFormData(data);
            });

            return () => {
                source.cancel('Request canceled by cleanup'); // Cancelar la solicitud al desmontar el componente
            }
        }

        let cleanupFunction;

        if (id) {
            cleanupFunction = getEvent();
        }

        return cleanupFunction;
    }, [id]);

    const { 
        name, nameValid,
        description, descriptionValid,
        startDate,
        endDate, 
        location, locationValid,
        categoryFk,
        price, priceValid,
        capacity, capacityValid,
        requirements, requirementsValid,
        onInputChange,
        formState, isFormValid
    } = useForm( formData, formValidation );

    const onSave = ( event ) => {
        event.preventDefault();
        setFormSubmitted(true);

        if ( !isFormValid ) return;

        if ( id ) 
            updateEvent();
        else 
            createEvent();
    }

    const createEvent = () => {
        axiosClient.post('/events', formState)
            .then((data) => {
                if (data.status == "ok") {
                    console.log("Event save");
                } else {
                    console.log("Status event: " + data.status);
                }

                navigate('/events', {
                    replace: true
                });

                setFormSubmitted(false);
            });
    }

    const updateEvent = () => {
        axiosClient.put(`/events/${id}`, formState)
            .then((data) => {
                if (data.status == "ok") {
                    console.log("Event save");
                } else {
                    console.log("Status event: " + data.status);
                }

                navigate('/events', {
                    replace: true
                });

                setFormSubmitted(false);
            });
    }

    return (
        <EventLayout>

            <form autoComplete="off" onSubmit={ onSave } method="POST">
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
                            fullWidth
                            name="name"
                            value={ name }
                            onChange={ onInputChange }
                            error={ !!nameValid && formSubmitted }
                            helperText={ !!nameValid && formSubmitted ? nameValid : '' }/>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField 
                            label="Descripción"
                            required
                            variant="outlined"
                            color="secondary"
                            type="text"
                            fullWidth
                            sx={{mb: 3}}
                            name="description"
                            value={ description }
                            onChange={ onInputChange }
                            error={ !!descriptionValid && formSubmitted }
                            helperText={ !!descriptionValid && formSubmitted ? descriptionValid : '' }/>
                    </Grid>
                    <Grid item xs={12} lg={6}>
                        <TextField 
                            label="Fecha y Hora de Inicio"
                            variant="outlined"
                            color="secondary"
                            type="datetime-local"
                            InputLabelProps={{ shrink: true }}
                            fullWidth
                            sx={{mb: 3}}
                            name="startDate"
                            value={ startDate ?? "" }
                            onChange={ onInputChange }/>
                    </Grid >
                    <Grid item xs={12} lg={6}>
                    <TextField 
                            label="Fecha y Hora de Fin"
                            variant="outlined"
                            color="secondary"
                            type="datetime-local"
                            InputLabelProps={{ shrink: true }}
                            fullWidth
                            sx={{mb: 3}}
                            name="endDate"
                            value={ endDate ?? "" }
                            onChange={ onInputChange } />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField 
                            label="Ubicación"
                            required
                            variant="outlined"
                            color="secondary"
                            type="text"
                            fullWidth
                            sx={{mb: 3}}
                            name="location"
                            value={ location }
                            onChange={ onInputChange }
                            error={ !!locationValid && formSubmitted }
                            helperText={ !!locationValid && formSubmitted ? locationValid : '' }/>
                    </Grid>
                    <Grid item xs={12} lg={4}>
                        <FormControl fullWidth>
                            <InputLabel id="category-label">Categoría del Evento</InputLabel>
                            <Select
                                labelId="category-label"
                                id="demo-simple-select"
                                color="secondary"
                                label="Categoría del Evento"
                                sx={{mb: 3}}
                                name="categoryFk"
                                value={ categoryFk }
                                onChange={ onInputChange }>
                                {
                                    categories.map((category) => (
                                        <MenuItem key={category.id} value={category.id}>{category.name}</MenuItem>
                                    ))
                                }
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
                            }}
                            name="price"
                            value={ price }
                            onChange={ onInputChange }
                            error={ !!priceValid && formSubmitted }
                            helperText={ !!priceValid && formSubmitted ? priceValid : '' }/>
                    </Grid>
                    <Grid item xs={12} lg={4}>
                        <TextField 
                            label="Capacidad Máxima"
                            required
                            variant="outlined"
                            color="secondary"
                            type="number"
                            fullWidth
                            sx={{mb: 3}}
                            name="capacity"
                            value={ capacity }
                            onChange={ onInputChange }
                            error={ !!capacityValid && formSubmitted }
                            helperText={ !!capacityValid && formSubmitted ? capacityValid : '' }/>
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
                            sx={{mb: 3}}
                            name="requirements"
                            value={ requirements }
                            onChange={ onInputChange }
                            error={ !!requirementsValid && formSubmitted }
                            helperText={ !!requirementsValid && formSubmitted ? requirementsValid : '' }/>
                    </Grid>
                </Grid>

                <Button 
                    variant="contained" 
                    color="primary" 
                    type="submit">Guardar</Button>             
            </form>

        </EventLayout>
    )
}