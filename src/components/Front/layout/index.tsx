import { Outlet } from "react-router-dom";
import FrontHeader from "../header";
import FrontFooter from "../Footer";

const FrontLayout = () => {
  return (
    <>
      <FrontHeader />
      <Outlet />
      <FrontFooter />
    </>
  );
};

export default FrontLayout;
