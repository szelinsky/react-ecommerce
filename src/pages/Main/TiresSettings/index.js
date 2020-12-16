import { Sort } from './Sort';
import { ClearFilters } from './ClearFilters';
import Box from '@material-ui/core/Box';
//import Brightness5Icon from '@material-ui/icons/Brightness5';

export const TiresSettings = ({
  clearAllFilters,
  activeFilter,
  setActiveFilter,
  onClearBtnChange,
  onSortChanged,
}) => {
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      style={{ height: 50 }}
    >
      <ClearFilters
        clearAllFilters={clearAllFilters}
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
        onClearBtnChange={onClearBtnChange}
      />
      <Sort onSortChanged={onSortChanged} />
    </Box>
  );
};
