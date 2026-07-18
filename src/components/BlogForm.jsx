const BlogForm = (props ) => (
    <form onSubmit={props.handleAddBlog} style={{marginBottom: '20px'}}>
        <div>
            Title
            <input
                type="text"
                value={props.title}
                name="title"
                onChange={props.handleTitleChange}
            />
        </div>
        <div>
            Author
            <input
                type="text"
                value={props.author}
                name="author"
                onChange={props.handleAuthorChange}
            />
        </div>
        <div>
            Url
            <input
                type="text"
                value={props.url}
                name="url"
                onChange={props.handleUrlChange}
            />
        </div>
        <div>
            Likes
            <input
                type="number"
                value={props.likes}
                name="likes"
                onChange={props.handleLikesChange}
            />
        </div>
        <button type="submit">Create</button>
    </form>
)

export default BlogForm