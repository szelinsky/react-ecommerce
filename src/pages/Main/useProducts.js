import { useState, useEffect } from 'react';
import db from '../../data.json';
//import shortId from 'shortid'

const initialFilterState = [];

export const useProducts = () => {
  const [data] = useState(db.products);
  const [activeFilter, setActiveFilter] = useState([]);
  const [filteredProducts, setfilteredProducts] = useState([]);
  const [clearAllFilters, setClearAllFilters] = useState(false);

  const onBtnChange = (clickedFilter, category, label) => {
    //change clicked filter if exist
    const isExist = activeFilter.some((item) => item.category === category);
    if (isExist) {
      const copyState = [...activeFilter];
      const categoryIndex = copyState.findIndex(
        (item) => item.category === category
      );
      copyState[categoryIndex] = { category, value: clickedFilter, label };
      setActiveFilter(copyState);
      //add new
    } else {
      setActiveFilter((prevState) => [
        ...prevState,
        { category, value: clickedFilter, label },
      ]);
    }

    //render clear all filters btn
    setClearAllFilters(true);
  };

  const onClearBtnChange = () => {
    setActiveFilter(initialFilterState);
    setClearAllFilters(false);
  };

  const onCheckboxChange = (checkedFilter, category, label) => {
    //remove checkboxes from state array
    const isExist = activeFilter.some((item) => item.value === checkedFilter);
    if (isExist) {
      setActiveFilter(
        activeFilter.filter((item) => item.value !== checkedFilter)
      );
    } else {
      //add checkboxes to state array
      setActiveFilter([...activeFilter, { category, value: checkedFilter, label }]);
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
        const protectorsArray = clickedFilter.map((el) => el.value);
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

      //filter by quantity
      if (activeFilter.some((item) => item.category === 'quantity')) {
        const clickedFilter = activeFilter.find(
          (item) => item.category === 'quantity'
        );
        filterProducts = filterProducts.filter(
          (elem) => elem.quantity === clickedFilter.value
        );
      }

      //remove clear filters btn
      if (activeFilter.length === 0) {
        setClearAllFilters(false);
      }

      //show products
      setfilteredProducts(filterProducts);
    };
    renderData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeFilter]);
  return {
    activeFilter,
    setActiveFilter,
    onCheckboxChange,
    onBtnChange,
    onClearBtnChange,
    filteredProducts,
    clearAllFilters,
    data,
  };
};
