import { useNavigate } from 'react-router-dom'
import { Card, CardContent, Button, Typography, Link, CardActions } from '@mui/material'

const Blog = ({ blog, updateBlog, deleteBlog, user }) => {
    const navigate = useNavigate()

    if (!blog) {
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
        <Card sx={{ minWidth: 275, marginTop: '20px' }} className='blog-list-item mt-20'>
            <CardContent>
                <div>
                    <Typography variant="h5" component="p">
                        {blog.title}
                    </Typography>
                    <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>by {blog.author}</Typography>
                </div>
                <Link href={blog.url}> {blog.url}</Link>
                {blog.user &&
                    <Typography sx={{ color: 'text.secondary', mt: 1.5 }}>Added by {blog.user.name}</Typography>
                }
                <CardActions>
                    <Typography sx={{ fontWeight: 'bold', display: 'inline' }} className='label-likes'>{blog.likes} likes</Typography>
                    {user &&
                        <Button variant="outlined" className="btn-add-like" onClick={ handleAddLike }>Like</Button>
                    }
                    {user && blog.user && blog.user.id === user.id &&
                        <Button variant="outlined" color='error' className='delete-blog-btn'
                            onClick={ handleRemove }>Remove</Button>
                    }
                </CardActions>
            </CardContent>
        </Card>
    )
}

export default Blog