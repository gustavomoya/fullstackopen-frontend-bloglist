import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm.jsx'

test('check form action', async () => {

  const user = userEvent.setup()

  const handleAddBlog = vi.fn()

  render(<BlogForm  createBlog={handleAddBlog} />)

  const titleInput = screen.getByPlaceholderText('enter the title')
  const authorInput = screen.getByPlaceholderText('enter the author')
  const urlInput = screen.getByPlaceholderText('enter the url')
  const likesInput = screen.getByPlaceholderText('enter the number of likes')

  const createButton = screen.getByText('Create')

  await user.type(titleInput, 'Component testing is done with react-testing-library')
  await user.type(authorInput, 'John Doe')
  await user.type(urlInput, 'https://example.com/blog')
  await user.type(likesInput, '10')

  await user.click(createButton)

  expect(handleAddBlog.mock.calls).toHaveLength(1)

  expect(handleAddBlog.mock.calls[0][0].title).toBe('Component testing is done with react-testing-library')
  expect(handleAddBlog.mock.calls[0][0].author).toBe('John Doe')
  expect(handleAddBlog.mock.calls[0][0].url).toBe('https://example.com/blog')
  expect(handleAddBlog.mock.calls[0][0].likes).toBe('10')

})