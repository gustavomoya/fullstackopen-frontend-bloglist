const LoginForm = (props) => {

    return (
        <form onSubmit={props.handleLogin}>
            <div>
                <label>
                    username
                    <input type="text" value={props.username} name="Username" onChange={props.handleUsernameChange}/>
                </label>
            </div>
            <div>
                <label>
                    Password
                    <input type="password" value={props.password} name="Password"
                           onChange={props.handlePasswordChange}/>
                </label>
            </div>
            <div className="button-wrapper">
                <button type="submit">Login</button>
            </div>
        </form>
    )
}
export default LoginForm