const userExample = {
    id: "12345",
    names: "John Doe",
    phone: "123456789",
    email: "john.doe@example.com",
    password: "hashedPassword",
    location: [
      {
        building: { id: "building1", name: "Office Building 1" },
        room: { id: "room101", name: "Meeting Room 101" },
        status: "ACTIVE",
      },
    ],
    is_line_manager: true,
    occupation_address: {
      id: 1,
      name: "Asset Manager",
      type: "UR",
      parent_id: null,
    },
    report_to: "Manager",
    role: {
      id: 1,
      name: "Manager",
      access: ["read", "write"],
    },
    custom_access: ["custom_permission1", "custom_permission2"],
  };