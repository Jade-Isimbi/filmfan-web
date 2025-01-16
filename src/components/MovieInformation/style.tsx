import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  containerSpaceAround: {
    display: 'flex',
    justifyContent: 'space-around',
    padding: '20px',
    // [theme.breakpoints.down('md')]: {
    //   flexDirection: 'column',
    //   alignItems: 'center',
    // },
  },
  poster: {
    width: '50%',
    borderRadius: '15px',
    // boxShadow: theme.shadows[5],
    // [theme.breakpoints.down('sm')]: {
    //   width: '70%',
    // },
  },
  genresContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '10px',
    marginBottom: '1rem',
    // [theme.breakpoints.down('sm')]: {
    //   flexDirection: 'column',
    //   alignItems: 'center',
    // },
  },
  genreImage: {
    marginRight: '5px',
    width: '30px',
    height: '30px',
    objectFit: 'contain',
  },
  links: {
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
    // color: theme.palette.text.primary,
    // '&:hover': {
    //   color: theme.palette.primary.main,
    // },
  },
  castImage: {
    width: '100%',
    borderRadius: '50%',
    // boxShadow: theme.shadows[2],
  },
  buttonsContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '1rem',
    // [theme.breakpoints.down('sm')]: {
    //   flexDirection: 'column',
    //   gap: '10px',
    // },
  },
  modal: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: '0 10px',
  },
  video: {
    width: '100%',
    height: '500px',
    borderRadius: '10px',
  },
}));

export default useStyles;
