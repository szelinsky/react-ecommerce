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
import { PROTECTOR_NAMES } from '../../../constants/protectors';
import { SEASON_NAMES } from '../../../constants/season';
import SentimentDissatisfiedIcon from '@material-ui/icons/SentimentDissatisfied';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    marginTop: theme.spacing(2),
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
  notFound: {
    align: 'center',
    marginTop: theme.spacing(6),
  },
}));

export function TiresCard({ data }) {
  const classes = useStyles();
  if (data.length === 0) {
    return (
      <div className={classes.notFound}>
        <Typography align="center">
          <SentimentDissatisfiedIcon color="primary" style={{ fontSize: 60 }} />
        </Typography>
        <Typography variant="h6" gutterBottom align="center">
          К сожалению по вашему запросу ничего не найдено
        </Typography>
      </div>
    );
  }
  return (
    <Grid container spacing={3}>
      {data.map((product) => (
        <Grid item xs={12} sm={6} md={4} lg={4} key={product.id}>
          <Card className={classes.root}>
            <CardMedia
              className={classes.media}
              image={product.photo}
              title={product.name}
            />
            <CardContent>
              <Typography className={classes.title} variant="h6" component="h2">
                <Link href="#">{product.name}</Link>
              </Typography>

              <Typography variant="body1" component={'p'} gutterBottom>
                Сезон: {SEASON_NAMES[product.season]}
              </Typography>
              <Typography variant="body1" component={'p'} gutterBottom>
                Высота протектора: {PROTECTOR_NAMES[product.protector]}
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
