import { useState, useEffect } from 'react';
import db from '../../data.json';
//import { PROTECTORS } from '../../constants/protectors';

export const useProducts = () => {
  const [data] = useState(db.products);
  const [activeFilter, setActiveFilter] = useState({
    protectors: [],
    season: '',
  });
  const [filteredList, setFilteredList] = useState([]);

  const onFilterChange = (filter, category) => {
    const activeCategory = activeFilter[category];
    if (category === 'protectors') {
      //remove checkboxes from state
      if (activeCategory.includes(filter)) {
        const filterIndex = activeCategory.indexOf(filter);
        const newFilterArr = [...activeCategory];
        newFilterArr.splice(filterIndex, 1);
        setActiveFilter((prevState) => ({
          ...prevState,
          [category]: newFilterArr,
        }));
      } else {
        //add checkboxes to state
        setActiveFilter({
          ...activeFilter,
          [category]: [...activeCategory, filter],
        });
      }
    } else {
      //console.log(filter)
      setActiveFilter({ ...activeFilter, [category]: filter });
    }
  };

  useEffect(() => {
    const renderData = () => {
      //const protectors = Object.values(PROTECTORS);
      
      // if (
      //   activeFilter.protectors.length === 0 ||
      //   activeFilter.protectors.length === protectors.length
      // ) {
      //   setData(data);
      //   setFilteredList([]);
      // }

      // if (activeFilter.season.length !== 0) {
      //   const seasonFilter = data.filter((item) =>
      //     activeFilter.season.includes(item.season)
      //   );
      //   setFilteredList(seasonFilter);
      // }
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
      setFilteredList(filterProducts);
      //setActiveFilter({...activeFilter, season: ''})
    };
    renderData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeFilter]);
  return {
    activeFilter,
    onFilterChange,
    filteredList,
    data,
  };
};
