import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [likes, setLikes] = useState('')

  const handleTitleChange = ({ target }) => {
    setTitle(target.value)
  }
  const handleAuthorChange = ({ target }) => {
    setAuthor(target.value)
  }
  const handleUrlChange = ({ target }) => {
    setUrl(target.value)
  }
  const handleLikesChange = ({ target }) => {
    setLikes(target.value)
  }

  const handleAddBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: title,
      author: author,
      url: url,
      likes: likes
    })

    setTitle('')
    setAuthor('')
    setUrl('')
    setLikes('')
  }

  return (<form onSubmit={ handleAddBlog } style={{ marginBottom: '20px' }}>
    <div>
      Title
      <input type="text" value={ title } name="title" placeholder='enter the title' onChange={handleTitleChange}/>
    </div>
    <div>
      Author
      <input type="text" value={ author } name="author" placeholder='enter the author' onChange={handleAuthorChange}/>
    </div>
    <div>
      Url
      <input type="text" value={ url } name="url" placeholder='enter the url' onChange={handleUrlChange}/>
    </div>
    <div>
      Likes
      <input type="number" value={likes} name="likes" placeholder='enter the number of likes' onChange={handleLikesChange}/>
    </div>
    <button type="submit">Create</button>
  </form>)
}

export default BlogForm