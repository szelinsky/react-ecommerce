import { TiresCard } from './TiresCard';
import { TiresFilter } from './TiresFilter';
import { TiresSettings } from './TiresSettings';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useProducts } from './useProducts';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing(3),
  },
}));

export function Main() {
  // useEffect(() => {
  //   const filterData = () => {
  //     const filterWords = [...checkboxFilter]
  //       .filter((item) => item.checked)
  //       .map((item) => item.name);

  //     if (filterWords.length !== 0) {
  //       const filteredData = data.products.filter(
  //         (item) => filterWords.some((k) => item.protector.includes(k))
  //         //item.protector.some(k => filterWords.includes(k))
  //       );
  //       setData({ products: filteredData });
  //     } else {
  //       setData({ products: db.products });
  //     }
  //   };
  //   filterData();
  // }, [checkboxFilter]);

  // const convertStateToArray = (data) => {
  //   const entries = Object.entries(data);
  //   for (const entry of entries) {
  //     const key = entry[0];
  //     const value = entry[1];
  //     stateArray.push({ [key]: value });
  //   }
  // };

  //const updateData = (checkboxObj) => {
  //console.log(checkboxObj);
  // const result = [];
  // for (let value in checkboxObj) {
  //   if (checkboxObj[value]) result.push(value);
  // }

  const products = useProducts();
  const classes = useStyles();

  return (
    <Container>
      <Grid>
        <TiresSettings
          activeFilter={products.activeFilter}
          setActiveFilter={products.setActiveFilter}
          onClearBtnChange={products.onClearBtnChange}
          clearAllFilters={products.clearAllFilters}
          onSortChanged={products.onSortChanged}
        />
      </Grid>

      <Grid container className={classes.root} spacing={3}>
        <Grid item xs={12} md={3}>
          <TiresFilter
            activeFilter={products.activeFilter}
            clearAllFilters={products.clearAllFilters}
            onCheckboxChange={products.onCheckboxChange}
            onBtnChange={products.onBtnChange}
          />
        </Grid>
        <Grid item xs={12} md={9}>
          <TiresCard data={products.filteredProducts} />
        </Grid>
      </Grid>
    </Container>
  );
}
