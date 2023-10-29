import User from "./user";

interface Portfolios {
  _id: string;
  name: string;
  url: string;
  photo: {
    _id: string;
    name: string;
    user: string;
  };
  description: string;
  user: User;
}
export default Portfolios;
