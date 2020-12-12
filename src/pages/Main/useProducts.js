import { useState, useEffect } from 'react';
import db from '../../data.json';
//import shortId from 'shortid'

const initialFilterState = [];

export const useProducts = () => {
  const [data] = useState(db.products);
  const [activeFilter, setActiveFilter] = useState([]);
  const [filteredProducts, setfilteredProducts] = useState([]);
  const [clearAllFilters, setClearAllFilters] = useState(false);
  const [clearFilter, setClearFilter] = useState([]);

  const onBtnChange = (clickedFilter, category) => {
    //change clicked filter if exist
    const isExist = activeFilter.some((item) => item.category === category);
    if (isExist) {
      const copyState = [...activeFilter];
      const categoryIndex = copyState.findIndex(
        (item) => item.category === category
      );
      copyState[categoryIndex] = { category, value: clickedFilter };
      setActiveFilter(copyState);
      //add new
    } else {
      setActiveFilter((prevState) => [
        ...prevState,
        { category, value: clickedFilter },
      ]);
    }

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
    //remove checkboxes from state array
    const isExist = activeFilter.some((item) => item.value === checkedFilter);
    if (isExist) {
      setActiveFilter(
        activeFilter.filter((item) => item.value !== checkedFilter)
      );
    } else {
      //add checkboxes to state array
      setActiveFilter([...activeFilter, { category, value: checkedFilter }]);
      //render clear btn
      setClearAllFilters(true);
    }
  };

  useEffect(() => {
    const renderData = () => {
      let filterProducts = [...data];

      // //filter by protector
      if (activeFilter.some((item) => item.category === 'protectors')) {
        const clickedFilter = activeFilter.filter(
          (item) => item.category === 'protectors'
        );
        const protectorsArray = clickedFilter.map(el => el.value);
        filterProducts = filterProducts.filter((elem) =>
          protectorsArray.includes(elem.protector)
        );
      }

      //filter by season
      if (activeFilter.some((item) => item.category === 'season')) {
        const clickedFilter = activeFilter.find(
          (item) => item.category === 'season'
        );
        filterProducts = filterProducts.filter(
          (elem) => elem.season === clickedFilter.value
        );
      }

      // //filter by quantity
      if (activeFilter.some((item) => item.category === 'quantity')) {
        const clickedFilter = activeFilter.find(
          (item) => item.category === 'quantity'
        );
        filterProducts = filterProducts.filter(
          (elem) => elem.quantity === clickedFilter.value
        );
      }

      // //add clear filter state arr
      // const activeFiltersArr = [
      //   ...activeFilter.protectors,
      //   activeFilter.season,
      //   activeFilter.quantity,
      // ];
      // const clearArr = activeFiltersArr.filter((item) => item !== '');
      // setClearFilter(clearArr);

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
