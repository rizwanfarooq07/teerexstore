export interface ProductsInterface {
  color: string;
  currency: string;
  gender: string;
  id: number;
  imageURL: string;
  name: string;
  price: number;
  quantity: number;
  quantityAdded: number;
  type: string;
  map: any;
  outOfStock?: boolean;
}

export interface FilterPropsInterface {
  filter: boolean;
  setFilter: React.Dispatch<React.SetStateAction<boolean>>;
  setProducts: React.Dispatch<React.SetStateAction<ProductsInterface[]>>;
  productsStatic: ProductsInterface[];
}

export interface HeaderPropsInterface {
  cartItems: ProductsInterface[];
  navigation: string;
}

export interface MainComponentInterface {
  products: ProductsInterface[];
  cartItems: ProductsInterface[];
  setCartItems: React.Dispatch<React.SetStateAction<ProductsInterface[]>>;
  setProducts: React.Dispatch<React.SetStateAction<ProductsInterface[]>>;
}

export interface SearchPropsInterface {
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  setProducts: React.Dispatch<React.SetStateAction<ProductsInterface[]>>;
  search: string;
  productsStatic: ProductsInterface[];
}

export interface LoaderPropsInterface {
  cartItems: ProductsInterface[];
}

export interface SummaryContainerInterface {
  cartItems: ProductsInterface[];
}

export interface SubcartPropsInterface {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  open: boolean;
  window?: () => Window;
  cartItems: ProductsInterface[];
}
