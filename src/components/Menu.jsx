import { Link } from 'react-router-dom'
import { AppBar, Toolbar, Button, Typography } from '@mui/material'

const Menu = ({ user, handleLogout }) => {
    const style = { '&:hover':{ bgcolor: 'rgba(255,255,255,0.3)' } }

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Blog App
                </Typography>

                <Button color="inherit" component={Link} to="/" sx={style}>
                    blogs
                </Button>
                {user &&
                    <Button color="inherit" component={Link} to="/create" sx={style}>
                        new blog
                    </Button>
                }
                {user === null ? (
                    <Button color="inherit" component={Link} to="/login" sx={style}>
                        login
                    </Button>
                ) : (
                    <Button color="inherit" sx={style} onClick={handleLogout}>
                        logout
                    </Button>
                )}
            </Toolbar>
        </AppBar>
    )
}

export default Menu