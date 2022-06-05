import axios from "axios";
import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import Products from "../../components/Products/Products";
import Search from "../../components/Search/Search";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { ProductsInterface } from "../../interfaces/interface";
import "./HomeScreen.css";
import { IconButton } from "@mui/material";
import Filter from "../../components/Filter/Filter";
import Footer from "../../components/Footer/Footer";
import Loader from "../../components/Loader/Loader";

const HomeScreen = (): JSX.Element => {
  const [products, setProducts] = useState<ProductsInterface[]>([]);
  const [productsLoading, setProductsLoading] = useState<boolean>(true);
  const [productsStatic, setProductsStatic] = useState<ProductsInterface[]>([]);
  const [cartItems, setCartItems] = useState<ProductsInterface[]>(
    JSON.parse(sessionStorage.getItem("cartItems") || "[]") ?? []
  );
  const [search, setSearch] = useState<string>("");
  const [filter, setFilter] = useState<boolean>(false);

  const fetchData = async () => {
    try {
      setProductsLoading(true);
      const { data } = await axios.get(
        " https://geektrust.s3.ap-southeast-1.amazonaws.com/coding-problems/shopping-cart/catalogue.json "
      );
      setProducts(data);
      setProductsStatic(data);
      setProductsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {productsLoading ? (
        <Loader cartItems={cartItems} />
      ) : (
        <>
          <Header cartItems={cartItems} navigation="cart" />

          <div className="homeScreen">
            <Search
              setSearch={setSearch}
              setProducts={setProducts}
              productsStatic={productsStatic}
              search={search}
            />
            <IconButton aria-label="cart" onClick={() => setFilter(!filter)}>
              <FilterAltIcon className="filterIcon" />
            </IconButton>
          </div>
          <Products
            products={products}
            setProducts={setProducts}
            cartItems={cartItems}
            setCartItems={setCartItems}
          />
          <Filter
            filter={filter}
            setFilter={setFilter}
            productsStatic={productsStatic}
            setProducts={setProducts}
          />

          <Footer />
        </>
      )}
    </>
  );
};

export default HomeScreen;
