import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Box from '@material-ui/core/Box';
import Brightness5Icon from '@material-ui/icons/Brightness5';
import AcUnitIcon from '@material-ui/icons/AcUnit';
import HeightIcon from '@material-ui/icons/Height';

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
  clearFilter,
  onClearBtnChange,
}) => {
	const classes = useStyles();
	//const [chipData, setChipData] = useState(clearFilter);
	//setChipData(clearFilter)
	console.log('clearFilter', clearFilter)
	//console.log(chipData)
	
  const handleDelete = (chipToDelete) => () => {
    // setChipData((chips) =>
    //   chips.filter((chip) => chip.key !== chipToDelete.key)
    // );
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
      {clearFilter.map((data) => {
        let icon;

        // if (data.label === 'Лето') {
        //   icon = <Brightness5Icon />;
        // }

        // if (data.label === 'Зима') {
        //   icon = <AcUnitIcon />;
        // }

        // if (data.label === '5-6 мм') {
        //   icon = <HeightIcon />;
        // }

        return (
          <li key={data}>
            <Chip
              icon={icon}
              label={data}
              onDelete={handleDelete(data)}
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
