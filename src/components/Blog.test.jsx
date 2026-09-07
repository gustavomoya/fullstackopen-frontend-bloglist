import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('renders content', () => {
  const blog = {
    id: '123456',
    title: 'Component testing is done with react-testing-library',
    author: 'Jane Doe',
    url: 'https://example.com/blog',
    likes: 10,
    user: {
      id: '123',
      name: 'John Doe'
    }
  }

  const user = {
    id: '123',
    name: 'John Doe'
  }

  render(<Blog blog={blog} user={user} />)

  const element = screen.getByText(
      'Component testing is done with react-testing-library', { exact: false }
  )
  expect(element).toBeDefined()

  expect(screen.getByText('https://example.com/blog')).not.toBeVisible()
  expect(screen.getByText('10')).not.toBeVisible()

})

test('after clicking the button, url and likes are displayed', async () => {
  const blog = {
    id: '123456',
    title: 'Component testing is done with react-testing-library',
    author: 'Jane Doe',
    url: 'https://example.com/blog',
    likes: 10,
    user: {
      id: '123',
      name: 'John Doe'
    }
  }

  const user = {
    id: '123',
    name: 'John Doe'
  }

  render(<Blog blog={blog} user={user} />)

  const uEvent = userEvent.setup()
  const button = screen.getByText('View')
  await uEvent.click(button)

  expect(screen.getByText('https://example.com/blog')).toBeVisible()
  expect(screen.getByText('10')).toBeVisible()
})

test('clicking the button calls event handler twice', async () => {
  const blog = {
    id: '123456',
    title: 'Component testing is done with react-testing-library',
    author: 'Jane Doe',
    url: 'https://example.com/blog',
    likes: 10,
    user: {
      id: '123',
      name: 'John Doe'
    }
  }

  const user = {
    id: '123',
    name: 'John Doe'
  }

  const mockHandler = vi.fn()

  const {container} = render(<Blog blog={blog} user={user} updateBlog={mockHandler}/>)

  const uEvent = userEvent.setup()
  const button = container.querySelector('.btn-add-like')
  await uEvent.click(button)
  await uEvent.click(button)

  expect(mockHandler.mock.calls).toHaveLength(2)
})