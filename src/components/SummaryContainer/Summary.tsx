import { Button } from "@mui/material";
import { SummaryContainerInterface } from "../../interfaces/interface";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const Summary = ({ cartItems }: SummaryContainerInterface) => {
  return (
    <div className="subTotalContainer">
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
          margin: "auto 0px 15px 10px",
          width: "95%",
          "&:hover": {
            backgroundColor: "black",
          },
        }}
        endIcon={<ShoppingCartIcon />}
      >
        Checkout
      </Button>
    </div>
  );
};

export default Summary;
