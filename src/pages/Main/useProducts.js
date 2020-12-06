import { useState, useEffect } from 'react';
import db from '../../data.json';
//import { PROTECTORS } from '../../constants/protectors';

export const useProducts = () => {
  const [data] = useState(db.products);
  const [activeFilter, setActiveFilter] = useState({
    protectors: [],
    season: '',
    quantity: '',
  });
  const [filteredList, setFilteredList] = useState([]);

  const onBtnChange = (clickedFilter, category) => {
    setActiveFilter((prevState) => ({
      ...prevState,
      [category]: clickedFilter,
    }));
  };

  const onCheckboxChange = (checkedFilter, category) => {
    const activeCategory = activeFilter[category];
    //remove checkboxes from state array
    if (activeCategory.includes(checkedFilter)) {
      const filterIndex = activeCategory.indexOf(checkedFilter);
      const newFilterArr = [...activeCategory];
      newFilterArr.splice(filterIndex, 1);
      setActiveFilter((prevState) => ({
        ...prevState,
        [category]: newFilterArr,
      }));
    } else {
      //add checkboxes to state array
      setActiveFilter({
        ...activeFilter,
        [category]: [...activeCategory, checkedFilter],
      });
    }
  };

  useEffect(() => {
    const renderData = () => {
      let filterProducts = [...data];

      //filter by protector
      if (activeFilter.protectors.length !== 0) {
        filterProducts = filterProducts.filter((item) =>
          activeFilter.protectors.includes(item.protector)
        );
      }

      //filter by season
      if (activeFilter.season) {
        filterProducts = filterProducts.filter(
          (item) => item.season === activeFilter.season
        );
      }

      //filter by quantity
      if (activeFilter.quantity) {
        filterProducts = filterProducts.filter(
          (item) => item.quantity === Number(activeFilter.quantity)
        );
      }
      setFilteredList(filterProducts);
    };
    renderData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeFilter]);
  return {
    activeFilter,
    onCheckboxChange,
    onBtnChange,
    filteredList,
    data,
  };
};
