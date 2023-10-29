interface User {
  role: string;
  fields: string[];
  client: false;
  _id: string;
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  createdAt: string;
}
export default User;
