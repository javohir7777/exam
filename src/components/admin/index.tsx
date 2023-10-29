import { Outlet } from "react-router-dom";
import Header from "../Front/header";
// import Footer from "../Front/Footer";

const AdminLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
      {/* <Footer /> */}
    </>
  );
};

export default AdminLayout;
