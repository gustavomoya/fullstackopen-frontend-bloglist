const LoginForm = (props) => {

    return (
        <form onSubmit={props.handleLogin}>
            <div>
                Username
                <input
                    type="text"
                    value={props.username}
                    name="Username"
                    onChange={props.handleUsernameChange}
                />
            </div>
            <div>
                Password
                <input
                    type="password"
                    value={props.password}
                    name="Password"
                    onChange={props.handlePasswordChange}
                />
            </div>
            <button type="submit">Add</button>
        </form>
    )
}
export default LoginForm