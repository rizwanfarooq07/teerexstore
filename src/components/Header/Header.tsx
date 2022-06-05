import { IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./Header.css";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import HomeIcon from "@mui/icons-material/Home";
import Badge, { BadgeProps } from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import { HeaderPropsInterface } from "../../interfaces/interface";
import { useNavigate } from "react-router-dom";

const Header = ({ navigation, cartItems }: HeaderPropsInterface) => {
  const navigate = useNavigate();

  const [totalCartProducts, setTotalCartProducts] = useState<any>(0);

  useEffect(() => {
    const totalItems = cartItems.length > 0 ? cartItems.length : 0;
    setTotalCartProducts(totalItems);
  }, [cartItems]);

  const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
    "& .MuiBadge-badge": {
      right: -3,
      top: 13,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: "0 4px",
    },
  }));
  return (
    <div className="header">
      <h2>TeeRex Store</h2>
      <IconButton
        aria-label="cart"
        onClick={() =>
          navigation === "cart"
            ? navigate("/cart")
            : navigation === "home"
            ? navigate("/")
            : null
        }
      >
        {navigation === "home" ? (
          <HomeIcon className="headerIcon" />
        ) : (
          <StyledBadge badgeContent={totalCartProducts} color="primary">
            <ShoppingCartIcon className="headerIcon" />
          </StyledBadge>
        )}
      </IconButton>
    </div>
  );
};

export default Header;
