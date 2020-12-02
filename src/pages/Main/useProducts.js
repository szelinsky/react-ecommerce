import { useState, useEffect } from "react";
import db from "../../data.json";
import { PROTECTORS } from "../../constants/protectors";

export const useProducts = () => {
  const [data, setData] = useState(db.products);
  const [activeFilter, setActiveFilter] = useState({
    protectors: [],
    season: "",
  });
  const [filteredList, setFilteredList] = useState([]);

  const onBtnChange = (filter, category) => {
    //console.log(filter, category);
    setActiveFilter((prevState) => ({ ...prevState, season: filter }));
  };

  const onCheckboxChange = (filter, category) => {
    const activeCategory = activeFilter[category];
    if (activeCategory.includes(filter)) {
      const filterIndex = activeCategory.indexOf(filter);
      const newFilterArr = [...activeCategory];
      newFilterArr.splice(filterIndex, 1);
      setActiveFilter((prevState) => ({
        ...prevState,
        [category]: newFilterArr,
      }));
    } else {
      setActiveFilter((prevState) => ({
        ...prevState,
        [category]: [...prevState[category], filter],
      }));
    }
  };

  useEffect(() => {
    const renderData = () => {
      const protectors = Object.values(PROTECTORS);
      if (
        activeFilter.protectors.length === 0 ||
        activeFilter.protectors.length === protectors.length
      ) {
        setData(data);
        setFilteredList([]);
      }
      if (activeFilter.season.length !== 0) {
        const seasonFilter = data.filter((item) =>
          activeFilter.season.includes(item.season)
        );
        setFilteredList(seasonFilter);
      } else {
        const filtered = data.filter((item) =>
          activeFilter.protectors.includes(item.protector)
        );
        setFilteredList(filtered);
      }
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
