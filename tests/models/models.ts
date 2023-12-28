// interface User {
//   id: string;
//   names: string;
//   phone: string;
//   email: string;
//   password: string;
//   position_id: string;
//   location: {
//     building: { id: string; name: string };
//     room: { id: string; name: string };
//     status: 'ACTIVE' | 'INACTIVE';
//   }[];
//   is_line_manager: boolean;
//   occupation_address_id: string;
//   report_to: string;
//   role_id: number;
//   custom_access: string[];
// }

// interface Role {
//   role_id: number;
//   name: string;
//   access: string[];
// }

// interface occupation_address {
//   id: number;
//   name: string;
//   type: 'DEPARTMENT' | 'SCHOOL' | 'COLLEGE' | 'CAMPUS' | 'UR';
//   parent_id: number | null;
// }

// interface AssetCategory {
//   asset_category_id: string;
//   category_name: string;
//   specifications: {
//     name: string;
//     values: string[];
//   }[];
// }
// interface Asset {
//   asset_id: string;
//   category: { id: number; name: string };
//   subcategory: { id: number; name: string };
//   brand: { id: number; name: string };
//   stock: { id: string; name: string };
//   supplier: { id: string; name: string };
//   purchase_order_number: string;
//   value: number;
//   life_span_years: number;
//   date_in: string;
//   specifications: {
//     name: string; //processor, serial_number
//     values: string; //i5, 7938783794
//   }[];
// }
// interface AssetStockSummary {
//   category: { id: number; name: string };
//   subcategory: { id: number; name: string };
//   brand: { id: number; name: string };
//   stock: { id: string; name: string };
//   assets: {
//     asset_id: string;
//     specifications: {
//       name: string;
//       values: string;
//     }[];
//   }[];
// }
