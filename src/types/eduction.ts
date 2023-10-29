import User from "./user";

interface Educationes {
  _id: string;
  name: string;
  level: string;
  description: string;
  startDate: string;
  endDate: string;
  user: User;
}
export default Educationes;
