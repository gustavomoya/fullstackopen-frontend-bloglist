import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

const Blog = ({ blog, updateBlog, deleteBlog, user }) => {
  const navigate = useNavigate()

  if(!blog) {
    return null
  }

  const handleAddLike = async () => {
    await updateBlog(blog)
  }

  const handleRemove = async () => {
    const remove = window.confirm(`Remove blog ${blog.title} by ${blog.author}`)
    if (remove) {
      await deleteBlog(blog.id)
      navigate('/')
    }
  }


  return (
      <div className='blog-list-item'>
        <h2>{blog.author}: {blog.title} </h2>
        <p>{blog.url}</p>
        <p>
          <strong>Likes:</strong> {blog.likes}
            {user &&
                <button className="btn-add-like" onClick={handleAddLike}>Like</button>
            }
        </p>
        {blog.user &&
          <p className='blog-owner'>Added by {blog.user.name}</p>
        }
        {user && blog.user && blog.user.id === user.id &&
          <button className='delete-blog-btn' onClick={handleRemove}>Remove</button>
        }
      </div>
  )
}

export default Blog