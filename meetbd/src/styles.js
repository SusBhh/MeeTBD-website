import { makeStyles } from '@mui/styles';

const styles = (theme) => {
    return {
        heroBox: {
            width: '100%',
            display: 'flex',
            minHeight: '600px',
            alignItems: 'center',
            justifyContent: 'center',
        },
        subtitle: {
            opacity: '0.4',
            paddingBottom: '30px',
        },
        gridContainer: {
            display: 'flex',
            alignItems: 'center',
            maxWidth: '1300px',
            padding: '50px',
        },
        title: {
            paddingBottom: '15px',
        },
        largeImage: {
            width: '100%',
        },



    }
}
const useStyles = makeStyles(styles);
export default useStyles;