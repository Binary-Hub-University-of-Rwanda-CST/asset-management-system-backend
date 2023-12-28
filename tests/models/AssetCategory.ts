interface AssetCategory {
    asset_category_id: string;
    category_name: string;
    specifications: {
      name: string;
      values: string[];
    }[];
  }
  export default AssetCategory;