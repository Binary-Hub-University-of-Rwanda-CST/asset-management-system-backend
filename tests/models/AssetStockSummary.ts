interface AssetStockSummary {
    category: { id: number; name: string };
    subcategory: { id: number; name: string };
    brand: { id: number; name: string };
    stock: { id: string; name: string };
    assets: {
      asset_id: string;
      specifications: {
        name: string;
        values: string;
      }[];
    }[];
  }
  export default AssetStockSummary;