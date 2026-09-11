import { TextField, Button } from '@mui/material'

const LoginForm = (props) => {

    return (
        <div>
            <h2>Log in to application</h2>
            <form onSubmit={props.handleLogin}>
                <div>
                    <TextField label="username" variant="standard" value={props.username} name="Username"
                        onChange={props.handleUsernameChange}/>
                </div>

                <div>
                    <TextField label="password" variant="standard" value={props.password} name="Password"
                        onChange={props.handlePasswordChange}/>
                </div>

                <div className="button-wrapper">
                    <Button variant="contained" type="submit">Login</Button>
                </div>
            </form>
        </div>
    )
}
export default LoginForm