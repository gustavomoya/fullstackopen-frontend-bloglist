import { Alert } from '@mui/material'

const Notification = ({ message, isSuccess }) => {
    if (message === null) {
        return null
    }

    const className = isSuccess === true ? 'success' : 'error'

    return (
        <Alert style={{ marginTop: 10, marginBottom: 10 }} severity={className}>
            {message}
        </Alert>
    )
}

export default Notification