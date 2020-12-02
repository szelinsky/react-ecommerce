import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { PROTECTOR_VALUES } from '../../../constants/protectors';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    marginTop: theme.spacing(4),
  },
  media: {
    height: 0,
    backgroundSize: 'contain',
    paddingTop: '56.25%', // 16:9
  },
  title: {
    lineHeight: '1.3',
    marginBottom: theme.spacing(1),
    height: '50px',
    position: 'relative',
    top: '10%',
  },
  button: {
    margin: theme.spacing(1),
    display: 'flex',
    justifyContent: 'space-between',
  },
}));

export function TiresCard({ data }) {
  const classes = useStyles();
  return (
    <Grid container spacing={3}>
      {data.map((product) => (
        <Grid item xs={12} sm={6} md={4} lg={4} key={product.id}>
          <Card className={classes.root}>
            <CardMedia
              className={classes.media}
              image={product.photo}
              title="Paella dish"
            />
            <CardContent>
              <Typography className={classes.title} variant="h6" component="h2">
                <Link href="#">{product.name}</Link>
              </Typography>

              <Typography variant="body1" component={'p'} gutterBottom>
                Сезон: {product.season}
              </Typography>
              <Typography variant="body1" component={'p'} gutterBottom>
                Высота протектора: {PROTECTOR_VALUES[product.protector]}
              </Typography>
              <Typography variant="body1" component={'p'} gutterBottom>
                Наличие: {product.quantity} шт
              </Typography>
            </CardContent>
            <CardActions className={classes.button}>
              <Typography variant="h5" component="h3">
                {product.price} <Typography variant="overline">грн</Typography>
              </Typography>
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                endIcon={<ShoppingCartIcon />}
              >
                Купить
              </Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
