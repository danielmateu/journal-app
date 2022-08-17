
import {useDispatch, useSelector} from 'react-redux';
import { IconButton } from "@mui/material";
import { AddOutlined } from "@mui/icons-material";
// import { Typography } from '@mui/material'
// import {MailOutline} from '@mui/icons-material'
import { JournalLayout } from "../layout/JournalLayout";
import { NoteViews, NothingSelectedView } from '../views';
import { startNewNote } from "../../store/journal/thunks";

export const JournalPage = () => {

  const dispatch = useDispatch()

  const {isSaving, active} = useSelector(state => state.journal);

  
  const onClickNewNote = () => {
    dispatch(startNewNote());
  }

  return (
    <JournalLayout>
      
      {
        (!!active)
        ?
        <NoteViews/>
        :
        <NothingSelectedView />
        
      }

      <IconButton
      disabled = {isSaving}
      onClick={onClickNewNote}
        size='large'
        sx={{
          color: 'white',
          backgroundColor: 'error.main',
          ':hover': { backgroundColor: 'error.main', opacity: 0.6, transition: '.4s ease-in'  },
          position: 'fixed',
          right: 50,
          bottom: 50
        }}>
        <AddOutlined sx={{ fontSize: 30 }} />
      </IconButton>

    </JournalLayout>

  )
}
