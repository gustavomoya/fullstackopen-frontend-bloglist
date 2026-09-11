import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import Blog from './Blog'

test('renders content unauthenticated users', () => {
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

    render(
        <MemoryRouter>
            <Blog blog={blog}/>
        </MemoryRouter>
    )

    const element = screen.getByText(
        'Component testing is done with react-testing-library', { exact: false }
    )
    expect(element).toBeDefined()

    expect(screen.getByText('https://example.com/blog')).toBeVisible()
    expect(screen.getByText('10 likes')).toBeVisible()

    expect(screen.queryByText('Like')).toBeNull()
    expect(screen.queryByText('Remove')).toBeNull()

})

test('render content to a user who is not the owner', () => {
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
        id: '456',
        name: 'Jane Doe'
    }

    render(
        <MemoryRouter>
            <Blog blog={blog} user={user}/>
        </MemoryRouter>
    )

    expect(screen.getByText('https://example.com/blog')).toBeVisible()
    expect(screen.getByText('10 likes')).toBeVisible()
    expect(screen.getByText('Like')).toBeVisible()

    expect(screen.queryByText('Remove')).toBeNull()
})

test('renders content to authenticated owner users', () => {
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

    render(
        <MemoryRouter>
            <Blog blog={blog} user={user}/>
        </MemoryRouter>
    )

    const element = screen.getByText(
        'Component testing is done with react-testing-library', { exact: false }
    )
    expect(element).toBeDefined()

    expect(screen.getByText('https://example.com/blog')).toBeVisible()
    expect(screen.getByText('10 likes')).toBeVisible()
    expect(screen.getByText('Like')).toBeVisible()
    expect(screen.getByText('Remove')).toBeVisible()
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

    const { container } = render(
        <MemoryRouter>
            <Blog blog={blog} user={user} updateBlog={mockHandler}/>
        </MemoryRouter>
    )

    const uEvent = userEvent.setup()
    const button = container.querySelector('.btn-add-like')
    await uEvent.click(button)
    await uEvent.click(button)

    expect(mockHandler.mock.calls).toHaveLength(2)
})