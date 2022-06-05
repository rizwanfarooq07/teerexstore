import { IconButton } from "@mui/material";
import React from "react";
import {
  MainComponentInterface,
  ProductsInterface,
} from "../../interfaces/interface";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import "./Products.css";
import notFount from "../../assets/NotFound.webp";

const Products = ({
  products,
  cartItems,
  setCartItems,
  setProducts,
}: MainComponentInterface) => {
  // add items to cart
  const addToCart = (product: ProductsInterface) => {
    const newCartItem = {
      ...product,
      quantityAdded: 1,
      outOfStock: false,
    };
    if (cartItems.length === 0) {
      setCartItems([...cartItems, newCartItem]);
      sessionStorage.setItem(
        "cartItems",
        JSON.stringify([...cartItems, newCartItem])
      );
    } else {
      if (cartItems.some((item) => item.id === product.id)) {
        alert(`${product.name} already added !`);
      } else {
        setCartItems([...cartItems, newCartItem]);
        sessionStorage.setItem(
          "cartItems",
          JSON.stringify([...cartItems, newCartItem])
        );
      }
    }
  };

  return (
    <div className="products__container">
      {" "}
      {products.length === 0 ? (
        <img
          className="products__container__notFound"
          src={notFount}
          alt="not found"
        />
      ) : (
        products.map((product: ProductsInterface, i: number) => (
          <div className="product__card" key={product.id}>
            <img height="150" src={product.imageURL} alt={product.name} />
            <h2>{product.name}</h2>
            <div className="add_to_cart">
              <div>
                <h4>Price: Rs. {product.price}</h4>
                {product.quantity === 0 ? (
                  <h4 style={{ color: "red" }}>Out of Stock !</h4>
                ) : (
                  <h4>Quantity: {product.quantity}</h4>
                )}
              </div>
              {product.quantity > 0 && (
                <IconButton onClick={() => addToCart(product)}>
                  {" "}
                  <ShoppingCartIcon className="icon" />
                </IconButton>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Products;
