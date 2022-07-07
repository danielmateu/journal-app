import { Divider, Drawer, List, Toolbar, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { useSelector } from "react-redux";
import { SideBarItems } from "./index";



export const SideBar = ({ drawerWidth = 240 }) => {

    const {displayName} = useSelector(state => state.auth);
    const {notes} = useSelector(state => state.journal);

    return (
        <Box component='nav'
            sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}>

            <Drawer
                variant='permanent' //Temporary
                open={true}
                sx={{
                    display:{xs:'block'},
                    '&.MuiDrawer-paper':{boxSizing:'border-box',width:drawerWidth}
                }}
            >
            </Drawer>

            <Toolbar >
                <Typography variant='h6' nowrap='false' component='div'>{displayName}
                </Typography>
            </Toolbar>
            <Divider/>
            

            <List>
                {
                    notes.map(note => (<SideBarItems key={note.id} {...note}/>))
                }
            </List>

        </Box>
    )
}
