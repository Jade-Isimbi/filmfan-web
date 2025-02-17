import { SxProps, Theme } from '@mui/material'

const style = {
    container: {
        padding: '2rem',
        backgroundColor: '#f9f9f9',
    } as SxProps<Theme>,

    card: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '1rem',
        border: '1px solid #ddd',
        borderRadius: '8px',
        backgroundColor: '#fff',
        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
        transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
        '&:hover': {
            transform: 'scale(1.05)',
            boxShadow: '0px 6px 10px rgba(0, 0, 0, 0.2)',
        },
    } as SxProps<Theme>,

    moviePoster: {
        width: '100%',
        borderRadius: '4px',
        marginBottom: '1rem',
    },

    movieTitle: {
        fontSize: '1rem',
        fontWeight: 'bold',
        textAlign: 'center',
        margin: '0.5rem 0',
    } as SxProps<Theme>,

    movieOverview: {
        fontSize: '0.9rem',
        color: '#555',
        textAlign: 'center',
    } as SxProps<Theme>,
}

export default style
