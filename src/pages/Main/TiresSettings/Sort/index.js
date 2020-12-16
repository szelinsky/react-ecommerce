import { useState } from 'react';
import Select from 'react-select';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    width: 250,
    //padding: theme.spacing(0.5),
  },
}));

const customStyles = {
  option: (provided, state) => ({
    ...provided,
    color: '#000',
    fontWeight: state.isSelected ? 'bold' : 'normal',
  }),
  control: () => ({
    width: 250,
    backgroundColor: '#fff',
    borderRadius: 4,
    display: 'flex',
    justifyContent: 'space-between',
    boxShadow: '0px 2px 2px -1px rgba(0,0,0,0.2)',
  }),
};

const options = [
  { value: 'novelty', label: 'Новинки' },
  { value: 'cheap', label: 'От дешевых к дорогим' },
  { value: 'expensive', label: 'От дорогих к дешевым' },
];

export const Sort = ({ onSortChanged }) => {
  const classes = useStyles();
  const [sortProducts] = useState(options[0]);

  // const handleChange = (selectedOption) => {
  // 	setSortProducts(selectedOption)
  // 	console.log(sortProducts)
  // }
  return (
    <div>
      <Select
        className={classes.root}
        options={options}
        defaultValue={sortProducts}
        styles={customStyles}
        isSearchable={false}
        onChange={onSortChanged}
        theme={(theme) => ({
          ...theme,
          colors: {
            ...theme.colors,
            primary: 'neutral5',
          },
        })}
      />
    </div>
  );
};
