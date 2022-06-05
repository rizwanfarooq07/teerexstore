import React from "react";
import "./Search.css";
import SearchIcon from "@mui/icons-material/Search";
import { IconButton } from "@mui/material";
import { SearchPropsInterface } from "../../interfaces/interface";

const Search = ({
  setSearch,
  setProducts,
  search,
  productsStatic,
}: SearchPropsInterface): JSX.Element => {
  // search products by name, color or type
  const searchFilter = () => {
    setProducts(productsStatic);
    const searchValue = productsStatic.filter(
      (product) =>
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.color.toLowerCase().includes(search.toLowerCase()) ||
        product.type.toLowerCase().includes(search.toLowerCase())
    );
    search !== "" ? setProducts(searchValue) : setProducts(productsStatic);
  };
  return (
    <div className="search">
      <input
        type="text"
        placeholder="Search products..."
        onChange={(e) => setSearch(e.target.value)}
      />
      <IconButton
        aria-label="cart"
        onClick={() => {
          searchFilter();
        }}
      >
        <SearchIcon className="searchIcon" />
      </IconButton>
    </div>
  );
};

export default Search;
