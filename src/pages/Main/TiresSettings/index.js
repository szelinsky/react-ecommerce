import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Box from '@material-ui/core/Box';
import Brightness5Icon from '@material-ui/icons/Brightness5';
import AcUnitIcon from '@material-ui/icons/AcUnit';
//import HeightIcon from '@material-ui/icons/Height';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    // justifyContent: 'center',
    flexWrap: 'wrap',
    listStyle: 'none',
    padding: theme.spacing(0.5),
    margin: 0,
  },
  chip: {
    margin: theme.spacing(0.5),
  },
}));

export const TiresSettings = ({
  clearAllFilters,
  activeFilter,
  setActiveFilter,
  onClearBtnChange,
}) => {
  const classes = useStyles();

  const handleDelete = (itemToDelete) => () => {
    setActiveFilter((items) =>
      items.filter((item) => item.value !== itemToDelete.value)
    );
  };

  return (
    <Box component="ul" className={classes.root}>
      {clearAllFilters && (
        <li>
          <Chip
            label="Сбросить"
            className={classes.chip}
            onClick={onClearBtnChange}
            color="primary"
          />
        </li>
      )}
      {activeFilter.map((item) => {
        let icon;

        if (item.value === 'summer') {
          icon = <Brightness5Icon />;
        }

        if (item.value === 'winter') {
          icon = <AcUnitIcon />;
        }

        return (
          <li key={item.value}>
            <Chip
              icon={icon}
              label={item.label}
              onDelete={handleDelete(item)}
              className={classes.chip}
              variant="outlined"
              color="primary"
            />
          </li>
        );
      })}
    </Box>
  );
};
