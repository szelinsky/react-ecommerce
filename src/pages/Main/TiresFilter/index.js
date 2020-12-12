import { PROTECTORS, PROTECTOR_NAMES } from '../../../constants/protectors';
import { SEASON, SEASON_NAMES } from '../../../constants/season';
import { QUANTITY, QUANTITY_NAMES } from '../../../constants/quantity';
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
    marginTop: theme.spacing(2),
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

  const protectorFilterTitles = Object.values(PROTECTORS);
  const seasonFilterTitles = Object.values(SEASON);
  const quantityFilterTitles = Object.values(QUANTITY);

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
                  activeFilter.some((item) => item.value === title)
                    ? 'contained'
                    : 'outlined'
                }
                color={
                  activeFilter.some((item) => item.value === title)
                    ? 'primary'
                    : 'default'
                }
                disableElevation
                onClick={() =>
                  onBtnChange(title, 'season', SEASON_NAMES[title])
                }
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
                    checked={activeFilter.some((item) => item.value === title)}
                    onChange={() =>
                      onCheckboxChange(
                        title,
                        'protectors',
                        PROTECTOR_NAMES[title]
                      )
                    }
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
            {quantityFilterTitles.map((title, index) => (
              <Button
                key={index}
                variant={
                  activeFilter.some((item) => item.value === title)
                    ? 'contained'
                    : 'outlined'
                }
                color={
                  activeFilter.some((item) => item.value === title)
                    ? 'primary'
                    : 'default'
                }
                disableElevation
                onClick={() =>
                  onBtnChange(title, 'quantity', QUANTITY_NAMES[title])
                }
                className={
                  quantityFilterTitles[index] === 4 ? classes.fullWidth : null
                }

              >
                {QUANTITY_NAMES[title]}
              </Button>
            ))}
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
