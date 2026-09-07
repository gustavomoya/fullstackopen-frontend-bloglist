import { Link } from 'react-router-dom'
const Menu = ({user, handleLogout}) => {
    const padding = {
        padding: 5
    }

    return (
        <div>
            <Link style={padding} to="/">blogs</Link>{' '}

            {user &&
              <Link style={padding} to="/create">new blog</Link>
            }

            {user === null ? (
                <Link style={padding} to="/login">login</Link>
            ) : (
                <button onClick={handleLogout}>logout</button>
            )}
        </div>
    )
}

export default Menu