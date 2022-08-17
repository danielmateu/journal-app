import { useEffect, useMemo, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { DeleteOutline, SaveOutlined, UploadOutlined } from '@mui/icons-material'
import { Button, Grid, IconButton, TextField, Typography } from '@mui/material'
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';

import { useForm } from '../../hooks/index'
import { ImageGalery } from '../components'
import { setActiveNote, startDeleteNote, startSaveNote, startUploadingFiles } from '../../store/journal'

export const NoteViews = () => {

    const dispatch = useDispatch()
    const { active:note, messageSaved, isSaving } = useSelector(state => state.journal)

    const { body, title, date, onInputChange, formState } = useForm(note)

    const dateString = useMemo(() => {
        const newDate = new Date(date);
        return newDate.toUTCString();
    }, [date]);

    const fileInputRef = useRef()


    useEffect(() => {
        dispatch(setActiveNote(formState))
    }, [formState])

    useEffect(() => {
        if (messageSaved.length > 0) {
            Swal.fire('Nota actualizada', messageSaved, 'success')
        }
    }, [messageSaved]);


    const onSaveNote = () => {
        dispatch(startSaveNote());
    }

    const onFileInputChange = ({ target }) => {
        if (target.files === 0) return;
        dispatch( startUploadingFiles(target.files))
    }

    const onDelete = () => {
        // console.log('Borrando...')
        dispatch(startDeleteNote());
    }

    return (
        <Grid
            className='animate__animated animate__fadeIn'
            container direction="row" justifyContent='space-between' sx={{ mb: 1 }}>

            <Grid container direction="row" alignItems='center' justifyContent='space-between' sx={{ mb: 1 }}>
                <Grid item>
                    <Typography fontSize={28} fontWeight="light">{dateString}</Typography>
                </Grid>

                <Grid item>
                    <input 
                        type="file"
                        ref={fileInputRef}
                        multiple
                        onChange={onFileInputChange}
                        style={{display:'none'}}
                    />
                    <IconButton 
                    color='primary'
                    disabled = {isSaving}
                    onClick= { () => fileInputRef.current.click()}>
                        <UploadOutlined/>
                    </IconButton>

                    <Button
                        disabled={isSaving}
                        onClick={onSaveNote}
                        color='primary'
                        sx={{ padding: 2 }}
                    >
                        <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
                        Guardar
                    </Button>


                </Grid>
            </Grid>

            <Grid container>
                <TextField
                    type="text"
                    variant='filled'
                    fullWidth
                    placeholder='Ingresa el título'
                    label='Título'
                    sx={{ border: 'none', mb: 1 }}
                    name='title'
                    value={title}
                    onChange={onInputChange}
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
                    sx={{ border: 'none', mb: 1 }}

                    name='body'
                    value={body}
                    onChange={onInputChange}

                />
            </Grid>

            <Grid container justifyContent = 'end'>
                <Button onClick={onDelete}
                sx={{mt:2}}
                color='error'
                >
                <DeleteOutline/>
                Borrar
                </Button>
            </Grid>

            {/* Galeria de imagenes */}
            <ImageGalery images = {note.imageURL}/>

        </Grid>
    )
}
