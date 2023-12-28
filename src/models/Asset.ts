interface NewAssetData {
    asset_id: string;
    category_id: string;
    brand: 
      { 
        id: string; 
        name: string 
      };
    stock_id: string;
    supplier: 
      { 
        id: string; 
        name: string 
      };
    purchase_order_number: string;
    value: number;
    life_span_years: number;
    date_in: string;
  }

  interface Asset {
    asset_id: string;
    category: {
      asset_category_id: string;
      category_name: string;
      specifications: { id: string, name: string, values: string []}[];
    };
    brand: { id: string; name: string };
    stock: { id: string; name: string };
    supplier: { id: string; name: string };
    purchase_order_number: string;
    value: number;
    life_span_years: number;
    date_in: string;
  }
  

  interface AssetData {
    status: boolean;
    data: {
      asset_id: string;
      category: {
        asset_category_id: string;
        category_name: string;
        specifications: { id: string, name: string, values: string []}[];
      };
      brand: { id: string; name: string };
      stock: { id: string; name: string };
      supplier: { id: string; name: string };
      purchase_order_number: string;
      value: number;
      life_span_years: number;
      date_in: string;
    } | string;
  }
  interface AssetSearch {
    found: boolean;
    data: {
      asset_id: string;
      category: {
        asset_category_id: string;
        category_name: string;
        specifications: { id: string, name: string, values: string []}[];
      };
      brand: { id: string; name: string };
      stock: { id: string; name: string };
      supplier: { id: string; name: string };
      purchase_order_number: string;
      value: number;
      life_span_years: number;
      date_in: string;
    }[] | string;
  }

  interface idAndName{
    id: string;
    name: string;
  }

  interface AssetCategory{
    id: string;
    name: string;
    specifications: { id: string, name: string, values: string []}[];
  }

  interface AssetCategoryData {
    asset_category_id: string;
    category_name: string;
    specifications: {
      id: string;
      name: string;
      values: string[];
    }[];
  }
  
  export {Asset, NewAssetData, AssetData, AssetSearch, idAndName, AssetCategory, AssetCategoryData};