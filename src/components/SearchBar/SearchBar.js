import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styles from "./styles.module.css"; // Import css modules stylesheet as styles
import Img from "../ImgWithContainer/Img";
import search from "../../assets/img/img/search.png";
import { axios } from "axios";

const SearchBar = (props) => {
	const [searchKey, setSearchKey] = useState('')
	const searching = () =>{
		axios.get(`${process.env.REACT_APP_URL}/search?keyword=${searchKey}`)
		.then((res) => {
			
		})
		.catch(() => {

		})
	}
	return (
		<div className={styles.searchContainer}>
			<input
				placeholder="Search"
				className={styles.searchInput}
				ref={props.refProp}
				onKeyPress={props.onKeyPress}
			/>
			<Img
				source={search}
				containerStyle={styles.search}
				imgStyle={styles.img}
			/>
		</div>
	);
};

SearchBar.propTypes = {
	// Either a function
	refProp: PropTypes.oneOfType([
		// Either a function
		PropTypes.func,
		// Or the instance of a DOM native element (see the note about SSR)
		PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
	]),
	onKeyPress: PropTypes.func,
};

export default SearchBar;
