import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import { PROTECTORS, PROTECTOR_VALUES } from '../../../constants/protectors';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(4),
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  btn: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  fullWidth: {
    width: '90%',
  },
}));

export function TiresFilter({ activeFilter, onFilterChange }) {
  const classes = useStyles();
  const [alignment, setAlignment] = useState('left');

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  // const [check, setCheck] = useState([
  //   { name: '5_6mm', checked: true },
  //   { name: '7mm', checked: true },
  //   { name: 'new', checked: true },
  // ]);

  // const handleCheckbox = (index) => (e) => {
  //   // !!!РАЗБЕРИСЬ!!!!
  //   const changedState = [...check];
  //   changedState[index] = { name: e.target.name, checked: e.target.checked };
  //   setCheck(changedState);
  // };

  //useEffect(() => protectorFilter(check)); //без useEffect показывал prevState при поднятии
  const protectorFilters = Object.values(PROTECTORS);

  return (
    <div className={classes.root}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>Сезон</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div className={classes.btn}>
            <Button
              variant="outlined"
              disableElevation
              onClick={() => onFilterChange('winter', 'season')}
            >
              Зима
            </Button>
            <Button
              variant="contained"
              color="primary"
              disableElevation
              onClick={() => onFilterChange('summer', 'season')}
            >
              Лето
            </Button>
          </div>
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded={true}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography className={classes.heading}>Высота протектора</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormGroup>
            {protectorFilters.map((filter, index) => (
              <FormControlLabel
                key={index}
                control={
                  <Checkbox
                    color="primary"
                    checked={activeFilter.protectors.includes(filter)}
                    //value={check.agree}
                    onChange={() => onFilterChange(filter, 'protectors')}
                    name={filter}
                  />
                }
                label={PROTECTOR_VALUES[filter]}
              />
            ))}
          </FormGroup>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3a-content"
          id="panel3a-header"
        >
          <Typography className={classes.heading}>Наличие</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div className={classes.btn}>
            <Button variant="outlined">1 шт</Button>
            <Button variant="outlined">2 шт</Button>
            <Button variant="outlined">3 шт</Button>
            <Button variant="outlined" fullWidth className={classes.fullWidth}>
              4 шт
            </Button>
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
