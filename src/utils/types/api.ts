export interface IOrder {
  State: 'Новый' | 'Готовится' | 'НаДоставку' | 'Завершен';
  Goods: {
    UIDNomenclature: string;
    Nomenclature: string;
    Amount: number;
  }[];
  Courier: string;
  CourierPhone: string;
  Time: string;
}

export interface IGroup {
  UIDGroup: string;
  Group: string;
}

export interface IProductsItem {
  UIDProduct: string;
  Product: string;
  Description: string;
  Image: string;
  Price: number;
}

export interface ISauce {
  UIDNomenclature: string;
  Image: string;
  Name: string;
  Price: number;
}

export interface IPrice {
  price: number;
  label: string;
}

export interface IVariant {
  Nomenclature: string;
  Price: number;
  UIDNomenclature: string;
}

export interface IProduct {
  isPizza: boolean;
  productInfo: {
    UIDProduct: string;
    Product: string;
    Description: string;
    Sizes: ['Маленькая', 'Средняя', 'Большая'];
    Additives: string[];
    Image: string;
    Sauces: ISauce[];
    Prices: IPrice[];
    Variants: IVariant[];
  };
}
