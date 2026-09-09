import { useState, useEffect, useRef } from 'react'
import {
  Routes, Route, useNavigate, useMatch
} from 'react-router-dom'
import Blog from './components/Blog'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login.js'
import LoginForm from './components/LoginForm.jsx'
import BlogForm from './components/BlogForm.jsx'
import Notification from './components/Notification.jsx'
import Menu from "./components/Menu.jsx";
import BlogList from "./components/BlogList.jsx";

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])

  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

  const blogFormRef = useRef()

  const navigate = useNavigate()

  useEffect(() => {
    blogService.getAll().then(blogs => {
      blogs.sort((a, b) => {
        if (a.likes < b.likes) {
          return 1
        }
        if (a.likes > b.likes) {
          return -1
        }
        return 0
      })

      setBlogs(blogs)
    })
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

  const handlePasswordChange = ({ target }) => {
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
      navigate('/')
    } catch (e) {
      console.log('action error', e)
      showMessage('Wrong username or password', 'error')
      setTimeout(() => {
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.clear()
    setUser(null)
    blogService.setToken(user.token)
    navigate('/')
  }
  const loginForm = () =>
    <LoginForm handleLogin={handleLogin} username={username}
               handleUsernameChange={handleUsernameChange}
               password={password} handlePasswordChange={handlePasswordChange} />

  const handleAddBlog = async (blogObject) => {
    try {
      const blog = await blogService.create(blogObject)

      // blogFormRef.current.toggleVisibility()

      const blogList = blogs.concat(blog)
      blogList.sort((a, b) => {
        if (a.likes < b.likes) {
          return 1
        }
        if (a.likes > b.likes) {
          return -1
        }
        return 0
      })

      setBlogs(blogList)

      showMessage(`A new blog ${blog.title} by ${blog.author} was added!`)
    } catch (e) {
      console.log(
          'action error',
          e.response?.data?.error ?? e
      )
      showMessage('The blog could not be added. Please check the data and try again.', 'error')
    }
  }

  const handleUpdatedBlog = async (blogObject) => {
    try {

      const updatedBlog = {
        ...blogObject,
        likes: blogObject.likes + 1,
        user: blogObject.user ? blogObject.user.id : ''
      }

      const blog = await blogService.update(updatedBlog)

      setBlogs(blogs.map(b => (b.id !== blog.id ? b : blog)))

    } catch (e) {
      console.log(e)
      console.log('action error', e.response.data.error)
    }
  }

  const handleDeleteBlog = async (id) => {
    try {
      const blog = blogs.find(b => b.id === id)

      await blogService.remove(id)

      setBlogs(blogs.filter(b => b.id !== id))

      showMessage(`Blog ${blog.title} was already removed from server`)
    } catch (e) {
      console.log('action error', e.response.data.error)
      showMessage('The blog could not be removed.', 'error')
    }
  }

  const match = useMatch('/blogs/:id')

  const blog = match
      ? blogs.find(blog => blog.id === match.params.id)
      : null

  return (
      <div>
        <div>
          <Menu user={user} handleLogout={handleLogout}/>
          <Notification message={errorMessage} isSuccess={false}/>
          <Notification message={successMessage} isSuccess={true}/>
        </div>
        <Routes>
          <Route path="/blogs/:id" element={
            <Blog blog={blog} updateBlog={handleUpdatedBlog} deleteBlog={handleDeleteBlog} user={user}/>
          } />

          <Route path="/" element={
            <BlogList blogs={blogs} />
          } />

          <Route
              path="/login"
              element={
                loginForm()
              }
          />

          <Route path="/create" element={
            <BlogForm createBlog={handleAddBlog}/>
          } />

        </Routes>
      </div>
  )
}

export default App