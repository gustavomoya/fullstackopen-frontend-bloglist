import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login.js'
import LoginForm from "./components/LoginForm.jsx";
import BlogForm from "./components/BlogForm.jsx";
import Notification from "./components/Notification.jsx";

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [likes, setLikes] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const showMessage = (message, type = 'success') => {
    if (type === 'success') {
      setSuccessMessage(message)
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
    } else {
      setErrorMessage(message)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleUsernameChange = (event) => {
    setUsername(event.target.value)
  }

  const handlePasswordChange = ({target}) => {
    setPassword(target.value)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
          'loggedUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)

      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      showMessage('Wrong username or password', 'error')
      setTimeout(() => {
      }, 5000)
    }
  }

  const handleLogout = (event) => {
    window.localStorage.clear()
    setUser(null)
    blogService.setToken(user.token)
  }

  const loginForm = () => (
      <>
        <h2>Log in to application</h2>

        <Notification  message={errorMessage} isSuccess={false} />
        <Notification  message={successMessage} isSuccess={true}/>

        <LoginForm handleLogin={handleLogin} username={username}
                   handleUsernameChange={handleUsernameChange}
                   password={password} handlePasswordChange={handlePasswordChange}/>
      </>
  )

  const handleTitleChange = ({target}) => {
    setTitle(target.value)
  }
  const handleAuthorChange = ({target}) => {
    setAuthor(target.value)
  }
  const handleUrlChange = ({target}) => {
    setUrl(target.value)
  }
  const handleLikesChange = ({target}) => {
    setLikes(target.value)
  }

  const handleAddBlog = async (event) => {
    event.preventDefault()

    const data = {
      title: title,
      author: author,
      url: url,
      likes: likes
    };

    try {
      const blog = await blogService.create(data);

      setBlogs(blogs.concat(blog))
      setTitle('')
      setAuthor('')
      setUrl('')
      setLikes('')

      showMessage(`A new blog ${blog.title} by ${blog.author} was added!`)

    } catch (e) {
      console.log('action error', e.response.data.error)
      showMessage('The blog could not be added. Please check the data and try again.', 'error')
    }
  }

  return (
      <div>
        {
          user === null ? loginForm() :

              <div>
                <h2>blogs</h2>
                <Notification  message={errorMessage} isSuccess={false} />
                <Notification  message={successMessage} isSuccess={true}/>

                <div>
                  <p>{user.name} logged-in <button onClick={handleLogout}> logout</button></p>
                </div>

                <h3>Create new </h3>

                <BlogForm handleAddBlog={handleAddBlog}
                          title={title} handleTitleChange={handleTitleChange}
                          author={author} handleAuthorChange={handleAuthorChange}
                          url={url} handleUrlChange={handleUrlChange}
                          likes={likes} handleLikesChange={handleLikesChange}/>

                {blogs.map(blog =>
                    <Blog key={blog.id} blog={blog}/>
                )}
              </div>
        }
      </div>
  )
}

export default App