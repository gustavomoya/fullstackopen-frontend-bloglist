import { useState } from 'react'

const Blog = ({ blog, updateBlog, deleteBlog, user }) => {

  const [showDetails, setShowDetails] = useState(false)

  const showWhenVisible = { display: showDetails ? '' : 'none' }

  const handleShowDetails = () => {
    setShowDetails(!showDetails)
  }

  const handleAddLike = async () => {
    await updateBlog(blog)
  }

  const handleRemove = async () => {
    const remove = window.confirm(`Remove blog ${blog.title} by ${blog.author}`)
    if (remove) {
      await deleteBlog(blog.id)
    }
  }


  return (
      <div className='blog-list-item'>
        <p>
          <b>{blog.title} {blog.author}</b>
          <button className="btn-handle-details" style={{marginLeft: '5px'}} onClick={handleShowDetails}>{showDetails ? 'Hide' : 'View'}</button>
        </p>
        <div style={showWhenVisible}>
          <p><b>URL:</b> {blog.url}</p>
          <p><b>Likes:</b> {blog.likes}
            <button className="btn-add-like" onClick={handleAddLike}>Like</button>
          </p>
          {blog.user &&
              <p className='blog-owner'>{blog.user.name}</p>
          }
          {blog.user && blog.user.id === user.id &&
              <button className='delete-blog-btn' onClick={handleRemove}>Remove</button>
          }
        </div>
      </div>
  )
}

export default Blog