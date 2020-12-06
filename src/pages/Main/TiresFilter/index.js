import { useState } from 'react';
import { PROTECTORS, PROTECTOR_NAMES } from '../../../constants/protectors';
import { SEASON, SEASON_NAMES } from '../../../constants/season';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';

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

export function TiresFilter({ activeFilter, onCheckboxChange, onBtnChange }) {
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
  const protectorFilterTitles = Object.values(PROTECTORS);
  const seasonFilterTitles = Object.values(SEASON);

  return (
    <div className={classes.root}>
      <Accordion defaultExpanded={true}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>Сезон</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div className={classes.btn}>
            {seasonFilterTitles.map((title, index) => (
              <Button
                key={index}
                variant={
                  activeFilter.season.includes(title) ? 'contained' : 'outlined'
                }
                color={
                  activeFilter.season.includes(title) ? 'primary' : 'default'
                }
                disableElevation
                onClick={() => onBtnChange(title, 'season')}
              >
                {SEASON_NAMES[title]}
              </Button>
            ))}
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
            {protectorFilterTitles.map((title, index) => (
              <FormControlLabel
                key={index}
                control={
                  <Checkbox
                    color="primary"
                    checked={activeFilter.protectors.includes(title)}
                    //value={check.agree}
                    onChange={() => onCheckboxChange(title, 'protectors')}
                    name={title}
                  />
                }
                label={PROTECTOR_NAMES[title]}
              />
            ))}
          </FormGroup>
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded={true}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3a-content"
          id="panel3a-header"
        >
          <Typography className={classes.heading}>Наличие</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div className={classes.btn}>
            <Button
              variant={
                activeFilter.quantity.includes(String(1))
                  ? 'contained'
                  : 'outlined'
              }
              color={
                activeFilter.quantity.includes(String(1))
                  ? 'primary'
                  : 'default'
              }
              disableElevation
              onClick={() => onBtnChange(String(1), 'quantity')}
            >
              1 шт
            </Button>
            <Button
              variant={
                activeFilter.quantity.includes(String(2))
                  ? 'contained'
                  : 'outlined'
              }
              color={
                activeFilter.quantity.includes(String(2))
                  ? 'primary'
                  : 'default'
              }
              disableElevation
              onClick={() => onBtnChange(String(2), 'quantity')}
            >
              2 шт
            </Button>
            <Button
              variant={
                activeFilter.quantity.includes(String(3))
                  ? 'contained'
                  : 'outlined'
              }
              color={
                activeFilter.quantity.includes(String(3))
                  ? 'primary'
                  : 'default'
              }
              disableElevation
              onClick={() => onBtnChange(String(3), 'quantity')}
            >
              3 шт
            </Button>
            <Button
              variant={
                activeFilter.quantity.includes(String(4))
                  ? 'contained'
                  : 'outlined'
              }
              color={
                activeFilter.quantity.includes(String(4))
                  ? 'primary'
                  : 'default'
              }
              disableElevation
              onClick={() => onBtnChange(String(4), 'quantity')}
              fullWidth
              className={classes.fullWidth}
            >
              4 шт
            </Button>
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
