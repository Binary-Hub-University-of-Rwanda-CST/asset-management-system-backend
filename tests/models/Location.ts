interface Location {
    id: string;
    building: Building;
    room: Room;
    status: 'ACTIVE' | 'INACTIVE';
  }

export default Location;

interface Building {
    id: string;
    name: string;
}
  
interface Room {
    id: string;
    name: string;
}