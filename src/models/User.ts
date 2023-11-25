interface User {
  id: number;
  names: string;
  phone: string;
  email: string;
  gender: string;
  nid: string;
  martial_status: string;
  nationality: string;
  img?: string | null;
  password: string;
  code?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export default User;