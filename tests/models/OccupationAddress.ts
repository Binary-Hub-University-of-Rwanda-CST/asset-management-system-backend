interface OccupationAddress {
    id: number;
    name: string;
    type: 'DEPARTMENT' | 'SCHOOL' | 'COLLEGE' | 'CAMPUS' | 'UR';
    parent_id: number | null;
  }

export default OccupationAddress;