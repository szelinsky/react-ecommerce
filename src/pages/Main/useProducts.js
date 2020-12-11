import { useState, useEffect } from 'react';
import db from '../../data.json';
//import shortId from 'shortid'

const initialFilterState = {
  protectors: [],
  season: '',
  quantity: '',
};

export const useProducts = () => {
  const [data] = useState(db.products);
  const [activeFilter, setActiveFilter] = useState(initialFilterState);
  const [filteredProducts, setfilteredProducts] = useState([]);
  const [clearAllFilters, setClearAllFilters] = useState(false);
  const [clearFilter, setClearFilter] = useState([]);

  const onBtnChange = (clickedFilter, category) => {
    setActiveFilter((prevState) => ({
      ...prevState,
      [category]: clickedFilter,
    }));
    //render clear all filters btn
    setClearAllFilters(true);

    //add some clear btm
    //const activeFilterValues = Object.values(activeFilter)
    //setClearFilter([...clearFilter, category.clickedFilter]);
  };

  const onClearBtnChange = () => {
    setActiveFilter(initialFilterState);
    setClearAllFilters(false);
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
      //render clear btn
      setClearAllFilters(true);
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

      //add clear filter state arr
      const activeFiltersArr = [
        ...activeFilter.protectors,
        activeFilter.season,
        activeFilter.quantity,
      ];
      const clearArr = activeFiltersArr.filter((item) => item !== '');
      setClearFilter(clearArr);

      setfilteredProducts(filterProducts);
    };
    renderData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeFilter]);
  return {
    activeFilter,
    onCheckboxChange,
    onBtnChange,
    onClearBtnChange,
    filteredProducts,
    clearAllFilters,
    clearFilter,
    data,
  };
};
