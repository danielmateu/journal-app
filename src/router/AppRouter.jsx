import {Navigate, Route, Routes} from 'react-router-dom'

import { AuthRoutes } from '../auth/routes/AuthRoutes'
import { useCheckAuth } from '../hooks'

import { JornalRoutes } from '../journal/routes/JornalRoutes'
import {CheckingAuth} from '../ui'

export const AppRouter = () => {

  const status = useCheckAuth()

  if(status === 'checking') return <CheckingAuth/>

  return (
    <Routes>

      {
        (status === 'authenticated') 
        ? 
        <Route path='/*' element = {<JornalRoutes/>} />
        :
        <Route path='/auth/*' element = {<AuthRoutes/>}/>
      }

      <Route path='/*' element = {<Navigate to='/auth/login' />}/>


      {/* Login y Registro */}
      {/* <Route path='/auth/*' element = {<AuthRoutes/>}/> */}

      {/* JournalApp */}
      {/* <Route path='/*' element = {<JornalRoutes/>} /> */}

    </Routes>
  )
}
