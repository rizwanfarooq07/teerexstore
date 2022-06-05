import React, { useState } from "react";
import "./Filter.css";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import { Checkbox, FormControlLabel, Slider, Typography } from "@mui/material";
import { FilterPropsInterface } from "../../interfaces/interface";

type Anchor = "top" | "left" | "bottom" | "right";

const Filter = ({
  filter,
  setFilter,
  setProducts,
  productsStatic,
}: FilterPropsInterface) => {
  const [filterValue, setFilerValue] = useState<any>({
    Color: [],
    Gender: [],
    Price: [],
    Type: [],
  });
  const [value] = useState<number[]>([0, 100]);

  // Handle price range change
  const handlePriceChage = (event: Event, newValue: number | number[]) => {
    setFilerValue({ ...filterValue, Price: newValue });
  };

  // Add different filters
  const filterHandler = (Key: string, text: string) => {
    if (filterValue[Key].length === 0) {
      setFilerValue({ ...filterValue, [Key]: [...filterValue[Key], text] });
    } else {
      if (filterValue[Key].includes(text)) {
        const updatedFilterValues = filterValue[Key].filter(
          (value: any) => value !== text
        );
        setFilerValue({ ...filterValue, [Key]: updatedFilterValues });
      } else {
        setFilerValue({ ...filterValue, [Key]: [...filterValue[Key], text] });
      }
    }
  };

  // Apply all the different filters
  const setFilterHandler = () => {
    const filterProducts = productsStatic
      .filter((product) =>
        filterValue.Color.length > 0
          ? filterValue.Color.includes(product.color)
          : product
      )
      .filter((product) =>
        filterValue.Gender.length > 0
          ? filterValue.Gender.includes(product.gender)
          : product
      )
      .filter((product) =>
        filterValue.Price.length > 0
          ? filterValue.Price[0] <= product.price &&
            product.price <= filterValue.Price[1]
          : product
      )
      .filter((product) =>
        filterValue.Type.length > 0
          ? filterValue.Type.includes(product.type)
          : product
      );
    setProducts(filterProducts);
  };

  function valuetext(value: number) {
    return `Rs. ${value}`;
  }

  const marks = [
    {
      value: 0,
      label: "Rs. 0",
    },
    {
      value: 500,
      label: "Rs. 500",
    },
  ];

  const list = (anchor: Anchor) => (
    <Box sx={{ width: 250 }} role="presentation">
      <List>
        <Typography
          style={{ paddingLeft: "10px", fontWeight: "bold" }}
          align="left"
          variant="h6"
        >
          Color
        </Typography>
        {[
          "Black",
          "Blue",
          "Pink",
          "Green",
          "Red",
          "Grey",
          "Purple",
          "White",
        ].map((text) => (
          <ListItem key={text}>
            <FormControlLabel
              control={<Checkbox checked={filterValue.Color.includes(text)} />}
              label={text}
              onChange={() => filterHandler("Color", text)}
            />
          </ListItem>
        ))}
        <Divider />
        <Typography
          style={{ paddingLeft: "10px", fontWeight: "bold" }}
          align="left"
          variant="h6"
        >
          Gender
        </Typography>
        {["Men", "Women"].map((text, index) => (
          <ListItem key={text}>
            <FormControlLabel
              control={<Checkbox checked={filterValue.Gender.includes(text)} />}
              label={text}
              onChange={() => filterHandler("Gender", text)}
            />
          </ListItem>
        ))}
      </List>
      <Typography
        style={{ paddingLeft: "10px", fontWeight: "bold" }}
        align="left"
        variant="h6"
      >
        Price
      </Typography>
      <Box sx={{ width: 200, ml: 2 }}>
        <Slider
          getAriaLabel={() => "Temperature range"}
          value={filterValue.Price.length === 0 ? value : filterValue.Price}
          onChange={handlePriceChage}
          valueLabelDisplay="on"
          getAriaValueText={valuetext}
          marks={marks}
          min={0}
          max={500}
        />
      </Box>
      <Typography
        style={{ paddingLeft: "10px", fontWeight: "bold" }}
        align="left"
        variant="h6"
      >
        Type
      </Typography>
      {["Polo", "Hoodie", "Basic"].map((text) => (
        <ListItem key={text}>
          <FormControlLabel
            control={<Checkbox checked={filterValue.Type.includes(text)} />}
            label={text}
            onChange={() => filterHandler("Type", text)}
          />
        </ListItem>
      ))}
      <Divider />
      <Button
        variant="contained"
        onClick={() => setFilterHandler()}
        sx={{ mb: 2, ml: 2, mt: 2 }}
      >
        Set Filters
      </Button>
    </Box>
  );

  return (
    <div>
      <Drawer
        // anchor={anchor}
        open={filter}
        onClose={() => setFilter(false)}
      >
        {list("left")}
      </Drawer>
    </div>
  );
};

export default Filter;
