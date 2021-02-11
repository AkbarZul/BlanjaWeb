import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styles from "./styles.module.css"; // Import css modules stylesheet as styles
import Img from "../ImgWithContainer/Img";
import { Link, useHistory } from "react-router-dom";
import search from "../../assets/img/img/search.png";
import { axios } from "axios";

const SearchBar = (props) => {
  const [searchKey, setSearchKey] = useState("");
  //   const [getSearch, setGetSearch] = useState([]);

  console.log("get search", searchKey);
  //   const searching = () => {
  //     axios
  //       .get(`${process.env.REACT_APP_URL}/search?keyword=${searchKey}`)
  //       .then((res) => {
  //         const result = res.data.data;
  //         setGetSearch(result);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   };
  //   const key = () => {
  //     setSearchKey(searchKey);
  //   };
  // const handleKeyDown = (event) => {
  //     if (event.key === 'Enter') {
  //       console.log('do validate')
  // 	return searchKey;
  //     }
  //   }
  console.log("tesprop", props);

  const history = useHistory();

  const handleSearch = (e) => {
    e.preventDefault();
    if (e.target.value === "") {
      return;
    } else {
      history.push({
        pathname: "/search",
        searchKey,
      });
    }
  };

  return (
    <div className={styles.searchContainer}>
      <input
        placeholder="Search..."
        className={styles.searchInput}
        onKeyPress={(event) => {
          if (event.key === "Enter") {
            handleSearch(event);

            //   search: "/search?keyword=",
            //   searchkey,
          }
        }}
        onChange={(e) => setSearchKey(e.target.value)}
      />
      <Img
        source={search}
        containerStyle={styles.search}
        imgStyle={styles.img}
      />
    </div>
  );
};

// SearchBar.propTypes = {
//   // Either a function
//   refProp: PropTypes.oneOfType([
//     // Either a function
//     PropTypes.func,
//     // Or the instance of a DOM native element (see the note about SSR)
//     PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
//   ]),
//   onKeyPress: PropTypes.func,
// };

export default SearchBar;
