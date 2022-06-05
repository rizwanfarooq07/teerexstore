import * as React from "react";
import { Global } from "@emotion/react";
import { styled } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { grey } from "@mui/material/colors";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import { SubcartPropsInterface } from "../../interfaces/interface";
import "./Subcart.css";

const drawerBleeding = 56;

const Root = styled("div")(({ theme }) => ({
  height: "100%",
  backgroundColor:
    theme.palette.mode === "light"
      ? grey[100]
      : theme.palette.background.default,
}));

const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "light" ? "#fff" : grey[800],
}));

const Subcart = ({
  setOpen,
  open,
  window,
  cartItems,
}: SubcartPropsInterface) => {
  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  // This is used only for the example
  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Root>
      <CssBaseline />
      <Global
        styles={{
          ".MuiDrawer-root > .MuiPaper-root": {
            height: `calc(60% - ${drawerBleeding}px)`,
            overflow: "visible",
          },
        }}
      />
      <SwipeableDrawer
        container={container}
        anchor="bottom"
        open={open}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        swipeAreaWidth={drawerBleeding}
        disableSwipeToOpen={false}
        ModalProps={{
          keepMounted: true,
        }}
      >
        <StyledBox
          sx={{
            position: "absolute",
            top: -drawerBleeding,
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            visibility: "visible",
            right: 0,
            left: 0,
          }}
        ></StyledBox>
        <StyledBox
          sx={{
            px: 2,
            pb: 2,
            height: "100%",
            overflow: "auto",
          }}
        >
          <div className="subcartContainer">
            <h1>Summary</h1>
            <div style={{ color: "red", width: "10px" }} />
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Price x Qty</th>
                  <th>Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((cartItem) => (
                  <tr key={cartItem.id}>
                    <td>{cartItem.name}</td>
                    <td>
                      Rs. {cartItem.price} x {cartItem.quantityAdded}
                    </td>
                    <td>Rs. {cartItem.price * cartItem.quantityAdded}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="total">
              <p>Total:</p>
              <p>
                Rs.{" "}
                {cartItems
                  .map((cartItem) => cartItem.price * cartItem.quantityAdded)
                  .reduce((acc, cartItem) => acc + cartItem, 0)}
              </p>
            </div>
            <Button
              sx={{
                color: "white",
                background: "black",
                margin: "0px 0px 15px 15px",
                width: "92%",
                "&:hover": {
                  backgroundColor: "black",
                },
              }}
              endIcon={<ShoppingCartIcon />}
            >
              Checkout
            </Button>
          </div>
        </StyledBox>
      </SwipeableDrawer>
    </Root>
  );
};

export default Subcart;
