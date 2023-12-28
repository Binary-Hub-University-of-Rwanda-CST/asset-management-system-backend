import User from "./User";

interface MappedLocation {
    id: string;
    status: string;
    building: { id: string; name: string };
    room: { id: string; name: string };
  }
  
  interface MappedOccupationAddress {
    id: number;
    name: string;
    type: 'DEPARTMENT' | 'SCHOOL' | 'COLLEGE' | 'CAMPUS' | 'UR';
    parent_id: number | null;
  }
  
  interface MappedRole {
    id: number;
    name: string;
    access: string[];
  }
  
  export interface MappedUser {
    id: string;
    names: string;
    phone: string;
    email: string;
    password: string;
    location: MappedLocation[];
    is_line_manager: boolean;
    occupation_address: MappedOccupationAddress;
    report_to: string | null;
    role: MappedRole;
    custom_access: string[];
  }
  
  const mapPrismaLocationToMappedLocation = (prismaLocation: any): MappedLocation => {
    return {
      id: prismaLocation.id,
      status: prismaLocation.status,
      building: {
        id: prismaLocation.building.id,
        name: prismaLocation.building.name,
      },
      room: {
        id: prismaLocation.room.id,
        name: prismaLocation.room.name,
      },
    };
  };
  
  const mapPrismaOccupationAddressToMappedOccupationAddress = (prismaOccupationAddress: any): MappedOccupationAddress => {
    return {
      id: prismaOccupationAddress.id,
      name: prismaOccupationAddress.name,
      type: prismaOccupationAddress.type,
      parent_id: prismaOccupationAddress.parent_id,
    };
  };
  
  const mapPrismaRoleToMappedRole = (prismaRole: any): MappedRole => {
    return {
      id: prismaRole.id,
      name: prismaRole.name,
      access: prismaRole.access,
    };
  };
  
  export const mapPrismaUserToMappedUser = (prismaUser: any): User => {
    return {
      id: prismaUser.id,
      names: prismaUser.names,
      phone: prismaUser.phone,
      email: prismaUser.email,
      password: prismaUser.password,
      location: prismaUser.location.map(mapPrismaLocationToMappedLocation),
      is_line_manager: prismaUser.is_line_manager,
      occupation_address: mapPrismaOccupationAddressToMappedOccupationAddress(prismaUser.occupation_address),
      report_to: prismaUser.report_to,
      role: mapPrismaRoleToMappedRole(prismaUser.role),
      custom_access: prismaUser.custom_access,
    };
  };