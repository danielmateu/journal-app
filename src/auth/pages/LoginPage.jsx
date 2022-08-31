import { useDispatch, useSelector } from 'react-redux'
import { Link as RouterLink } from 'react-router-dom'
import { Grid, Typography, TextField, Button, Link, Alert } from '@mui/material'
import { Google } from '@mui/icons-material'
import { AuthLayout } from '../layout/AuthLayout'
import { useForm } from "../../hooks";
import { startGoogleSignIn, startLoadingWithEmailPassword,  } from '../../store/auth'
import { useMemo } from 'react'

const formData = {
  email: '',
  password: ''
}

export const LoginPage = () => {

  const { status, errorMessage } = useSelector(state => state.auth);

  const isAuthenticating = useMemo(() => status === 'checking', [status])

  const loading = useMemo(() => status === 'loading', [status])

  const dispatch = useDispatch()

  const { email, password, onInputChange } = useForm(formData)

  const onSubmit = (event) => {
    event.preventDefault();
    // console.log({email,password});
    //! No es la acción a Despachar!!!
    dispatch(startLoadingWithEmailPassword({ email, password }));
  }

  const onGoogleSignIn = (event) => {
    // console.log('onGoogleSignIn!');
    event.preventDefault();
    dispatch(startGoogleSignIn());
  }



  return (

    <AuthLayout title="Login">

      <form onSubmit={onSubmit}>
        <Grid
          container
        >
          <Grid
            item xs={12} sx={{ mt: 2 }}>
            <TextField
              label='Correo'
              type='email'
              placeholder='correo@correo.com'
              fullWidth
              name='email'
              value={email}
              onChange={onInputChange}
            >
            </TextField>
          </Grid>

          <Grid item xs={12} sx={{ mt: 2, mb:2 }}>
            <TextField
              label='Contraseña'
              type='password'
              placeholder='Contraseña'
              fullWidth
              name='password'
              value={password}
              onChange={onInputChange}
            >
            </TextField>
          </Grid>

          <Grid container>
            <Grid
              item
              xs={12}
              // sx={{mt:1,mb:1}}
              display={!!errorMessage ? '' : 'none'}
            >
              <Alert severity='error'>{errorMessage}</Alert>
            </Grid>
          </Grid>


          <Grid container spacing={2} sx={{}}>
            <Grid item xs={12} sm={6} sx={{ mb: 1 }}>
              <Button
                disabled={isAuthenticating}
                type="submit"
                variant='contained'
                fullWidth
                onClick={onSubmit}>
                Login
              </Button>
            </Grid>

            <Grid item xs={12} sm={6} sx={{ mb: 1 }}>
              <Button
                disabled={isAuthenticating}
                variant='contained'
                fullWidth
                onClick={onGoogleSignIn}
              >
                <Google />
                <Typography sx={{ ml: 1 }}>Google</Typography>
              </Button>
            </Grid>

            <Grid container direction='row' justifyContent='end'>
              <Link
                component={RouterLink}
                color='inherit'
                to='/auth/register'
                // sx={{ mb: 1 }}
                >
                Crear una cuenta
              </Link>
            </Grid>

          </Grid>

        </Grid>

      </form>
    </AuthLayout>

  )
}
