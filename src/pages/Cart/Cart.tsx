import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import { ProductsInterface } from "../../interfaces/interface";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveIcon from "@mui/icons-material/Remove";
import empty from "../../assets/empty.png";
import "./Cart.css";
import { Button, IconButton } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Footer from "../../components/Footer/Footer";
import Subcart from "../../components/Subcart/Subcart";
import Summary from "../../components/SummaryContainer/Summary";

const Cart = () => {
  const [cartItems, setCartItems] = useState<ProductsInterface[]>([]);
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    setCartItems(JSON.parse(sessionStorage.getItem("cartItems") || "{}"));
  }, []);

  const removeItem = (cartItem: ProductsInterface) => {
    const updatedCartItems = cartItems.filter(
      (item) => item.id !== cartItem.id
    );
    setCartItems(updatedCartItems);
    sessionStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
  };

  // Add items from cart
  const addQuantity = (cartItem: ProductsInterface) => {
    if (cartItem.quantity > cartItem.quantityAdded) {
      const updatedCartItems = cartItems.map((item: any) =>
        item.id === cartItem.id
          ? { ...item, quantityAdded: item.quantityAdded + 1 }
          : item
      );
      setCartItems(updatedCartItems);
      sessionStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
    } else {
      const updatedCartItems = cartItems.map((item: any) =>
        item.id === cartItem.id ? { ...item, outOfStock: true } : item
      );
      setCartItems(updatedCartItems);
      sessionStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
    }
  };

  // Substract items from cart
  const substractQuantity = (cartItem: ProductsInterface) => {
    if (cartItem.quantityAdded === 1) {
      removeItem(cartItem);
    } else {
      const updatedCartItems = cartItems.map((item: any) =>
        item.id === cartItem.id
          ? {
              ...item,
              quantityAdded: item.quantityAdded - 1,
              outOfStock: false,
            }
          : item
      );
      setCartItems(updatedCartItems);
      sessionStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
    }
  };

  console.log(Object.keys(cartItems).length);

  return (
    <>
      <Header navigation="home" cartItems={cartItems} />
      {Object.keys(cartItems).length === 0 ? (
        <div className="container">
          <img src={empty} alt="No products" className="empty" />
        </div>
      ) : (
        <>
          <div className="wrapper">
            <div className="mainContainer">
              <div className="container">
                {cartItems.map((cartItem) => (
                  <div className="cartContainer" key={cartItem.id}>
                    <img src={cartItem.imageURL} alt={cartItem.name} />
                    <div className="details">
                      <h2>{cartItem.name}</h2>
                      <h4>Rs. {cartItem.price}</h4>
                      <p>Total Qty: {cartItem.quantity}</p>
                      {cartItem.outOfStock ? (
                        <p style={{ color: "red" }}>Out of Stock !</p>
                      ) : (
                        <p>
                          Qty left: {cartItem.quantity - cartItem.quantityAdded}
                        </p>
                      )}
                    </div>

                    <div className="cartQuantity">
                      <IconButton onClick={() => substractQuantity(cartItem)}>
                        {" "}
                        <RemoveIcon className="icon" />
                      </IconButton>
                      {cartItem.quantityAdded}
                      <IconButton onClick={() => addQuantity(cartItem)}>
                        {" "}
                        <AddIcon className="icon" />
                      </IconButton>
                      <div className="deleteIcon">
                        <IconButton onClick={() => removeItem(cartItem)}>
                          {" "}
                          <DeleteIcon className="icon" />
                        </IconButton>
                      </div>
                    </div>
                    <div className="delete">
                      <Button
                        variant="contained"
                        startIcon={<DeleteIcon />}
                        onClick={() => removeItem(cartItem)}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              <Summary cartItems={cartItems} />
            </div>
          </div>
          <div className="open-cart">
            <Button
              style={{
                margin: "18px",
                marginTop: "-3px",
                marginBottom: "12px",
              }}
              sx={{
                color: "white",
                background: "black",
                "&:hover": {
                  backgroundColor: "black",
                },
              }}
              endIcon={<ShoppingCartIcon />}
              onClick={() => setOpen(true)}
            >
              Order Details
            </Button>
          </div>
          <Subcart open={open} setOpen={setOpen} cartItems={cartItems} />
        </>
      )}

      <Footer />
    </>
  );
};

export default Cart;
