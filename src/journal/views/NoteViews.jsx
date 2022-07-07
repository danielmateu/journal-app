import { SaveOutlined } from '@mui/icons-material'
import { Button, Grid, TextField, Typography } from '@mui/material'
import React from 'react'
import { useEffect } from 'react'
import { useMemo } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {useForm} from '../../hooks/index'
import { setActiveNote, startSaveNote } from '../../store/journal'
import { ImageGalery } from '../components'

export const NoteViews = () => {

    const dispatch = useDispatch()
    const { active:note } = useSelector( state => state.journal)
    const {body,title,date,onInputChange,formState} = useForm(note)

    const dateString = useMemo(() => {
        const newDate = new Date(date);
        return newDate.toUTCString();
    }, [date])

    
    useEffect(() => {
        dispatch(setActiveNote(formState))
    }, [formState])
    
    const onSaveNote = () => {
        dispatch(startSaveNote());
    }

    return (
        <Grid 
        className='animate__animated animate__fadeIn'
        container direction="row" justifyContent='space-between' sx={{mb:1}}>
            <Grid item>
                <Typography fontSize={38} fontWeight="light">{dateString}</Typography>

                
            </Grid>

            <Grid item>
                <Button
                onClick = {onSaveNote}
                color = 'primary'
                sx = {{padding:2}}
                >
                    <SaveOutlined sx={{ fontSize: 30, mr:1 }}/>
                    Guardar
                </Button>


            </Grid>
            <Grid container>
                    <TextField 
                    type="text"
                    variant='filled'
                    fullWidth
                    placeholder='Ingresa el título'
                    label='Título'
                    sx={{border: 'none',mb:1}}
                    name = 'title'
                    value= {title}
                    onChange = {onInputChange}
                    />
            </Grid>
            <Grid container>
                    <TextField 
                    type="text"
                    variant='filled'
                    fullWidth
                    multiline
                    placeholder='¿Qué se ha hecho hoy?'
                    
                    minRows={5}
                    sx={{border: 'none',mb:1}}

                    name = 'body'
                    value= {body}
                    onChange = {onInputChange}
                    
                    />
            </Grid>

            {/* Galeria de imagenes */}
            <ImageGalery/>

        </Grid>
    )
}
