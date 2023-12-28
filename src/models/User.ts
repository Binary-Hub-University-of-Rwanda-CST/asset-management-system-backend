interface User {
  id: string;
  names: string;
  phone: string;
  email: string;
  password: string;
  location: {
    building: { id: string; name: string };
    room: { id: string; name: string };
    status: 'ACTIVE' | 'INACTIVE';
  }[];
  is_line_manager: boolean;
  occupation_address: {
    id: number;
    name: string;
    type: 'DEPARTMENT' | 'SCHOOL' | 'COLLEGE' | 'CAMPUS' | 'UR';
    parent_id: number | null;
  };
  report_to: string;
  role: {
    id: number;
    name: string;
    access: string[];
  };
  custom_access: string[];
}

export default User;