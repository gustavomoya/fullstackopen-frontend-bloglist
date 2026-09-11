import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { TextField, Button } from '@mui/material'

const BlogForm = ({ createBlog }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')
    const [likes, setLikes] = useState('')

    const navigate = useNavigate()

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

    const handleAddBlog = async (event) => {
        event.preventDefault()
        await createBlog({
            title: title,
            author: author,
            url: url,
            likes: likes
        })

        navigate('/')

        setTitle('')
        setAuthor('')
        setUrl('')
        setLikes('')
    }

    return (
        <div>
            <h2>Create new</h2>
            <form onSubmit={handleAddBlog} style={{ marginBottom: '20px', marginTop: '20px' }}>
                <div>
                    <TextField required label="Title" variant="standard" value={title} name="title"
                        placeholder='enter the title' onChange={handleTitleChange}/>
                </div>
                <div>
                    <TextField required label="Author" variant="standard" value={author} name="author"
                        placeholder='enter the author' onChange={handleAuthorChange}/>
                </div>
                <div>
                    <TextField required label="Url" variant="standard" value={url} name="url"
                        placeholder='enter the url' onChange={handleUrlChange}/>
                </div>
                <div>
                    <TextField type="number" required label="Likes" variant="standard" value={likes} name="likes"
                        placeholder='enter the number of likes' onChange={handleLikesChange}/>
                </div>
                <Button variant="contained" style={{ marginTop: '10px' }} type="submit">Create</Button>
            </form>
        </div>
    )
}

export default BlogForm