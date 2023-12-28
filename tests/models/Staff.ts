interface Staff {
    staff_id: string;
    names: string;
    phone: string;
    email: string;
    password: string;
    position_id: string;
    location: {
      building: { id: string; name: string };
      room: { id: string; name: string };
      status: 'ACTIVE' | 'INACTIVE';
    }[];
    is_line_manager: boolean;
    occupation_address_id: string;
    report_to: string;
    role_id: number;
    custom_access: string[];
  }

  export default Staff;